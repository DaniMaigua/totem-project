// Ticket: mostramos la venta que el backend guardo, no lo que cree el carrito

const nombre = localStorage.getItem("anteiku_name");

if (!nombre) {
    window.location.href = "index.html";
}

// el id llega por query string porque el carrito lo pone al navegar.
// si la query se pierde por el camino usamos el ultimo id que dejo el carrito
const params = new URLSearchParams(window.location.search);
const ventaId = params.get("venta") || localStorage.getItem("anteiku_venta");

if (!ventaId) {
    window.location.href = "carrito.html";
}

const state = document.getElementById("ticketState");
const cuerpo = document.getElementById("ticketBody");
const mensaje = document.getElementById("ticketMessage");
const btnPdf = document.getElementById("ticketPdf");

let venta = null;

updateBadge();

function subtotal(item) {
    return `$ ${(Number(item.price) * item.cantidad).toFixed(2)}`;
}

function fechaTicket(valor) {
    return new Date(valor).toLocaleString("es-AR");
}

async function render() {
    try {
        venta = await fetchSale(ventaId);

        document.getElementById("saleId").textContent = venta.id;
        document.getElementById("saleName").textContent = venta.user_name;
        document.getElementById("saleDate").textContent = fechaTicket(venta.date);

        const items = document.getElementById("saleItems");

        venta.products.forEach(item => {
            const fila = document.createElement("p");
            fila.className = "ticket-row";

            fila.innerHTML = `
                <span>${item.name} x${item.cantidad}</span>
                <strong>${subtotal(item)}</strong>
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

// El PDF lo arma jsPDF, la libreria que el profe deja usar para el TP
btnPdf.addEventListener("click", () => {
    if (!venta) {
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("Anteiku", 20, y);
    y += 7;

    doc.setFontSize(11);
    doc.text("Ticket de compra", 20, y);
    y += 12;

    doc.text(`Venta ${venta.id}`, 20, y);
    y += 6;
    doc.text(`Cliente ${venta.user_name}`, 20, y);
    y += 6;
    doc.text(`Fecha ${fechaTicket(venta.date)}`, 20, y);
    y += 10;

    venta.products.forEach(item => {
        doc.text(`${item.name} x${item.cantidad}`, 20, y);
        doc.text(subtotal(item), 190, y, { align: "right" });
        y += 6;
    });

    doc.setFontSize(13);
    doc.text(`Total $ ${Number(venta.total_price).toFixed(2)}`, 20, y + 6);

    doc.save(`ticket-${venta.id}.pdf`);
});

render();
