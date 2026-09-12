// Comprueba que el archivo JS se cargó correctamente
console.log("JavaScript cargado correctamente.");

// Selección y modificación de elementos del DOM
const encabezado = document.getElementById("inicio");
console.log(encabezado);

const descripcionEncabezado = encabezado.querySelector("p");
console.log(descripcionEncabezado);

descripcionEncabezado.textContent =
    "Tu tienda especializada en videojuegos, novedades y clásicos para todas las plataformas.";

// Creación dinámica de la sección de novedades
const seccionNovedades = document.createElement("section");
seccionNovedades.id = "novedades";

const tituloNovedades = document.createElement("h2");
tituloNovedades.textContent = "Novedades";

const descripcionNovedades = document.createElement("p");
descripcionNovedades.textContent =
    "Descubre nuevos videojuegos añadidos recientemente a nuestro catálogo.";
descripcionNovedades.classList.add("mb-3");

const botonNovedades = document.createElement("button");
botonNovedades.textContent = "Ocultar novedades";
botonNovedades.classList.add("btn", "btn-primary");

// Creación dinámica del formulario de suscripción
const formularioNovedades = document.createElement("form");
formularioNovedades.classList.add("mt-4");

const etiquetaCorreo = document.createElement("label");
etiquetaCorreo.textContent = "Correo Electrónico";
etiquetaCorreo.classList.add("form-label");
etiquetaCorreo.htmlFor = "correoNovedades";

const campoCorreo = document.createElement("input");
campoCorreo.type = "email";
campoCorreo.placeholder = "correo@ejemplo.com";
campoCorreo.classList.add("form-control");
campoCorreo.id = "correoNovedades";

const botonSuscribirse = document.createElement("button");
botonSuscribirse.type = "submit";
botonSuscribirse.textContent = "Suscribirse";
botonSuscribirse.classList.add("btn", "btn-success", "mt-3");

const mensajeFormulario = document.createElement("p");
mensajeFormulario.classList.add("mt-3");

// Agrega los elementos al formulario
formularioNovedades.appendChild(etiquetaCorreo);
formularioNovedades.appendChild(campoCorreo);
formularioNovedades.appendChild(botonSuscribirse);
formularioNovedades.appendChild(mensajeFormulario);

// Contenedos para los productos cargados mediante Fetch API
const tituloProductoDinamicos = document.createElement("h3");
tituloProductoDinamicos.textContent = "Productos agregados dinámicamente";
tituloProductoDinamicos.classList.add("mt-4");

const contenedorProductosDinamicos = document.createElement("div");
contenedorProductosDinamicos.classList.add("row", "g-3", "mt-2");

// Agrega los elementos creados dinámicamente a la sección de novedades
seccionNovedades.appendChild(tituloNovedades);
seccionNovedades.appendChild(descripcionNovedades);
seccionNovedades.appendChild(botonNovedades);
seccionNovedades.appendChild(tituloProductoDinamicos);
seccionNovedades.appendChild(contenedorProductosDinamicos);
seccionNovedades.appendChild(formularioNovedades);

// Agrega la sección de novedades al contenido principal de la página
const contenidoPrincipal = document.querySelector("main");
contenidoPrincipal.appendChild(seccionNovedades);

// Configura el botón para mostrar u ocultar la descripción de novedades
function configurarBotonNovedades() {
    botonNovedades.addEventListener("click", function () {
        if (descripcionNovedades.hidden) {
            descripcionNovedades.hidden = false;
            botonNovedades.textContent = "Ocultar novedades";
        } else {
            descripcionNovedades.hidden = true;
            botonNovedades.textContent = "Mostrar noveades";
        }
    });
}

// Activa el comportamiento del botón de novedades
configurarBotonNovedades();

// Agrega los eventos mouseover y mouseout a una portada
function configurarEfectoPortada(portada) {
    portada.addEventListener("mouseover", function () {
        portada.style.transform = "scale(1.05)";
    });

    portada.addEventListener("mouseout", function () {
        portada.style.transform = "scale(1)";
    });
}

// Aplica el efecto a las portadas existentes en el HTML
const portadasProductos = document.querySelectorAll(".portada-producto");

portadasProductos.forEach(function (portada) {
    configurarEfectoPortada(portada);
});

// Evento submit del formulario de novedades
function configurarFormularioNovedades() {
    formularioNovedades.addEventListener("submit", function (event) {
        event.preventDefault();

        const correo = campoCorreo.value.trim();

        if (correo === "") {
            mensajeFormulario.textContent =
                "Debes ingresar un correo electrónico.";
        } else {
            mensajeFormulario.textContent =
                "¡Gracias por suscribirte a nuestras novedades!";

            campoCorreo.value = "";
        }
    });
}

// Activa el comportamiento del formulario de novedades
configurarFormularioNovedades();

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
    cuerpoTarjeta.classList.add("card-body");

    const nombreProducto = document.createElement("h4");
    nombreProducto.classList.add("card-title");
    nombreProducto.textContent = producto.nombre;

    const plataformaProducto = document.createElement("p");
    plataformaProducto.classList.add("card-text");
    plataformaProducto.textContent =
        "Plataforma: " + producto.plataforma;

    const generoProducto = document.createElement("p");
    generoProducto.classList.add("card-text");
    generoProducto.textContent =
        "Género: " + producto.genero;

    cuerpoTarjeta.appendChild(nombreProducto);
    cuerpoTarjeta.appendChild(plataformaProducto);
    cuerpoTarjeta.appendChild(generoProducto);

    tarjeta.appendChild(imagenProducto);
    tarjeta.appendChild(cuerpoTarjeta);

    columna.appendChild(tarjeta);

    return columna;
}

// Muestra en el DOM todos los productos recibidos
function mostrarProductos(productos) {
    productos.forEach(function (producto) {
        const tarjetaProducto = crearTarjetaProducto(producto);

        contenedorProductosDinamicos.appendChild(tarjetaProducto);
    });
}

// Obtiene los productos desde el archivo JSON y controla posibles errores de carga
function cargarProductos() {
    fetch("productos.json")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (productos) {
            console.log(productos);
            mostrarProductos(productos);
        })
        .catch(function (error) {
            console.error("Error al cargar los productos:", error);

            const mensajeError = document.createElement("p");
            mensajeError.textContent =
                "No fue posible cargar los productos en este momento.";

            mensajeError.classList.add("text-danger", "mt-3");

            contenedorProductosDinamicos.appendChild(mensajeError);
        });
}

// Ejecuta la carga inicial de productos
cargarProductos();