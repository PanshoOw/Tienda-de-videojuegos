
// Selecciona el contenedor principal donde se mostrará el catálogo
const contenedorProductos = document.getElementById("contenedorProductos");

const formularioBusqueda = document.getElementById("formularioBusqueda");

const campoBusqueda = document.getElementById("campoBusqueda");

// Elementos relacionados con el carrito de compras
const listaCarrito = document.getElementById("listaCarrito");

const cantidadCarrito = document.getElementById("cantidadCarrito");

const totalCarrito = document.getElementById("totalCarrito");

// Almacena los productos cargados desde el archivo JSON
let catalogoProductos = [];

// Almacena los productos agregados al carrito
let carrito = [];

// Agrega los eventos mouseover y mouseout a una portada
function configurarEfectoPortada(portada) {
    portada.addEventListener("mouseover", function () {
        portada.style.transform = "scale(1.05)";
    });

    portada.addEventListener("mouseout", function () {
        portada.style.transform = "scale(1)";
    });
}

// Configura el formulario para buscar productos en el catálogo
function configurarFormularioBusqueda() {
    formularioBusqueda.addEventListener("submit", function (event) {
        event.preventDefault();

        const terminoBusqueda = campoBusqueda.value.trim().toLowerCase();

        if (terminoBusqueda === "") {
            mostrarProductos(catalogoProductos);
            return;
        }

        const productosFiltrados = catalogoProductos.filter(
            function (producto) {
                return (
                    producto.nombre.toLowerCase().includes(terminoBusqueda) ||
                    producto.plataforma.toLowerCase().includes(terminoBusqueda) ||
                    producto.genero.toLowerCase().includes(terminoBusqueda) ||
                    producto.categoria.toLowerCase().includes(terminoBusqueda)
                );
            }
        );

        mostrarProductos(productosFiltrados);
    });
}

// Activa el comportamiento del formulario de búsqueda
configurarFormularioBusqueda();

// Configura los botones para agregar productos al carrito
function configurarCarrito() {
    contenedorProductos.addEventListener("click", function (event) {
        const botonAgregar = event.target.closest(
            "[data-id]"
        );

        if (!botonAgregar) {
            return;
        }

        const idProducto = Number(botonAgregar.dataset.id);

        const productoSeleccionado = catalogoProductos.find(
            function (producto) {
                return producto.id === idProducto;
            }
        );

        if (productoSeleccionado) {
            const productoEnCarrito = carrito.find(
                function (producto) {
                    return producto.id === productoSeleccionado.id;
                }
            );

            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({
                    ...productoSeleccionado,
                    cantidad: 1
                });
            }

            actualizarCarrito();
        }
    });
}

// Actualiza visualmente el contenido y el total del carrito en el DOM
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.classList.add("text-body-secondary", "mb-0");
        mensajeVacio.textContent = "Tu carrito está vacío.";

        listaCarrito.appendChild(mensajeVacio);

        cantidadCarrito.textContent = "0";
        totalCarrito.textContent = "$0";
        return;
    }

    const encabezadoCarrito = document.createElement("div");
    encabezadoCarrito.classList.add("carrito-encabezado");

    const encabezadoProducto = document.createElement("span");
    encabezadoProducto.textContent = "Producto";

    const encabezadoCantidad = document.createElement("span");
    encabezadoCantidad.textContent = "Cantidad";
    encabezadoCantidad.classList.add("text-center");

    const encabezadoSubtotal = document.createElement("span");
    encabezadoSubtotal.textContent = "Subtotal";
    encabezadoSubtotal.classList.add("text-end");

    encabezadoCarrito.appendChild(encabezadoProducto);
    encabezadoCarrito.appendChild(encabezadoCantidad);
    encabezadoCarrito.appendChild(encabezadoSubtotal);

    listaCarrito.appendChild(encabezadoCarrito);

    carrito.forEach(function (producto) {
        const elementoCarrito = document.createElement("div");
        elementoCarrito.classList.add("carrito-item");

        const nombreCarrito = document.createElement("span");
        nombreCarrito.classList.add("carrito-nombre");
        nombreCarrito.textContent = producto.nombre;

        const cantidadProducto = document.createElement("span");
        cantidadProducto.classList.add("carrito-cantidad");
        cantidadProducto.textContent = producto.cantidad;

        const precioCarrito = document.createElement("span");
        precioCarrito.classList.add("carrito-subtotal");

        const subtotalProducto =
            producto.precio * producto.cantidad;

        precioCarrito.textContent =
            "$" + subtotalProducto.toLocaleString("es-CL");

        elementoCarrito.appendChild(nombreCarrito);
        elementoCarrito.appendChild(cantidadProducto);
        elementoCarrito.appendChild(precioCarrito);

        listaCarrito.appendChild(elementoCarrito);
    });

    const cantidadTotal = carrito.reduce(
        function (acumulador, producto) {
            return acumulador + producto.cantidad;
        },
        0
    );

    cantidadCarrito.textContent = cantidadTotal;

    const total = carrito.reduce(
        function (acumulador, producto) {
            return acumulador +
                producto.precio * producto.cantidad;
        },
        0
    );

    totalCarrito.textContent =
        "$" + total.toLocaleString("es-CL");
}

