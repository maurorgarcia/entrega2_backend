const express = require("express");
const CartManager = require("../managers/CartManager");
const ProductManager = require("../managers/ProductManager");

const router = express.Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();

    res.status(201).json({
      status: "success",
      message: "Carrito creado correctamente",
      payload: newCart
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear el carrito"
    });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    res.json({
      status: "success",
      payload: cart.products
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener el carrito"
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado"
      });
    }

    const updatedCart = await cartManager.addProductToCart(cid, pid);

    if (!updatedCart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Producto agregado al carrito correctamente",
      payload: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al agregar el producto al carrito"
    });
  }
});

module.exports = router;