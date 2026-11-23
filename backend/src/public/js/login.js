// Acceso rapido: completa el formulario para no escribir a mano en cada prueba

document.getElementById("quick").addEventListener("click", () => {
    document.querySelector('[name="email"]').value = "admin@anteiku.com";
    document.querySelector('[name="password"]').value = "admin123";
});
