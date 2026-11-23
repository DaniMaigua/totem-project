/*======================
    Rutas usuario
======================*/

import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
import { requireLogin } from "../middlewares/auth.js";
import { validateUser } from "../middlewares/validations.js";

const router = Router();

////////////////////////
// POST create user
// requireLogin: crear un administrador requiere estar adentro del panel
router.post("/", requireLogin, validateUser, createUser);

// Exportamos las rutas de usuario
export default router;
