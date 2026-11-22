/*======================
    Rutas de vistas
======================*/

import { Router } from "express";
import { requireLogin } from "../middlewares/auth.js";
import { createUserFromForm, showDashboard, showUserForm } from "../controllers/view.controllers.js";

const router = Router();

////////////////////////
// GET dashboard
router.get("/dashboard", requireLogin, showDashboard);

////////////////////////
// GET alta de usuario
router.get("/usuarios/alta", requireLogin, showUserForm);

////////////////////////
// POST alta de usuario
router.post("/usuarios/alta", requireLogin, createUserFromForm);

// Exportamos las rutas de vistas
export default router;
