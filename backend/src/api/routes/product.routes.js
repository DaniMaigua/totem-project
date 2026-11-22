// RUTAS PRODUCTO -> importamos los controllers

//router es otro paquete de express

import { Router } from "express"; // Router funciona como una "mini aplicacion de express"
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router(); 

//GET all products
router.get("/", getAllProducts);

//GET product by id
router.get("/:id", validateId, getProductById);

//POST create new product
router.post("/", validateProduct, createProduct);

//PUT create new product
router.post("/", validateProduct, createProduct);

//PUT product
router.put("/", validateProduct, modifyProduct);

//DELETE product
router.delete("/:id", validateId, removeProduct);

//Exportamos todas estas rutas de producto
export default router;