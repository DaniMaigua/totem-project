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
            total: rows.length // Opcional, metadata util para el frontend
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
//El form de alta apunta aca, como el de usuario apunta a /api/users:
//la respuesta es la vista otra vez con el mensaje, no un JSON
export const createProduct = async(req,res) => {

    //lee los campos del formulario productos
    const {category, image, name, price } = req.body;
    //Guardar producto cargado, para no perderlo si falla
    const cargado = { id: null, name, image, category, price, active: 1 };

    try{
        const [result] = await ProductModels.insertNewProduct(name,image,category,price);

        //render: responde con una vista, en vez de json
        res.status(201).render("productForm", {
            titulo: "Alta producto",
            producto: { id: null, name: "", image: "", category: "", price: "", active: 1 },
            success: `Producto creado con el id ${result.insertId}`
        });

    }catch (error){
        console.log("Error creando producto: ", error);

        //500 si fallo conexion a base de datos
        res.status(500).render("productForm", {
            titulo: "Alta producto",
            producto: cargado,
            error: "Error interno al crear el producto"
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

        const [result] = await ProductModels.deleteProduct(req.id);

        // Mismo control que en modifyProduct: sin esto un id inexistente
        // responderia 200 como si hubiera borrado algo
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

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





