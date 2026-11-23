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

// ELIMINAR PRODUCTO, con modal de confirmacion
const modal = document.getElementById("modal");

if (modal) {
    const texto = document.getElementById("modal-texto");
    const botonOk = document.getElementById("modal-ok");
    const botonCancelar = document.getElementById("modal-cancelar");

    let productoSeleccionado = "";

    const abrirModal = (mensaje, conConfirmar) => {
        texto.textContent = mensaje;
        botonOk.hidden = !conConfirmar;
        modal.classList.add("abierto");
    };

    const cerrarModal = () => {
        modal.classList.remove("abierto");
        productoSeleccionado = "";
    };

    document.querySelectorAll("[data-eliminar]").forEach(boton => {
        boton.addEventListener("click", () => {
            productoSeleccionado = boton.dataset.eliminar;
            abrirModal("Eliminar este producto?", true);
        });
    });

    botonCancelar.addEventListener("click", cerrarModal);

    botonOk.addEventListener("click", async () => {
        const id = productoSeleccionado;
        cerrarModal();

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                location.href = "/dashboard";
                return;
            }

            const data = await response.json();
            abrirModal(data.message, false);
        } catch (error) {
            console.log("Error eliminando el producto: ", error);
            abrirModal("Error de conexion con el servidor", false);
        }
    });
}
