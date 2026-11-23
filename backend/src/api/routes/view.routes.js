/*======================
    Rutas de vistas
======================*/

import { Router } from "express";
import { requireLogin } from "../middlewares/auth.js";
import { showDashboard, showProductDetail, showProductForm, showProductUpdate, showUserForm } from "../controllers/view.controllers.js";

const router = Router();

////////////////////////
// GET dashboard
router.get("/dashboard", requireLogin, showDashboard);

////////////////////////
// GET alta de usuario
router.get("/usuarios/alta", requireLogin, showUserForm);

////////////////////////
// GET alta de producto
router.get("/productos/alta", requireLogin, showProductForm);

////////////////////////
// GET consulta de producto por id
router.get("/productos/consulta", requireLogin, showProductDetail);

////////////////////////
// GET modificacion de producto
router.get("/productos/modificar/:id", requireLogin, showProductUpdate);

// Exportamos las rutas de vistas
export default router;
