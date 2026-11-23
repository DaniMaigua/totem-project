/* El form nativo solo sabe mandar GET o POST.
   Para PUT y DELETE usamos fetch, como en la clase. */

// MODIFICAR PRODUCTO
const formModificar = document.getElementById("form-modificar");

if (formModificar) {
    const mensaje = document.getElementById("mensaje");

    formModificar.addEventListener("submit", async (e) => {
        // cortamos el envio nativo porque necesitamos mandar PUT
        e.preventDefault();

        const producto = Object.fromEntries(new FormData(formModificar));

        try {
            const response = await fetch("/api/products", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            });

            if (response.ok) {
                location.href = "/dashboard";
                return;
            }

            const data = await response.json();
            mensaje.textContent = data.message;
            mensaje.className = "error";
        } catch (error) {
            console.log("Error modificando el producto: ", error);
            mensaje.textContent = "Error de conexion con el servidor";
            mensaje.className = "error";
        }
    });
}

// ELIMINAR PRODUCTO
const botonesEliminar = document.querySelectorAll("[data-eliminar]");

botonesEliminar.forEach(boton => {
    boton.addEventListener("click", async () => {
        if (!confirm("Eliminar este producto?")) {
            return;
        }

        try {
            const response = await fetch(`/api/products/${boton.dataset.eliminar}`, {
                method: "DELETE"
            });

            if (response.ok) {
                location.href = "/dashboard";
                return;
            }

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.log("Error eliminando el producto: ", error);
            alert("Error de conexion con el servidor");
        }
    });
});
