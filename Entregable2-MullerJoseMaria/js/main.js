const productos = [
    { id: 1, nombre: 'Laptop Gamer', categoria: 'Tecnología', precio: 1500 },
    { id: 2, nombre: 'Teclado Mecánico', categoria: 'Tecnología', precio: 150 },
    { id: 3, nombre: 'Monitor 27" 4K', categoria: 'Tecnología', precio: 400 },
    { id: 4, nombre: 'Silla Ergonómica', categoria: 'Oficina', precio: 300 },
    { id: 5, nombre: 'Libro de JavaScript', categoria: 'Educación', precio: 50 },
    { id: 6, nombre: 'Mouse Inalámbrico', categoria: 'Tecnología', precio: 75 },
    { id: 7, nombre: 'Auriculares Gaming RGB', categoria: 'Tecnología', precio: 120 },
    { id: 8, nombre: 'Webcam Full HD', categoria: 'Tecnología', precio: 90 },
    { id: 9, nombre: 'Pad de Carga Inalámbrica', categoria: 'Tecnología', precio: 45 },
    { id: 10, nombre: 'Notebook de Notas', categoria: 'Educación', precio: 15 },
    { id: 11, nombre: 'Router Wi-Fi 6', categoria: 'Tecnología', precio: 200 },
    { id: 12, nombre: 'Disco SSD 1TB', categoria: 'Tecnología', precio: 180 },
    { id: 13, nombre: 'Soporte para Laptop', categoria: 'Oficina', precio: 35 },
    { id: 14, nombre: 'Mousepad XL RGB', categoria: 'Tecnología', precio: 60 },
    { id: 15, nombre: 'Mini Proyector Portátil', categoria: 'Tecnología', precio: 250 },
    { id: 16, nombre: 'Cable USB-C 2m', categoria: 'Accesorios', precio: 12 },
    { id: 17, nombre: 'Multitoma con USB', categoria: 'Tecnología', precio: 30 },
    { id: 18, nombre: 'Lámpara LED Escritorio', categoria: 'Oficina', precio: 40 }
];

let carrito = [];

const productosContainer = document.getElementById('productos-container');
const buscadorInput = document.getElementById('buscador');
const carritoItemsContainer = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito-btn');


function renderizarProductos(filtro = '') {
    productosContainer.innerHTML = ''; 

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    if (productosFiltrados.length === 0) {
        productosContainer.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card');
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <button class="agregar-btn" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(card);
    });
}

function renderizarCarrito() {
    carritoItemsContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoItemsContainer.innerHTML = '<li>El carrito está vacío</li>';
        carritoTotal.textContent = 'Total: $0.00';
        return;
    }

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
        carritoItemsContainer.appendChild(li);
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    carritoTotal.textContent = `Total: $${total.toFixed(2)}`;
    guardarCarritoEnStorage();
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    const itemEnCarrito = carrito.find(item => item.id === productoId);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDeStorage();
    renderizarProductos();
    renderizarCarrito();
});

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

productosContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-btn')) {
        const productoId = parseInt(e.target.getAttribute('data-id'));
        agregarAlCarrito(productoId);
    }
});

// BUSCADOR
buscadorInput.addEventListener('input', (e) => {
    renderizarProductos(e.target.value);
});
