import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/logger.js";
import { __dirname, join } from "./src/api/utils/index.js";
//importamos los endpoints de productos, usuarios y autenticacion
import { productRoutes, userRoutes, authRoutes, viewRoutes } from "./src/api/routes/index.js";

// config

// creamos una instancia de app express, marco de trabajo de node
const app = express();
const { port, session_key } = environments;

// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
// Le indicamos donde se encuentran las vistas ejs -> src/views
app.set("views", join(__dirname, "src/views"));

// Middlewares

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

// Middleware CORS basico para permitir todas las solicitudes
app.use(cors());

// Cuando enviamos informacion en el cuerpo del body de la request este middleware parseara el JSON recibido y lo recibiremos en el endpoint ya como un objeto
app.use(express.json());

// Middleware para parsear los datos que recibimos con el envio nativo de un HTML <form>
app.use(express.urlencoded({ extended: true }));

// Middleware para loguear las solicitudes entrantes
app.use(loggerUrl);

// Middlewares de sesion
app.use(session({
    secret: session_key,
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacias
}));


// // Vistas
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/sales", saleRoutes);
app.use("/", authRoutes);
app.use("/", viewRoutes);

// app.get("/", (req, res) => {
//     res.redirect("/login");
// });

app.listen(port, () => {
    console.log(`Anteiku backend corriendo en http://localhost:${port}`);
});
