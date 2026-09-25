# 🎮 El Bazar de PanshoOw

Proyecto eCommerce de videojuegos desarrollado con **React y Vite** para la asignatura **Frontend I - PFY2201**.

Esta versión corresponde a la evolución del proyecto desarrollado durante las semanas anteriores, migrando la interfaz y la lógica desde HTML, CSS y JavaScript tradicional hacia una arquitectura basada en **componentes funcionales de React**.

---

## 🌐 Sitio publicado

**GitHub Pages**

https://panshoow.github.io/Tienda-de-videojuegos/

**Repositorio**

https://github.com/PanshoOw/Tienda-de-videojuegos

---

## ✨ Funcionalidades

El proyecto incorpora las siguientes funcionalidades:

- Catálogo dinámico de videojuegos.
- Componentes funcionales reutilizables en React.
- Filtro de productos por categoría:
  - Todos.
  - PC.
  - Nintendo.
  - Multiplataforma.
- Buscador de videojuegos.
- Combinación entre búsqueda y filtro de categorías.
- Visualización de información de cada producto:
  - Nombre.
  - Plataforma.
  - Género.
  - Descripción.
  - Precio normal.
  - Precio de oferta.
  - Portada.
- Carrito de compras interactivo.
- Incremento y disminución de cantidades.
- Eliminación individual de productos.
- Opción para vaciar completamente el carrito.
- Cálculo automático de cantidad total de productos.
- Cálculo automático del precio total.
- Persistencia del carrito mediante `localStorage`.
- Mensaje Toast al agregar un producto al carrito.
- Carrusel reutilizable para videojuegos destacados.
- Cambio automático de imágenes en el carrusel.
- Controles manuales e indicadores de posición.
- Diseño responsive para escritorio, tablet y dispositivos móviles.
- Navegación interna mediante enlaces y desplazamiento suave.

---

## ⚛️ React

El proyecto utiliza una arquitectura basada en componentes funcionales, permitiendo separar las distintas partes de la interfaz y reutilizar lógica y estructuras visuales.

La estructura principal dentro de `src` es:

