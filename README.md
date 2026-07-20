# Entrega final - Backend

Servidor con Node.js, Express, MongoDB, Mongoose, Handlebars y Socket.io para gestionar productos y carritos.

## Requisitos

- Node.js
- MongoDB local o una URI de Mongo Atlas
- npm

## Instalacion

```bash
npm install
```

Si usas Mongo local, asegurate de tenerlo corriendo en:

```bash
mongodb://127.0.0.1:27017/entrega_final_backend
```

Tambien podes configurar otra base con la variable:

```bash
MONGODB_URI="tu-uri-de-mongo"
```

## Datos iniciales

Para cargar en Mongo los productos que estaban en `src/data/products.json`:

```bash
npm run seed
```

## Ejecucion

```bash
npm run dev
```

o

```bash
npm start
```

Servidor:

```bash
http://localhost:8080
```

## Vistas

| Ruta | Descripcion |
|------|-------------|
| `GET /products` | Lista productos con paginacion, filtro y ordenamiento |
| `GET /products/:pid` | Detalle de producto y boton para agregar al carrito |
| `GET /carts/:cid` | Vista de un carrito especifico con sus productos |
| `GET /realtimeproducts` | Vista con WebSockets para agregar/eliminar productos |

## API productos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/products` | Lista paginada de productos |
| GET | `/api/products/:pid` | Producto por id |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

`GET /api/products` acepta:

- `limit`: cantidad de productos por pagina. Default: `10`.
- `page`: pagina solicitada. Default: `1`.
- `query`: categoria o disponibilidad (`true` / `false`).
- `sort`: orden por precio (`asc` / `desc`).

Ejemplo:

```bash
GET /api/products?limit=5&page=1&query=Accesorios&sort=asc
```

Respuesta:

```json
{
  "status": "success",
  "payload": [],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
```

## API carritos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/carts` | Crear carrito |
| GET | `/api/carts/:cid` | Obtener carrito con productos populados |
| POST | `/api/carts/:cid/products/:pid` | Agregar producto al carrito |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar un producto del carrito |
| PUT | `/api/carts/:cid` | Reemplazar todos los productos del carrito |
| PUT | `/api/carts/:cid/products/:pid` | Actualizar solo la cantidad de un producto |
| DELETE | `/api/carts/:cid` | Vaciar carrito |

Para reemplazar todos los productos:

```json
[
  {
    "product": "id-del-producto",
    "quantity": 2
  }
]
```

Para actualizar cantidad:

```json
{
  "quantity": 4
}
```
