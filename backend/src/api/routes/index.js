// El archivo de barril importa todas las rutas (producto, usuarios, autenticacion) con un nombre y las exporta a todos los modulos. Centraliza las rutas y las exporta
import productRoutes from "./product.routes.js";

// Exportamos todas nuestras rutas
export {
    productRoutes,
}