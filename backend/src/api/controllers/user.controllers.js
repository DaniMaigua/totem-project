// Controladores usuario

import bcrypt from "bcrypt";
import { selectUserByEmail, insertNewUser } from "../models/user.models.js";

// Crear usuario administrador
// La contraseña se guarda hasheada, nunca en texto plano
// El form de alta apunta aca, por eso la respuesta es la vista
// con el mensaje y no un JSON
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // chequeamos que no exista ya un usuario con ese email
        const [existentes] = await selectUserByEmail(email);

        if (existentes.length > 0) {
            return res.status(409).render("userForm", {
                error: "Ya existe un usuario con ese email"
            });
        }

        // bcrypt.hash genera el hash de la contraseña
        const hash = await bcrypt.hash(password, 10);

        const [result] = await insertNewUser(name, email, hash);

        res.status(201).render("userForm", {
            success: `Usuario ${name} creado con el id ${result.insertId}`
        });
    } catch (error) {
        console.log("Error creando usuario: ", error);
        res.status(500).render("userForm", {
            error: "Error interno al crear usuario"
        });
    }
}
