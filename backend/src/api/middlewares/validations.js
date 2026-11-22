const categoriasValidas = ["coffee", "merch"];

// Middleware de ruta para filtrar ids no validos
export const validateId = (req, res, next) => {
    const id = Number(req.params.id); // Convierto a numero el valor pasado en el parametro

    // Si el numero no es un entero o es  <= 0
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); // Damos paso al siguiente middleware o a la respuesta
}

export function validateProduct(req, res, next) {
    const { name, price, category } = req.body;
    if (!name || name.trim().length < 2) {
        return res.status(400).json({ message: "El nombre es obligatorio (minimo 2 caracteres)" });
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
        return res.status(400).json({ message: "El precio debe ser un numero mayor a 0" });
    }
    if (!categoriasValidas.includes(category)) {
        return res.status(400).json({ message: "La categoria debe ser coffee o merch" });
    }
    next();
}

export function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "El email no es valido" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }
    next();
}
