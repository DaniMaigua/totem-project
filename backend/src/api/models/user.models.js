import connection from "../database/db.js";

// Buscar usuario por email (para el login)
export const selectUserByEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return connection.query(sql, [email]);
}

// Crear usuario
// los usuarios que se crean por endpoint son administradores
export const insertNewUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password, es_admin) VALUES (?, ?, ?, 1)";
    return connection.query(sql, [name, email, password]);
}
