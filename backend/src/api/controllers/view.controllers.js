/*============================
    Controladores de vistas
============================*/

import ProductModels from "../models/product.models.js";

/////////////////////////////
// Panel principal: listado de productos
export const showDashboard = async (req, res) => {

    try {
        const [rows] = await ProductModels.selectAllProducts();

        res.render("dashboard", {
            user: req.session.user,
            productos: rows
        });
    } catch (error) {
        console.log("Error obteniendo el listado: ", error);

        res.render("dashboard", {
            user: req.session.user,
            productos: [],
            error: "No se pudieron cargar los productos"
        });
    }
}

/////////////////////////////
// Mostrar el alta de usuario
// El posteo lo resuelve createUser en el controller de usuario,
// que responde con esta misma vista y su mensaje
export const showUserForm = (req, res) => {
    res.render("userForm");
}

/////////////////////////////
// Formulario de producto
// El posteo lo resuelve createProduct en el controller de producto
export const showProductForm = (req, res) => {
    res.render("productForm",
        {
            titulo: "Alta producto",
            producto: {id: null, name: "", image: "", category: "", price:"", active: 1}
        }
    );
}

/////////////////////////////
// Consulta de producto por id
// El id llega por query string porque el form es un GET nativo
export const showProductDetail = async (req, res) => {

    const id = Number(req.query.id);
    const buscado = Number.isInteger(id) && id > 0 ? id : "";

    if (!buscado) {
        return res.render("productDetail", {
            buscado: "",
            producto: null
        });
    }

    try {
        const [rows] = await ProductModels.selectProductById(buscado);

        res.render("productDetail", {
            buscado: buscado,
            producto: rows.length > 0 ? rows[0] : null,
            error: rows.length > 0 ? "" : `No se encontro producto con id ${buscado}`
        });
    } catch (error) {
        console.log("Error consultando el producto: ", error);

        res.render("productDetail", {
            buscado: buscado,
            producto: null,
            error: "Error interno al consultar el producto"
        });
    }
}

/////////////////////////////
// Modificar producto: buscamos el producto y mostramos el mismo form cargado
export const showProductUpdate = async (req, res) => {

    try {
        const [rows] = await ProductModels.selectProductById(req.params.id);

        if (rows.length === 0) {
            return res.redirect("/dashboard");
        }

        const producto = rows[0];

        res.render("productForm", {
            titulo: "Modificar producto",
            producto: producto
        });
    } catch (error) {
        console.log("Error obteniendo el producto: ", error);
        res.redirect("/dashboard");
    }
}
