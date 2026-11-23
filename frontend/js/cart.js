const CARRITO_KEY = "anteiku_cart";

function getCarrito() {
    return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
}

function saveCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function addToCart(producto) {
    const carrito = getCarrito();
    const enCarrito = carrito.find(item => item.id === producto.id);

    if (enCarrito) {
        enCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            name: producto.name,
            image: producto.image,
            price: Number(producto.price),
            cantidad: 1
        });
    }

    saveCarrito(carrito);
}

// el contador del menu de arriba
function updateBadge() {
    const total = getCarrito().reduce((suma, item) => suma + item.cantidad, 0);
    document.getElementById("cartBadge").textContent = total;
}