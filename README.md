# El Bazar de PanshoOw

Proyecto desarrollado para la asignatura **Desarrollo Frontend I (PFY2201)**.

El sitio corresponde a una tienda de videojuegos desarrollada progresivamente durante las actividades del curso, incorporando HTML5, CSS3, diseño responsivo, Bootstrap 5 y JavaScript.

Durante la Semana 6 se optimizó la lógica de la página mediante manipulación dinámica del DOM, eventos de usuario, Fetch API y carga de productos desde un archivo JSON local.

## Características

- Estructura semántica desarrollada con HTML5.
- Hoja de estilos CSS externa.
- Diseño responsivo para escritorio, tablet y dispositivos móviles.
- Barra de navegación responsiva utilizando Bootstrap Navbar.
- Menú desplegable de productos con categorías simuladas.
- Carrusel de imágenes utilizando Bootstrap Carousel.
- Distribución de productos mediante Bootstrap Grid.
- Presentación de productos mediante Bootstrap Cards.
- Navegación accesible mediante estilos `:focus-visible`.
- Catálogo de productos generado dinámicamente mediante JavaScript.
- Carga de productos desde un archivo JSON local utilizando Fetch API.
- Manipulación dinámica del DOM mediante `createElement()` y `appendChild()`.
- Buscador de productos mediante el evento `submit`.
- Búsqueda por nombre, plataforma, género y categoría.
- Carrito de compras mediante el evento `click`.
- Agrupación de productos repetidos y actualización de cantidades.
- Cálculo dinámico de subtotales y total general del carrito.
- Manejo de eventos `click`, `mouseover`, `mouseout` y `submit`.
- Manejo de promesas mediante `.then()` y control de errores mediante `.catch()`.
- Validación de la respuesta obtenida mediante Fetch API.
- Mensaje informativo en caso de error durante la carga de productos.
- Organización del código JavaScript mediante funciones reutilizables y comentarios explicativos.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- JSON
- Fetch API

## Estructura del proyecto

```text
Tienda-de-videojuegos/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── data/
│   │   └── productos.json
│   ├── img/
│   │   ├── gtavi-2.jpg
│   │   ├── gtavi-3.jpg
│   │   ├── portada-elden-ring.jpg
│   │   ├── portada-fall-guys.jpg
│   │   ├── portada-gtavi.jpg
│   │   ├── portada-minecraft.jpg
│   │   ├── portada-re4-remake.jpg
│   │   ├── portada-super-smash-bros-brawl.jpg
│   │   └── portada-zelda-totk.jpg
│   └── js/
│       └── script.js
├── evidencias/
├── index.html
├── README.md
└── .gitignore