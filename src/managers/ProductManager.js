const fs = require("fs").promises;
const path = require("path");

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "../data/products.json");
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  async addProduct(productData) {
    const products = await this.getProducts();

    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "category"
    ];

    for (const field of requiredFields) {
      if (productData[field] === undefined || productData[field] === null) {
        throw new Error(`El campo ${field} es obligatorio`);
      }
    }

    if (typeof productData.price !== "number" || productData.price <= 0) {
      throw new Error("El precio debe ser un número mayor a 0");
    }

    if (typeof productData.stock !== "number" || productData.stock < 0) {
      throw new Error("El stock debe ser un número mayor o igual a 0");
    }

    const codeExists = products.some(product => product.code === productData.code);

    if (codeExists) {
      throw new Error("Ya existe un producto con ese código");
    }

    const newProduct = {
      id: this.generateId(products),
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: productData.price,
      status: productData.status !== undefined ? productData.status : true,
      stock: productData.stock,
      category: productData.category,
      thumbnails: productData.thumbnails || []
    };

    products.push(newProduct);
    await this.saveProducts(products);

    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      return null;
    }

    delete updatedFields.id;

    if (updatedFields.price !== undefined) {
      if (typeof updatedFields.price !== "number" || updatedFields.price <= 0) {
        throw new Error("El precio debe ser un número mayor a 0");
      }
    }

    if (updatedFields.stock !== undefined) {
      if (typeof updatedFields.stock !== "number" || updatedFields.stock < 0) {
        throw new Error("El stock debe ser un número mayor o igual a 0");
      }
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updatedFields
    };

    await this.saveProducts(products);

    return products[productIndex];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();

    const productExists = products.some(product => product.id === id);

    if (!productExists) {
      return null;
    }

    const filteredProducts = products.filter(product => product.id !== id);

    await this.saveProducts(filteredProducts);

    return true;
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  generateId(products) {
    if (products.length === 0) {
      return "1";
    }

    const ids = products.map(product => Number(product.id));
    const maxId = Math.max(...ids);

    return String(maxId + 1);
  }
}

module.exports = ProductManager;