const express = require('express');

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Bienvenido a la API de Productos y Carritos",
    endpoints: {
      products: "/api/products",
      carts: "/api/carts"
    }
  });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});