configurarCarrito();

// Crea una tarjeta Bootstrap a partir de los datos de un producto
function crearTarjetaProducto(producto) {
    const columna = document.createElement("div");
    columna.classList.add("col-12", "col-md-6", "col-lg-4");

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "h-100");

    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.alt = "Portada de " + producto.nombre;
    imagenProducto.classList.add(
        "card-img-top",
        "portada-producto"
    );

    configurarEfectoPortada(imagenProducto);

    const cuerpoTarjeta = document.createElement("div");
    cuerpoTarjeta.classList.add(
        "card-body",
        "d-flex",
        "flex-column"
    );

    const nombreProducto = document.createElement("h4");
    nombreProducto.classList.add("card-title");
    nombreProducto.textContent = producto.nombre;

    const plataformaProducto = document.createElement("p");
    plataformaProducto.classList.add(
        "text-body-secondary",
        "small",
        "mb-1"
    );

    plataformaProducto.textContent = producto.plataforma;

    const generoProducto = document.createElement("p");
    generoProducto.classList.add(
        "text-body-secondary",
        "small",
        "mb-3"
    );

    generoProducto.textContent = producto.genero;

    const descripcionProducto = document.createElement("p");
    descripcionProducto.classList.add(
        "card-text",
        "descripcion-producto"
    );
    
    descripcionProducto.textContent = producto.descripcion;

    const precioProducto = document.createElement("p");
    precioProducto.classList.add(
        "fw-bold",
        "fs-5",
        "mt-auto",
        "mb-0"
    );

    precioProducto.textContent = "$" + producto.precio.toLocaleString("es-CL");

    const botonAgregarCarrito = document.createElement("button");
    botonAgregarCarrito.type = "button";
    botonAgregarCarrito.classList.add(
        "btn",
        "btn-primary",
        "mt-3"
    );

    botonAgregarCarrito.textContent = "Agregar al carrito";
    botonAgregarCarrito.dataset.id = producto.id;

    cuerpoTarjeta.appendChild(nombreProducto);
    cuerpoTarjeta.appendChild(plataformaProducto);
    cuerpoTarjeta.appendChild(generoProducto);
    cuerpoTarjeta.appendChild(descripcionProducto);
    cuerpoTarjeta.appendChild(precioProducto);
    cuerpoTarjeta.appendChild(botonAgregarCarrito);

    tarjeta.appendChild(imagenProducto);
    tarjeta.appendChild(cuerpoTarjeta);

    columna.appendChild(tarjeta);

    return columna;
}

// Muestra en el DOM todos los productos recibidos
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = "";

    if (productos.length === 0) {
        const mensajeSinResultados = document.createElement("p");
        mensajeSinResultados.classList.add(
            "text-center",
            "text-body-secondary",
            "mt-3"
        );

        mensajeSinResultados.textContent =
            "No se encontraron productos para la búsqueda.";

        contenedorProductos.appendChild(mensajeSinResultados);
        return;
    }
    
    productos.forEach(function (producto) {
        const tarjetaProducto = crearTarjetaProducto(producto);

        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Obtiene los productos desde el archivo JSON y controla posibles errores de carga
function cargarProductos() {
    fetch("assets/data/productos.json")
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error(
                    "Error HTTP: " + respuesta.status
                );
            }

            return respuesta.json();
        })
        .then(function (productos) {
            if (!Array.isArray(productos)) {
                throw new Error("El formato de los productos no es válido.");
            }
            
            catalogoProductos = productos;
            mostrarProductos(catalogoProductos);
        })
        .catch(function (error) {
            console.error("Error al cargar los productos:", error);

            contenedorProductos.innerHTML = "";

            const mensajeError = document.createElement("p");
            mensajeError.textContent =
                "No fue posible cargar los productos en este momento. Intenta nuevamente más tarde";

            mensajeError.classList.add("text-danger", "text-center", "mt-3");

            contenedorProductos.appendChild(mensajeError);
        });
}

// Ejecuta la carga inicial de productos
cargarProductos();