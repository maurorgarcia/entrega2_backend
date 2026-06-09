const fs = require("fs").promises;
const path = require("path");

class CartManager {
  constructor() {
    this.path = path.join(__dirname, "../data/carts.json");
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newCart = {
      id: this.generateId(carts),
      products: []
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();

    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
      return null;
    }

    const productIndex = carts[cartIndex].products.findIndex(
      item => item.product === productId
    );

    if (productIndex === -1) {
      carts[cartIndex].products.push({
        product: productId,
        quantity: 1
      });
    } else {
      carts[cartIndex].products[productIndex].quantity += 1;
    }

    await this.saveCarts(carts);

    return carts[cartIndex];
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  generateId(carts) {
    if (carts.length === 0) {
      return "1";
    }

    const ids = carts.map(cart => Number(cart.id));
    const maxId = Math.max(...ids);

    return String(maxId + 1);
  }
}

module.exports = CartManager;