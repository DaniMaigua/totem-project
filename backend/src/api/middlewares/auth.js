// Middleware para proteger las rutas del panel
// Si no hay usuario en sesion, lo mandamos al login
export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}
