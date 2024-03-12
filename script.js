$(document).ready(function () {
    const carrito = document.getElementById("carrito"),
        listaProductos = document.getElementById("lista-productos"),
        contenedorCarrito = document.querySelector('.buy-card .lista_de_compras'),
        vaciarCarritoBtn = document.querySelector('#vaciar_carrito');
    let articulosCarrito = [];

    registrarEventListeners();

    function registrarEventListeners() {
        // Cuando se da clic en "agregar al carrito de compras"
        listaProductos.addEventListener('click', agregarProducto);

        // Eliminar producto del carrito
        carrito.addEventListener('click', eliminarProducto);

        // Vaciar el carrito
        vaciarCarritoBtn.addEventListener('click', () => {
            articulosCarrito = [];
            limpiarHTML();
        });
    }

    function agregarProducto(e) {
        if (e.target.classList.contains("agregar-carrito")) {
            const productoSeleccionado = e.target.parentElement.parentElement;
            leerInfo(productoSeleccionado);
        }
    }

    function eliminarProducto(e) {
        if (e.target.classList.contains("borrar-producto")) {
            const productoId = parseInt(e.target.dataset.id);
            // Filtrar los productos diferentes al que se quiere eliminar
            articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
            carritoHTML();
        }
    }

    function leerInfo(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.descuento').textContent,
            id: parseInt(producto.querySelector('button').getAttribute('data-id')),
            cantidad: 1
        };

        const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);

        if (existe) {
            // Incrementar la cantidad si el producto ya existe en el carrito
            articulosCarrito = articulosCarrito.map(producto => {
                if (producto.id === infoProducto.id) {
                    producto.cantidad++;
                }
                return producto;
            });
        } else {
            articulosCarrito.push(infoProducto); // Agregar el nuevo producto al carrito
        }

        carritoHTML(); // Actualizar el carrito en el HTML
    }

    function carritoHTML() {
        limpiarHTML();
        articulosCarrito.forEach(producto => {
            const fila = document.createElement('div');
            fila.innerHTML = `
                <img src="${producto.imagen}">
                <p>${producto.titulo}</p>
                <p>${producto.precio}</p>
                <p>${producto.cantidad}</p>
                <p><span class="borrar-producto" data-id="${producto.id}">X</span></p>
            `;
            contenedorCarrito.appendChild(fila);
        });
    }

    function limpiarHTML() {
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }
});
