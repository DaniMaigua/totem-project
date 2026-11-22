import connection from "../database/db.js";


//OBTENER PRODUCTOS (NO TODA LA TABLA, solo resultado de consulta)
const selectAllProducts = (function(){
    return connection.query("SELECT * FROM products");
})

//OBTENER PRODUCTOS POR ID
const selectProductById = (function(id){
    const sql = "SELECT *FROM products WHERE products.id = ?"
    return connection.query(sql, [id]);
})

//CREAR PRODUCTO
const insertNewProduct = function(name, image, category, price) {
    const sql = `
        INSERT INTO products (name, image, category, price)
        VALUES (?, ?, ?, ?)`;
    return connection.query(sql, [name, image, category, price]);
};

//MODIFICAR PRODUCTO

const updateProduct = (function (name, image, price, category, active, id){
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";

    return connection.query(sql, [name, image, price, category, active, id]);
})

//ELIMINAR PRODUCTO
const deleteProduct = (function(id){
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql,[id]);
})

export default{
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct
}

