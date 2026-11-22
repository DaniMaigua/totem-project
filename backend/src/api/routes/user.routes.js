/*======================
    Rutas usuario
======================*/

import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
import { validateUser } from "../middlewares/validations.js";

const router = Router();

////////////////////////
// POST create user
router.post("/", validateUser, createUser);

// Exportamos las rutas de usuario
export default router;
