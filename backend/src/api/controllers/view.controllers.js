/*============================
    Controladores de vistas
============================*/

import bcrypt from "bcrypt";
import { selectUserByEmail, insertNewUser } from "../models/user.models.js";

/////////////////////////////
// Panel principal
export const showDashboard = (req, res) => {
    res.render("dashboard", { user: req.session.user });
}

/////////////////////////////
// Mostrar el alta de usuario
export const showUserForm = (req, res) => {
    res.render("userForm");
}

/////////////////////////////
// Crear usuario desde el formulario
// A diferencia del endpoint de la API, la respuesta es la vista
// otra vez con el mensaje, no un JSON
export const createUserFromForm = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.render("userForm", {
                error: "Nombre, email y contraseña son obligatorios"
            });
        }

        const [existentes] = await selectUserByEmail(email);

        if (existentes.length > 0) {
            return res.render("userForm", {
                error: "Ya existe un usuario con ese email"
            });
        }

        if (password.length < 6) {
            return res.render("userForm", {
                error: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const [result] = await insertNewUser(name, email, hash);

        res.render("userForm", {
            success: `Usuario ${name} creado con el id ${result.insertId}`
        });
    } catch (error) {
        console.log("Error creando usuario desde el panel: ", error);
        res.render("userForm", {
            error: "Error interno al crear el usuario"
        });
    }
}
