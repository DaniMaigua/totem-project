import bcrypt from "bcrypt";
import { selectUserByEmail } from "../models/user.models.js";

// Mostrar el login
export const showLogin = (req, res) => {
    res.render("login");
}

// Iniciar sesion
// Comparamos la contraseña con bcrypt.compare
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await selectUserByEmail(email);

        // no existe el usuario, o no es administrador
        if (rows.length === 0 || rows[0].es_admin !== 1) {
            return res.render("login", { error: "Email o contraseña incorrectos" });
        }

        const user = rows[0];

        const coinciden = await bcrypt.compare(password, user.password);

        if (!coinciden) {
            return res.render("login", { error: "Email o contraseña incorrectos" });
        }

        // guardamos al usuario en la sesion
        req.session.user = { id: user.id, name: user.name };

        res.redirect("/dashboard");
    } catch (error) {
        console.log("Error en el login: ", error);
        res.render("login", { error: "Error al iniciar sesion" });
    }
}

// Cerrar sesion
export const logout = (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
}
