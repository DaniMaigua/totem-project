// Pantalla de bienvenida: guardamos el nombre y pasamos a productos

document.getElementById("welcomeForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("clientName").value.trim();

    if (nombre.length < 2) {
        return;
    }

    localStorage.setItem("anteiku_name", nombre);
    window.location.href = "productos.html";
});



