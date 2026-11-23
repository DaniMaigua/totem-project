/*======================
    Rutas venta
======================*/

import { Router } from "express";
import { validateId } from "../middlewares/validations.js";
import { createSale, getSale } from "../controllers/sale.controllers.js";

const router = Router();

////////////////////////
// POST create sale
// va sin requireLogin: el totem registra ventas sin sesion de administrador
router.post("/", createSale);

////////////////////////
// GET sale by id
router.get("/:id", validateId, getSale);

// Exportamos todas estas rutas de venta
export default router;