```text
src/
├── components/
│   ├── Footer.jsx
│   ├── GameCarousel.jsx
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── SearchBar.jsx
│   ├── ShoppingCart.jsx
│   └── Toast.jsx
│
├── data/
│   └── productos.json
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

### Componentes principales

- `Header.jsx`: encabezado principal del sitio.
- `Navbar.jsx`: navegación y selección de categorías.
- `SearchBar.jsx`: búsqueda dinámica de videojuegos.
- `ProductList.jsx`: listado de productos disponibles.
- `ProductCard.jsx`: representación individual y reutilizable de cada videojuego.
- `ShoppingCart.jsx`: administración visual del carrito de compras.
- `GameCarousel.jsx`: carrusel reutilizable para contenido destacado.
- `Toast.jsx`: mensaje temporal de confirmación al agregar productos.
- `Footer.jsx`: sección final y navegación de regreso al inicio.

---

## 🪝 Hooks utilizados

### `useState`

Se utiliza para administrar distintos estados de la aplicación, entre ellos:

- Categoría seleccionada.
- Texto ingresado en el buscador.
- Productos agregados al carrito.
- Cantidad de cada producto.
- Mensaje mostrado mediante Toast.
- Imagen activa del carrusel.

### `useEffect`

Se utiliza para manejar efectos secundarios de la aplicación:

- Guardar el carrito en `localStorage`.
- Controlar la duración del mensaje Toast.
- Realizar el cambio automático de imágenes del carrusel.

---

## 🎮 Catálogo de productos

Los productos se almacenan en:

```text
src/data/productos.json
```

Cada videojuego contiene información como:

- Identificador.
- Nombre.
- Plataforma.
- Género.
- Descripción.
- Precio normal.
- Precio de oferta.
- Categoría.
- Imagen.

El catálogo es generado dinámicamente mediante React, por lo que no es necesario crear manualmente una tarjeta diferente para cada producto.

`ProductList.jsx` recorre los datos disponibles y reutiliza `ProductCard.jsx` para representar cada videojuego.

---

## 🔎 Búsqueda y filtros

El proyecto permite buscar productos por:

- Nombre.
- Plataforma.
- Género.
- Categoría.

Además, el buscador funciona en conjunto con el filtro de categorías.

Por ejemplo, es posible seleccionar:

```text
Multiplataforma
```

y posteriormente buscar:

```text
RPG
```

para mostrar únicamente los productos que cumplan ambas condiciones.

Las categorías disponibles son:

```text
Todos
PC
Nintendo
Multiplataforma
```

---

## 🛒 Carrito de compras

El carrito permite agregar productos directamente desde el catálogo.

Si el mismo videojuego es agregado nuevamente, el sistema incrementa su cantidad en lugar de generar una entrada duplicada.

Entre sus funciones se encuentran:

- Agregar productos.
- Incrementar cantidades.
- Disminuir cantidades.
- Eliminar productos individualmente.
- Vaciar completamente el carrito.
- Mostrar cantidad total de productos.
- Calcular subtotal por producto.
- Calcular precio total de la compra.

La interfaz se actualiza automáticamente cada vez que cambia el estado del carrito.

---

## 💾 Persistencia con localStorage

El contenido del carrito se almacena mediante:

```javascript
localStorage
```

Esto permite que los productos agregados permanezcan disponibles incluso después de recargar la página.

El estado inicial del carrito intenta recuperar la información previamente almacenada y, cada vez que el contenido cambia, React actualiza los datos guardados en el navegador.

---

## 🔔 Toast de confirmación

Al agregar un videojuego al carrito se muestra temporalmente un mensaje de confirmación.

Ejemplo:

```text
✓ Elden Ring agregado al carrito
```

El mensaje desaparece automáticamente después de unos segundos mediante un efecto controlado con `useEffect`.

---

## 🎞️ Carrusel reutilizable

El proyecto incorpora el componente:

```text
GameCarousel.jsx
```

Este componente fue diseñado para poder utilizarse con cualquier videojuego destacado.

Recibe mediante `props` información como:

- Etiqueta.
- Título.
- Descripción.
- Imágenes.
- Intervalo de cambio automático.

Actualmente se utiliza para destacar **Grand Theft Auto VI**, pero su funcionamiento no depende específicamente de ese juego.

Por ejemplo, el mismo componente podría utilizarse posteriormente para destacar otro videojuego utilizando diferentes propiedades e imágenes.

El carrusel incorpora:

- Cambio automático de imágenes.
- Botón para avanzar.
- Botón para retroceder.
- Indicadores seleccionables.
- Texto alternativo para las imágenes.
- Adaptación a dispositivos móviles.

---

## 🎨 Diseño

La interfaz utiliza una estética oscura, moderna y minimalista inspirada en plataformas digitales relacionadas con videojuegos.

Entre sus principales características visuales se encuentran:

- Paleta oscura con acentos violetas.
- Tarjetas uniformes para los productos.
- Bordes y fondos sutiles.
- Efectos `hover`.
- Animaciones suaves.
- Jerarquía visual mediante tamaños y colores.
- Portadas adaptadas a las tarjetas.
- Botones y precios alineados de forma consistente.
- Estados visuales para categorías seleccionadas.
- Diseño limpio y orientado al contenido.

---

## 📱 Diseño responsive

La interfaz fue adaptada para diferentes tamaños de pantalla utilizando:

- CSS Grid.
- Flexbox.
- `clamp()`.
- Unidades relativas.
- Media queries.
- Grid dinámico mediante `auto-fill` y `minmax()`.

Se incorporaron ajustes específicos para:

### Escritorio

Distribución completa del catálogo y navegación horizontal.

### Tablet

Reorganización de Navbar, buscador, carrito y componentes principales.

### Móvil

- Una tarjeta de producto por fila.
- Navegación adaptada.
- Controles reorganizados.
- Carrusel con proporciones adecuadas.
- Toast adaptable al ancho disponible.
- Carrito optimizado para pantallas estrechas.

---

## 🖼️ Recursos gráficos

Las imágenes utilizadas por el catálogo y el carrusel se almacenan en:

```text
public/img/
```

Las rutas de las imágenes utilizan `import.meta.env.BASE_URL` cuando corresponde, permitiendo que los recursos funcionen correctamente tanto en desarrollo local como al publicar el proyecto mediante GitHub Pages.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Vite
- JSX
- JSON
- localStorage
- ESLint
- Git
- GitHub
- GitHub Pages

---

## 📦 Instalación

Para ejecutar el proyecto de forma local es necesario tener instalado Node.js.

Primero se deben instalar las dependencias:

```bash
npm install
```

Luego se inicia el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

---

## 🔧 Comandos disponibles

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

### Revisar el código con ESLint

```bash
npm run lint
```

### Generar la versión de producción

```bash
npm run build
```

La compilación de producción se genera dentro de:

```text
dist/
```

Esta carpeta es creada automáticamente por Vite.

---

## 🌍 GitHub Pages

El proyecto utiliza una configuración específica de Vite para funcionar correctamente desde GitHub Pages.

En `vite.config.js` se define:

```javascript
base: '/Tienda-de-videojuegos/'
```

Esto permite que los archivos y recursos generados por Vite utilicen correctamente la ruta correspondiente al repositorio publicado.

---

## 📁 Estructura general del proyecto

```text
Tienda-de-videojuegos/
├── public/
│   └── img/
│
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── GameCarousel.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ShoppingCart.jsx
│   │   └── Toast.jsx
│   │
│   ├── data/
│   │   └── productos.json
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

---

## ✅ Validaciones realizadas

Durante el desarrollo se realizaron comprobaciones mediante:

```bash
npm run lint
```

para verificar la calidad y consistencia del código.

También se comprobó la compilación para producción mediante:

```bash
npm run build
```

El proyecto compila correctamente con Vite.

---

## 👨‍💻 Autor

**Francisco Villarzú Miraglia**

Proyecto desarrollado para la asignatura:

**Frontend I - PFY2201**

Duoc UC.