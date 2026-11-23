// Ticket: mostramos la venta que el backend guardo, no lo que cree el carrito

const nombre = localStorage.getItem("anteiku_name");

if (!nombre) {
    window.location.href = "index.html";
}

// el id llega por query string porque el carrito lo pone al navegar
const params = new URLSearchParams(window.location.search);
const ventaId = params.get("venta");

if (!ventaId) {
    window.location.href = "carrito.html";
}

const state = document.getElementById("ticketState");
const cuerpo = document.getElementById("ticketBody");
const mensaje = document.getElementById("ticketMessage");

updateBadge();

async function render() {
    try {
        const venta = await fetchSale(ventaId);

        document.getElementById("saleId").textContent = venta.id;
        document.getElementById("saleName").textContent = venta.user_name;
        document.getElementById("saleDate").textContent = new Date(venta.date).toLocaleString("es-AR");

        const items = document.getElementById("saleItems");

        venta.products.forEach(item => {
            const fila = document.createElement("p");
            fila.className = "ticket-row";

            fila.innerHTML = `
                <span>${item.name} x${item.cantidad}</span>
                <strong>$ ${(Number(item.price) * item.cantidad).toFixed(2)}</strong>
            `;

            items.appendChild(fila);
        });

        // el total viene de la tabla sales: es el que se cobro, no la cuenta de ahora
        document.getElementById("saleTotal").textContent = `$ ${Number(venta.total_price).toFixed(2)}`;

        state.hidden = true;
        cuerpo.hidden = false;
    } catch (error) {
        console.log("Error cargando el ticket: ", error);

        state.hidden = true;
        mensaje.textContent = error.message;
    }
}

render();
