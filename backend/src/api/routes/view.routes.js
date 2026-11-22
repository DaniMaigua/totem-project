/*======================
    Rutas de vistas
======================*/

import { Router } from "express";
import { requireLogin } from "../middlewares/auth.js";

const router = Router();

////////////////////////
// GET dashboard
router.get("/dashboard", requireLogin, (req, res) => {
    res.render("dashboard", { user: req.session.user });
});

// Exportamos las rutas de vistas
export default router;
