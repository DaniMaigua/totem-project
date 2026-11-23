// Pantalla de productos: pide el menu completo una vez y filtra aca

const nombre = localStorage.getItem("anteiku_name");

if (!nombre) {
    window.location.href = "index.html";
}

document.getElementById("clientGreeting").textContent = nombre;
updateBadge();

const grid = document.getElementById("productsGrid");

let productos = [];
let categoriaActiva = "coffee";

async function cargarProductos() {
    grid.innerHTML = "<p class='loading'>Cargando productos...</p>";

    try {
        productos = await fetchProducts();
        render();
    } catch (error) {
        console.log("Error cargando productos: ", error);
        grid.innerHTML = "<p class='error'>No se pudo cargar el menu. Reintenta en un momento.</p>";
    }
}

function render() {
    // los productos dados de baja no se muestran,
    // y la categoria se filtra aca porque la API no tiene filtro
    const visibles = productos.filter(item => {
        return item.active === 1 && item.category === categoriaActiva;
    });

    grid.innerHTML = "";

    if (visibles.length === 0) {
        grid.innerHTML = "<p class='loading'>No hay productos en esta categoria.</p>";
        return;
    }

    visibles.forEach(producto => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <img src="${imageUrl(producto.image)}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <span class="category">${producto.category === "coffee" ? "Cafeteria" : "Merchandising"}</span>
            <p class="price">$ ${producto.price}</p>
            <button type="button" class="btn">Agregar al carrito</button>
        `;

        card.querySelector(".btn").addEventListener("click", () => {
            addToCart(producto);
            updateBadge();
        });

        grid.appendChild(card);
    });
}

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");
        categoriaActiva = tab.dataset.cat;
        render();
    });
});

cargarProductos();