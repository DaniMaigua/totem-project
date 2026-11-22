// Controladores usuario

import bcrypt from "bcrypt";
import { selectUserByEmail, insertNewUser } from "../models/user.models.js";

// Crear usuario administrador
// La contraseña se guarda hasheada, nunca en texto plano
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // chequeamos que no exista ya un usuario con ese email
        const [existentes] = await selectUserByEmail(email);

        if (existentes.length > 0) {
            return res.status(409).json({
                message: "Ya existe un usuario con ese email"
            });
        }

        // bcrypt.hash genera el hash de la contraseña
        const hash = await bcrypt.hash(password, 10);

        const [result] = await insertNewUser(name, email, hash);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            userId: result.insertId
        });
    } catch (error) {
        console.log("Error creando usuario: ", error);
        res.status(500).json({
            message: "Error interno al crear usuario"
        });
    }
}
