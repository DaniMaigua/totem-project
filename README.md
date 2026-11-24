# Totem de autoservicio - Anteiku

Trabajo practico integrador de Programacion III (UTN, division 334, 2026).

Integrantes: Juan Cruz Reynoso y Daniela Maigua.

## De que se trata

Un totem de autoservicio con su panel de administracion para una cafeteria
tematica. El cliente elige productos y se lleva un ticket. El administrador
mantiene el menu y los usuarios del panel.

Son dos aplicaciones separadas que se hablan por HTTP:

- `backend/`: API REST en Express, con vistas EJS para el panel, MySQL y sesiones.
- `frontend/`: el totem, en html, css y javascript puro, servido como estatico.

## Requisitos

- Node 22 (probado con v22.17.1)
- MySQL o MariaDB. Sirve phpMyAdmin para importar el sql si es mas comodo.

## Como correrlo

### 1. La base de datos

Importar `backend/DB/anteiku_totem.sql`. El archivo crea la base `anteiku_totem`,
las tablas `products`, `users`, `sales` y `product_sales`, y carga datos de
ejemplo para poder probar sin tener que crear nada a mano.

### 2. El backend

```
cd backend
copy .env.example .env
npm install
npm run dev
```

En Linux o Mac el copiado es `cp .env.example .env`. En el `.env` se configura el
puerto, la clave de las sesiones y el acceso a MySQL.

`npm run dev` levanta el servidor con `--watch` en `http://localhost:3000`.

### 3. El totem

```
cd frontend
npx serve -l 5500
```

Abre en `http://localhost:5500`. La direccion del backend esta fija en
`frontend/js/config.js`, que es la constante `API_URL`.

El archivo `serve.json` desactiva los "clean urls" que trae `serve` por defecto,
para que `/ticket.html?venta=3` no se reescriba y el ticket pueda leer siempre
el id de la venta.

## Accesos

| Que | Donde |
|---|---|
| Totem | `http://localhost:5500` |
| Panel | `http://localhost:3000/login` |
| Usuario del panel | `admin@anteiku.com` / `admin123` |

El login tiene un boton **Acceso rapido** que completa las credenciales. Es solo
para no escribir a mano cada vez que se recarga la pagina durante las pruebas.

## Que hace cada pantalla

El totem:

- `index.html`: pide el nombre del cliente y lo guarda en `localStorage`.
- `productos.html`: muestra los productos activos, separados por categoria, y los
  agrega al carrito.
- `carrito.html`: sube y baja cantidades, quita productos y muestra el total.
- `ticket.html`: muestra la venta que ya esta guardada en la base y la descarga
  en pdf con jsPDF.

El panel:

- Login con sesion y contrasena hasheada con bcrypt.
- Listado de productos con su estado, y acciones para editar, consultar o dar de baja.
- Alta y modificacion de productos.
- Consulta de un producto por id.
- Alta de usuarios nuevos del panel.

## Estructura

El backend esta resuelto en MVC, como pide el enunciado:

```
backend/
  index.js                punto de entrada: middlewares y montaje de rutas
  DB/anteiku_totem.sql
  src/api/
    config/               lectura del .env
    database/             el pool de conexiones de mysql2
    models/               una funcion por consulta, ninguna trae datos resueltos
    controllers/          try/catch, y responden json o vista segun quien los llama
    routes/               rutas flacas, con las validaciones en el medio
    middlewares/          validateId, validateProduct, validateUser, requireLogin, logger
  src/views/              las vistas EJS del panel, con partials de head, header y footer
  src/public/             css, imagenes y javascript del panel
frontend/
  index.html  productos.html  carrito.html  ticket.html
  css/styles.css
  js/         config, api, cart, las pantallas, y jsPDF
```

Una pantalla del panel y una del totem usan la misma API de productos, que es la
prueba mas rapida de que separar API y vistas vale la pena.

## Decisiones de alcance

Del pizarron del TP faltan tres pasos, y son a proposito:

- **Multer** (paso 5). La imagen se guarda como texto con la ruta del archivo,
  igual que en la clase. `products.image` es un `varchar(255)`.
- **ExcelJS** (paso 6). Las ventas se consultan por la API con `GET /api/sales/:id`,
  no se descargan en excel.
- **Paginacion** (paso 7). El filtro por categoria y de productos activos se hace
  del lado del cliente, sobre la lista completa.

`multer` y `exceljs` siguen instalados en el backend por si los pasos se retoman.

Otra decision que importa: **el total de una venta lo calcula el servidor** con
los precios que estan en la base de datos. El cliente manda solamente ids y
cantidades, asi que cambiar un precio desde la consola del navegador no tiene
ningun efecto.

## Las ventas

`sales` guarda el nombre del cliente, la fecha (la pone MySQL con un default) y
el total. `product_sales` es la tabla intermedia de la relacion muchos a muchos,
con la cantidad de cada producto. Por eso un ticket se puede volver a abrir
siempre desde `?venta=id`, incluso si el carrito del navegador ya esta vacio.
