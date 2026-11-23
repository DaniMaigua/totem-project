// RUTAS PRODUCTO -> importamos los controllers

//router es otro paquete de express

import { Router } from "express"; // Router funciona como una "mini aplicacion de express"
import { requireLogin } from "../middlewares/auth.js";
import { validateId, validateProduct } from "../middlewares/validations.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router(); 

//GET all products
router.get("/", getAllProducts);

//GET product by id
router.get("/:id", validateId, getProductById);

//POST create new product
//Los tres de escritura son del panel, los GET quedan libres para el totem
router.post("/", requireLogin, validateProduct, createProduct);

//PUT product
router.put("/", requireLogin, validateProduct, modifyProduct);

//DELETE product
router.delete("/:id", requireLogin, validateId, removeProduct);

//Exportamos todas estas rutas de producto
export default router;