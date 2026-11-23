import ProductModels from "../models/product.models.js";

//OBTENER PRODUCTOS
export const getAllProducts = async (req, res) => {

    try{
        const [rows] = await ProductModels.selectAllProducts();

        if (rows.length ===0){
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows,
            total: rows.lenght // Opcional, metadata util para el frontend
        });

        
    }catch (error){
        console.log("Error obteniendo productos: ", error)

        //500 si fallo conexion a base de datos
        res.status(500).json({
            message: "Error interno al obtener productos"
        })
    }
}

//OBTENER PRODUCTO POR ID
export const getProductById = async(req,res) => {

    try{

        const [rows] = await ProductModels.selectProductById(req.id);

        if (rows.length === 0){
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }
        res.status(200).json({
            payload: rows
        })
    }catch (error){
        console.log("Error obteniendo productos: ", error);

        //500 si fallo conexion a base de datos
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }

}

//CREAR PRODUCTO
export const createProduct = async(req,res) => {

    try{

        const {category,image,name,price} = req.body;
        const [result] = await ProductModels.insertNewProduct(name,image,category,price);

        console.log(result);

        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.insertId
        })
    }catch (error){
        console.log("Error obteniendo productos: ", error);

        //500 si fallo conexion a base de datos
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}


//MODIFICAR PRODUCTO
export const modifyProduct = async (req, res) => {

    try {

        const { id, name, image, price, category, active } = req.body;

        const [result] = await ProductModels.updateProduct(name, image, price, category, active, id);

        console.log(result);

        // Verificamos la actualizacion
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se actualizo el producto"
            })
        }

        res.status(200).json({
            message: "Producto actualizado exitosamente"
        });
    
    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al modificar productos"
        });
    }
}

//ELIMINAMOS PRODUCTO
export const removeProduct = async (req, res) => {
    // Filtro ids no validos en el middleware validateId
    try {

        await ProductModels.deleteProduct(req.id);
    
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}





