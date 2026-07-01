# Entregas 1 y 2 - Backend: API de Productos, Carritos y WebSockets

Servidor desarrollado con Node.js y Express para gestionar productos y carritos de compra, con persistencia en archivos JSON. Incluye motor de plantillas Handlebars y comunicación en tiempo real con Socket.io.

## 🚀 Características

- ✅ Servidor Express en puerto 8080
- ✅ CRUD completo de productos
- ✅ Gestión de carritos de compra
- ✅ Persistencia en archivos JSON
- ✅ Validación de datos y IDs autogenerados
- ✅ **[NUEVO]** Motor de plantillas Handlebars
- ✅ **[NUEVO]** Comunicación en tiempo real con Socket.io (WebSockets)

## 📋 Pre-requisitos

- Node.js (v14 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/maurorgarcia/entrega1_backend.git
cd Entrega1_Backend
```

2. Instala las dependencias:
```bash
npm install
```

## 🚀 Ejecución

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:8080`

## 🖥️ Vistas (Frontend)

| Ruta | Descripción |
|------|-------------|
| `GET /` | Vista estática con Handlebars mostrando todos los productos actuales. |
| `GET /realtimeproducts` | Vista conectada vía WebSockets. Permite agregar y eliminar productos interactuando directamente con el servidor en tiempo real. Todos los clientes conectados verán las actualizaciones instantáneamente. |

## 📡 Endpoints API

### Productos (`/api/products`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:pid` | Obtener producto por ID |
| POST | `/api/products` | Crear nuevo producto *(Actualiza sockets)* |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto *(Actualiza sockets)* |

### Ejemplo de producto (POST):
```json
{
  "title": "Laptop Gamer",
  "description": "Laptop con 16GB RAM y RTX 4060",
  "code": "LAP001",
  "price": 1500,
  "stock": 5,
  "category": "Tecnología"
}
```

### Carritos (`/api/carts`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/carts` | Crear nuevo carrito |
| GET | `/api/carts/:cid` | Obtener carrito por ID |
| POST | `/api/carts/:cid/product/:pid` | Agregar producto al carrito |

## 📁 Estructura del proyecto

```
Entrega1_Backend/
├── src/
│   ├── data/
│   │   ├── products.json    # Almacenamiento de productos
│   │   └── carts.json       # Almacenamiento de carritos
│   ├── managers/
│   │   ├── ProductManager.js # Lógica de productos
│   │   └── CartManager.js    # Lógica de carritos
│   ├── public/
│   │   └── js/
│   │       └── realtime.js  # Lógica de cliente (websockets)
│   ├── routes/
│   │   ├── products.router.js # Rutas de productos API
│   │   ├── carts.router.js    # Rutas de carritos API
│   │   └── views.router.js    # Rutas de vistas Handlebars
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   ├── home.handlebars
│   │   └── realTimeProducts.handlebars
│   └── app.js                 # Servidor principal
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 👨‍💻 Autor

Mauro García
