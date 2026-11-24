// Pantalla de carrito: lee el localStorage que escribe cart.js

const nombre = localStorage.getItem("anteiku_name");

if (!nombre) {
    window.location.href = "index.html";
}

const lista = document.getElementById("cartList");
const total = document.getElementById("cartTotal");
const mensaje = document.getElementById("cartMessage");
const btnFinalizar = document.getElementById("checkoutBtn");

function render() {
    const carrito = getCarrito();

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = "<p class='empty'>Tu carrito esta vacio.</p>";
        total.textContent = "$ 0.00";
        btnFinalizar.disabled = true;
        return;
    }

    btnFinalizar.disabled = false;

    let suma = 0;

    carrito.forEach(item => {
        const subtotal = item.price * item.cantidad;
        suma += subtotal;

        const fila = document.createElement("article");
        fila.className = "cart-row";

        fila.innerHTML = `
            <img src="${imageUrl(item.image)}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p class="price">$ ${item.price} cada uno</p>
            </div>
            <div class="qty">
                <button type="button" class="qty-btn" data-menos>-</button>
                <span>${item.cantidad}</span>
                <button type="button" class="qty-btn" data-mas>+</button>
            </div>
            <p class="subtotal">$ ${subtotal.toFixed(2)}</p>
            <button type="button" class="qty-btn" data-quitar>Quitar</button>
        `;

        // cada boton trabaja sobre el id del item, no sobre la fila
        const menos = fila.querySelector("[data-menos]");
        const mas = fila.querySelector("[data-mas]");
        const quitar = fila.querySelector("[data-quitar]");

        menos.addEventListener("click", () => setCantidad(item.id, item.cantidad - 1));
        mas.addEventListener("click", () => setCantidad(item.id, item.cantidad + 1));
        quitar.addEventListener("click", () => setCantidad(item.id, 0));

        lista.appendChild(fila);
    });

    total.textContent = `$ ${suma.toFixed(2)}`;
}

// Unica funcion que escribe el carrito en esta pantalla.
// Reusa getCarrito y saveCarrito de cart.js para no duplicar el formato.
function setCantidad(id, cantidad) {
    let carrito = getCarrito();

    if (cantidad < 1) {
        carrito = carrito.filter(item => item.id !== id);
    } else {
        carrito.forEach(item => {
            if (item.id === id) {
                item.cantidad = cantidad;
            }
        });
    }

    saveCarrito(carrito);
    updateBadge();
    render();
}

btnFinalizar.addEventListener("click", async () => {
    const carrito = getCarrito();

    if (carrito.length === 0) {
        return;
    }

    btnFinalizar.disabled = true;
    btnFinalizar.textContent = "Registrando venta...";

    try {
        // el backend confirma precios y devuelve la venta guardada
        const venta = await createSale(nombre, carrito);

        clearCarrito();

        // el carrito lo guarda y ademas lo pone en la url.
        // sin ".html" a proposito: serve reescribe /ticket.html?venta=3 y
        // en ese salto pierde el query, asi que el id solo llega bien asi
        localStorage.setItem("anteiku_venta", venta.id);

        window.location.href = `ticket?venta=${venta.id}`;
    } catch (error) {
        console.log("Error al finalizar la compra: ", error);

        btnFinalizar.disabled = false;
        btnFinalizar.textContent = "Finalizar compra";
        mensaje.textContent = error.message;
    }
});

updateBadge();
render();
