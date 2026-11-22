/*======================
    Rutas de autenticacion
======================*/

import { Router } from "express";
import { showLogin, login, logout } from "../controllers/auth.controllers.js";

const router = Router();

////////////////////////
// GET login (la vista)
router.get("/login", showLogin);

////////////////////////
// POST login (el form)
router.post("/login", login);

////////////////////////
// GET logout
router.get("/logout", logout);

// Exportamos las rutas de autenticacion
export default router;
