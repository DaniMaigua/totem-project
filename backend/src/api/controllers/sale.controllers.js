/*============================
    Controladores venta
============================*/

import SaleModels from "../models/sale.models.js";

//REGISTRAR UNA VENTA
//El cliente manda ids y cantidades. El precio lo leemos de la BD y el total
//lo calculamos aca: si viniera en el body, cualquiera compraria un cafe a 1 peso
export const createSale = async (req, res) => {

    try {
        const { user_name, products } = req.body;

        if (!user_name || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "La venta necesita un nombre y al menos un producto"
            });
        }

        const detalle = [];

        for (const item of products) {

            const [rows] = await SaleModels.selectProductForSale(item.id);

            if (rows.length === 0) {
                return res.status(400).json({
                    message: `El producto ${item.id} no esta disponible`
                });
            }

            const cantidad = Number(item.cantidad);

            if (!Number.isInteger(cantidad) || cantidad < 1) {
                return res.status(400).json({
                    message: "Las cantidades deben ser numeros positivos"
                });
            }

            const producto = rows[0];
            const price = Number(producto.price);

            detalle.push({
                id: producto.id,
                name: producto.name,
                image: producto.image,
                price: price,
                cantidad: cantidad,
                subtotal: price * cantidad
            });
        }

        const total = detalle.reduce((suma, item) => suma + item.subtotal, 0);

        const [saleResult] = await SaleModels.insertSale(user_name.trim(), total.toFixed(2));

        for (const item of detalle) {
            await SaleModels.insertProductSale(item.id, saleResult.insertId, item.cantidad);
        }

        res.status(201).json({
            message: "Venta registrada exitosamente",
            payload: {
                id: saleResult.insertId,
                user_name: user_name.trim(),
                total_price: total.toFixed(2),
                products: detalle
            }
        });

    } catch (error) {
        console.log("Error registrando la venta: ", error);

        res.status(500).json({
            message: "Error interno al registrar la venta"
        });
    }
}

//OBTENER UNA VENTA CON SUS PRODUCTOS
export const getSale = async (req, res) => {

    try {
        const [sales] = await SaleModels.selectSaleById(req.id);

        if (sales.length === 0) {
            return res.status(404).json({
                message: `No se encontro venta con id ${req.id}`
            });
        }

        const [products] = await SaleModels.selectSaleProducts(req.id);

        res.status(200).json({
            payload: {
                ...sales[0],
                products: products
            }
        });

    } catch (error) {
        console.log("Error obteniendo la venta: ", error);

        res.status(500).json({
            message: "Error interno al obtener la venta"
        });
    }
}
