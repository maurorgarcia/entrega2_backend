# Entrega 1 - Backend: API de Productos y Carritos

Servidor desarrollado con Node.js y Express para gestionar productos y carritos de compra, con persistencia en archivos JSON.

## 🚀 Características

- ✅ Servidor Express en puerto 8080
- ✅ CRUD completo de productos
- ✅ Gestión de carritos de compra
- ✅ Persistencia en archivos JSON
- ✅ Validación de datos
- ✅ IDs autogenerados

## 📋 Pre-requisitos

- Node.js (v14 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
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

## 📡 Endpoints

### Productos (`/api/products`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:pid` | Obtener producto por ID |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

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
│   ├── routes/
│   │   ├── products.router.js # Rutas de productos
│   │   └── carts.router.js    # Rutas de carritos
│   └── app.js                 # Servidor principal
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 👨‍💻 Autor

Mauro García
