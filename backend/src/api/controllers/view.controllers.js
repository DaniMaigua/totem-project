/*============================
    Controladores de vistas
============================*/

/////////////////////////////
// Panel principal
export const showDashboard = (req, res) => {
    res.render("dashboard", { user: req.session.user });
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
export const showProductForm = (req, res) => {
    res.render("productForm",
        {
            titulo: "Alta producto",
            producto: {id: null, name: "", image: "", category: "", price:"", active: 1}
        }
    );
}
