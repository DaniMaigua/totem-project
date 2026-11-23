import connection from "../database/db.js";

//BUSCAR PRODUCTO PARA LA VENTA
//Solo activos, y trae el precio desde la BD: al cliente no le creemos nada
const selectProductForSale = (function(id){
    const sql = "SELECT id, name, image, price FROM products WHERE id = ? AND active = 1";
    return connection.query(sql, [id]);
})

//CREAR VENTA
//la columna date tiene current_timestamp de default, la pone MySQL
const insertSale = (function(user_name, total_price){
    const sql = "INSERT INTO sales (user_name, total_price) VALUES (?, ?)";
    return connection.query(sql, [user_name, total_price]);
})

//SUMAR UN PRODUCTO A LA VENTA
//product_sales es la tabla intermedia de la relacion N:M del enunciado
const insertProductSale = (function(product_id, sale_id, cantidad){
    const sql = "INSERT INTO product_sales (product_id, sale_id, cantidad) VALUES (?, ?, ?)";
    return connection.query(sql, [product_id, sale_id, cantidad]);
})

//OBTENER VENTA POR ID
const selectSaleById = (function(id){
    const sql = "SELECT * FROM sales WHERE sales.id = ?";
    return connection.query(sql, [id]);
})

//OBTENER LOS PRODUCTOS DE UNA VENTA
const selectSaleProducts = (function(sale_id){
    const sql = `
        SELECT p.id, p.name, p.image, p.price, ps.cantidad
        FROM product_sales ps
        JOIN products p ON p.id = ps.product_id
        WHERE ps.sale_id = ?`;
    return connection.query(sql, [sale_id]);
})

export default{
    selectProductForSale,
    insertSale,
    insertProductSale,
    selectSaleById,
    selectSaleProducts
}
