/*======================
    Rutas de vistas
======================*/

import { Router } from "express";
import { requireLogin } from "../middlewares/auth.js";
import { showDashboard, showProductForm, showUserForm } from "../controllers/view.controllers.js";

const router = Router();

////////////////////////
// GET dashboard
router.get("/dashboard", requireLogin, showDashboard);

////////////////////////
// GET alta de usuario
router.get("/usuarios/alta", requireLogin, showUserForm);

////////////////////////
// GET alta de productos
router.get("/productos/alta", requireLogin, showProductForm);

// Exportamos las rutas de vistas
export default router;
