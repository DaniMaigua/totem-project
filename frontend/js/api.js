// Acceso a la API de productos

async function fetchProducts() {
    const response = await fetch(`${API_URL}/api/products`);

    if (!response.ok) {
        throw new Error("No se pudo cargar el menu");
    }

    const data = await response.json();

    // la API responde { payload, total }
    return data.payload;
}

// las imagenes vienen como "/uploads/products/"
// viven en el backend, asi que hay que armar la url completa
function imageUrl(ruta) {
    return API_URL + ruta;
}

// Registro de la venta.
// Solo mandamos id y cantidad: el precio lo pone el backend.
async function createSale(user_name, carrito) {
    const products = carrito.map(item => {
        return { id: item.id, cantidad: item.cantidad };
    });

    const response = await fetch(`${API_URL}/api/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, products })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo registrar la venta");
    }

    const data = await response.json();
    return data.payload;
}

// La venta ya guardada, para mostrar el ticket
async function fetchSale(id) {
    const response = await fetch(`${API_URL}/api/sales/${id}`);

    if (!response.ok) {
        throw new Error("No se pudo cargar el ticket");
    }

    const data = await response.json();
    return data.payload;
}

