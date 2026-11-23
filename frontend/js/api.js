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

