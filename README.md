# 🎮 El Bazar de PanshoOw

Proyecto de eCommerce de videojuegos desarrollado con **React + Vite** para la asignatura **Desarrollo Frontend I (PFY2201)**.

La aplicación permite explorar un catálogo de videojuegos, buscar y filtrar productos, gestionar un carrito de compras, conservar su contenido mediante `localStorage` y cargar dinámicamente los datos del catálogo mediante `fetch`.

El proyecto ha sido desarrollado progresivamente durante las actividades de la asignatura, aplicando componentes funcionales, Props, Hooks, renderizado condicional, persistencia de datos y buenas prácticas de organización y reutilización de código.

---

## 🌐 Proyecto publicado

### Aplicación

[🔗 Ver El Bazar de PanshoOw en GitHub Pages](https://panshoow.github.io/Tienda-de-videojuegos/)

### Repositorio

[🔗 Ver repositorio en GitHub](https://github.com/PanshoOw/Tienda-de-videojuegos)

---

# 📌 Características principales

La aplicación incorpora actualmente las siguientes funcionalidades:

- Catálogo dinámico de videojuegos.
- Carga de productos mediante `fetch`.
- Gestión del catálogo mediante `useState`.
- Uso de `useEffect` para efectos secundarios.
- Estados de carga y error del catálogo.
- Búsqueda de videojuegos.
- Filtrado por categorías.
- Carrito de compras interactivo.
- Aumento y disminución de cantidades.
- Eliminación individual de productos.
- Vaciar completamente el carrito.
- Cálculo automático de subtotales y total de compra.
- Contador de productos.
- Persistencia del carrito mediante `localStorage`.
- Mensajes Toast de confirmación.
- Renderizado condicional.
- Cambio dinámico del botón `Agregar al carrito` a `✓ En el carrito`.
- Carrusel automático de videojuego destacado.
- Diseño responsivo para escritorio, tablet y dispositivos móviles.
- Arquitectura basada en componentes reutilizables.
- Custom Hook para encapsular la lógica del carrito.
- Utilidades compartidas para evitar duplicación de código.

---

# 🧩 Arquitectura de componentes

La aplicación se encuentra dividida en componentes funcionales para mantener responsabilidades claras y facilitar su mantenimiento.

## Componentes principales

### `Navbar.jsx`

Barra de navegación principal.

Permite seleccionar las diferentes categorías disponibles:

- Todos
- PC
- Nintendo
- Multiplataforma

La categoría seleccionada se comunica al componente principal mediante Props.

---

### `Header.jsx`

Encabezado principal de la tienda.

Muestra:

- Nombre del proyecto.
- Descripción principal.
- Identidad visual del sitio.

---

### `GameCarousel.jsx`

Componente reutilizable encargado de mostrar un videojuego destacado mediante un carrusel automático.

Actualmente se utiliza para promocionar **Grand Theft Auto VI**.

Permite:

- Cambio automático de imágenes.
- Navegación manual mediante controles.
- Indicadores de posición.
- Configuración mediante Props.

---

### `SearchBar.jsx`

Campo de búsqueda controlado por React.

Permite filtrar los videojuegos utilizando información como:

- Nombre.
- Plataforma.
- Género.
- Categoría.

También incluye una opción para limpiar rápidamente la búsqueda.

---

### `ProductList.jsx`

Recibe la colección de productos filtrados y genera dinámicamente las tarjetas del catálogo.

Cada videojuego es representado mediante el componente:

```text
ProductCard.jsx
```

También permite mostrar un mensaje cuando no existen productos coincidentes con los filtros seleccionados.

---

### `ProductCard.jsx`

Representa individualmente cada videojuego del catálogo.

Muestra:

- Imagen.
- Categoría.
- Plataforma.
- Nombre.
- Descripción.
- Precio normal.
- Precio de oferta.
- Acción para agregar al carrito.

El botón utiliza **renderizado condicional** para modificar su contenido dependiendo del estado del carrito:

```text
Agregar al carrito
```

cambia a:

```text
✓ En el carrito
```

cuando el producto ya se encuentra agregado.

---

### `ShoppingCart.jsx`

Administra la presentación general del carrito de compras.

Muestra:

- Cantidad total de productos.
- Lista de productos seleccionados.
- Total acumulado.
- Botón para vaciar el carrito.
- Mensaje cuando el carrito está vacío.

Cada producto agregado es delegado al componente `CartItem`.

---

### `CartItem.jsx`

Representa individualmente un producto agregado al carrito.

Incluye:

- Nombre del producto.
- Precio unitario.
- Cantidad seleccionada.
- Botón para disminuir cantidad.
- Botón para aumentar cantidad.
- Subtotal.
- Acción para eliminar el producto.

Esta separación permite reducir la responsabilidad de `ShoppingCart.jsx` y reutilizar la representación de los productos del carrito.

---

### `Toast.jsx`

Muestra mensajes temporales de confirmación.

Actualmente se utiliza al agregar productos al carrito.

Ejemplo:

```text
Minecraft agregado al carrito
```

El Toast desaparece automáticamente después de un intervalo controlado mediante `useEffect`.

---

### `Footer.jsx`

Pie de página del sitio.

Incluye información general del proyecto y navegación hacia la parte superior de la aplicación.

---

# 🪝 Custom Hook `useCarrito`

La lógica correspondiente al carrito se encuentra separada del componente principal mediante:

```text
src/hooks/useCarrito.js
```

El Hook administra:

- Estado del carrito.
- Recuperación del carrito almacenado.
- Persistencia mediante `localStorage`.
- Agregar productos.
- Aumentar cantidades.
- Disminuir cantidades.
- Eliminar productos.
- Vaciar el carrito.

Ejemplo de utilización:

```jsx
const {
    carrito,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
} = useCarrito()
```

Gracias a esta separación, `App.jsx` puede concentrarse principalmente en coordinar los diferentes componentes y estados generales de la aplicación.

---

# 🔧 Utilidades compartidas

Para evitar duplicación de código se incorporó:

```text
src/utils/formatearPrecio.js
```

Esta utilidad centraliza el formato de valores monetarios utilizando:

```javascript
Intl.NumberFormat
```

con configuración para pesos chilenos:

```text
CLP
```

La función es utilizada actualmente por:

- `ProductCard.jsx`
- `ShoppingCart.jsx`
- `CartItem.jsx`

Esto permite modificar el formato monetario desde un único lugar.

---

# 📦 Catálogo dinámico

Los productos se encuentran almacenados en:

```text
public/data/productos.json
```

A diferencia de una importación directa del archivo JSON, el catálogo se obtiene dinámicamente mediante:

```javascript
fetch()
```

La petición se realiza al cargar la aplicación utilizando `useEffect`.

Flujo simplificado:

```text
Aplicación inicia
      │
      ▼
useEffect
      │
      ▼
fetch(productos.json)
      │
      ▼
respuesta.json()
      │
      ▼
setProductos(datos)
      │
      ▼
React actualiza la interfaz
```

La URL utiliza:

```javascript
import.meta.env.BASE_URL
```

para mantener compatibilidad tanto con el entorno local de Vite como con el despliegue en GitHub Pages.

---

# ⚛️ Hooks utilizados

## `useState`

Se utiliza para administrar diferentes estados dinámicos de la aplicación.

Entre ellos:

### Catálogo

```text
productos
```

Contiene los productos cargados dinámicamente.

### Carga del catálogo

```text
cargandoProductos
```

Permite conocer si los productos aún están siendo solicitados.

### Error del catálogo

```text
errorProductos
```

Permite almacenar y mostrar posibles errores durante la carga.

### Categoría seleccionada

```text
categoriaActiva
```

Controla el filtro activo del catálogo.

### Búsqueda

```text
busqueda
```

Almacena el texto ingresado por el usuario.

### Toast

```text
mensajeToast
```

Controla el mensaje temporal mostrado al usuario.

### Carrito

El estado del carrito se administra dentro del custom Hook:

```text
useCarrito
```

---

## `useEffect`

Se utiliza para manejar efectos secundarios de la aplicación.

Actualmente permite:

### Cargar dinámicamente el catálogo

El archivo `productos.json` se solicita mediante `fetch` cuando la aplicación se inicia.

### Persistir el carrito

Cada modificación del carrito actualiza automáticamente su contenido almacenado en `localStorage`.

### Controlar el Toast

El mensaje desaparece automáticamente después de aproximadamente 2,5 segundos.

### Carrusel automático

Permite cambiar periódicamente la imagen mostrada en el carrusel destacado.

---

# 🔄 Renderizado condicional

El proyecto utiliza diferentes estrategias de renderizado condicional para adaptar la interfaz según el estado actual.

## Catálogo cargando

Mientras se obtienen los productos:

```text
Cargando catálogo...
```

---

## Error durante la carga

Si ocurre un problema durante la petición:

```text
No fue posible cargar el catálogo.
```

---

## Carrito vacío

Cuando no existen productos seleccionados:

```text
Tu carrito está vacío.
```

---

## Botón Vaciar carrito

Solo aparece si existe al menos un producto en el carrito.

---

## Estado del producto

Cuando un producto todavía no se encuentra agregado:

```text
Agregar al carrito
```

Cuando ya pertenece al carrito:

```text
✓ En el carrito
```

---

## Resultados de búsqueda

Si ningún videojuego coincide con los filtros:

```text
No se encontraron productos con los filtros seleccionados.
```

---

# 🛒 Carrito de compras

El carrito permite:

- Agregar productos.
- Agregar varias unidades del mismo producto.
- Incrementar cantidades.
- Disminuir cantidades.
- Eliminar productos.
- Vaciar todo el carrito.
- Calcular subtotales.
- Calcular el total general.
- Mostrar la cantidad total de productos.

La lógica se encuentra encapsulada en:

```text
src/hooks/useCarrito.js
```

mientras que cada elemento individual se representa mediante:

```text
src/components/CartItem.jsx
```

---

# 💾 Persistencia con Local Storage

El carrito se conserva mediante:

```javascript
localStorage
```

utilizando la clave:

```text
bazarPanshoOw_carrito
```

Esto permite que los productos seleccionados permanezcan disponibles incluso después de:

- Actualizar la página.
- Cerrar la pestaña.
- Volver posteriormente al sitio.

Al iniciar la aplicación, `useCarrito` intenta recuperar automáticamente la información almacenada.

---

# 🔎 Búsqueda y categorías

El catálogo puede filtrarse utilizando simultáneamente:

## Categorías

- Todos
- PC
- Nintendo
- Multiplataforma

## Búsqueda

La búsqueda considera:

- Nombre.
- Plataforma.
- Género.
- Categoría.

Los filtros se combinan para mostrar únicamente los productos que cumplen ambas condiciones.

---

# 🎨 Diseño y experiencia de usuario

El proyecto utiliza una identidad visual inspirada en interfaces modernas relacionadas con videojuegos.

Principales características:

- Tema oscuro.
- Acentos púrpura.
- Tarjetas minimalistas.
- Jerarquía visual clara.
- Precios normal y oferta diferenciados.
- Animaciones suaves.
- Estados interactivos.
- Diseño responsivo.
- Carrusel promocional.
- Mensajes de confirmación mediante Toast.

---

# 📱 Diseño responsivo

La interfaz se adapta a diferentes tamaños de pantalla.

Se contemplan principalmente:

### Escritorio

Distribución del catálogo mediante múltiples columnas.

### Tablet

Reducción automática del número de columnas y reorganización de controles.

### Dispositivos móviles

- Una tarjeta por fila.
- Navegación adaptable.
- Carrito reorganizado verticalmente.
- Carrusel adaptado.
- Toast ajustado al ancho disponible.

---

# 📁 Estructura del proyecto

```text
Tienda-de-videojuegos/
│
├── public/
│   ├── data/
│   │   └── productos.json
│   │
│   └── img/
│       ├── portadas de videojuegos
│       └── imágenes promocionales
│
├── src/
│   ├── components/
│   │   ├── CartItem.jsx
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
│   ├── hooks/
│   │   └── useCarrito.js
│   │
│   ├── utils/
│   │   └── formatearPrecio.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── docs/
│   └── evidencias/
│       ├── semana-7/
│       └── semana-8/
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

# 🖼️ Evidencias del desarrollo

El proyecto se ha desarrollado de manera incremental durante las diferentes semanas de la asignatura.

A continuación se muestran algunas evidencias representativas directamente desde el repositorio para facilitar su revisión.

---

## Semana 7 — Componentes funcionales en React

Durante la Semana 7 se realizó la migración del proyecto a React utilizando Vite y se implementaron componentes funcionales, Hooks, búsqueda, filtros, carrito y persistencia.

### Vista general de la aplicación

![Vista general de El Bazar de PanshoOw](docs/evidencias/semana-7/01_vista_general.png)

### Catálogo de productos

![Catálogo de videojuegos](docs/evidencias/semana-7/02_catalogo_productos.png)

### Búsqueda y filtros

![Búsqueda y filtros funcionando](docs/evidencias/semana-7/03_filtros_busqueda.png)

### Carrito de compras

![Carrito de compras funcionando](docs/evidencias/semana-7/04_carrito_compras.png)

### Persistencia mediante localStorage

![Persistencia del carrito](docs/evidencias/semana-7/06_localstorage.png)

### Diseño responsivo

![Vista móvil](docs/evidencias/semana-7/07_responsive_movil.png)

---

## Semana 8 — Optimización de funcionalidades en React

Durante la Semana 8 se optimizó la arquitectura del proyecto, se incorporó la carga dinámica del catálogo mediante `fetch`, se mejoró el renderizado condicional y se separaron responsabilidades mediante un custom Hook y nuevos componentes reutilizables.

### Carga dinámica mediante Fetch

![Carga dinámica del catálogo](docs/evidencias/semana-8/01_carga_dinamica.png)

La carga de `productos.json` puede observarse mediante las herramientas de desarrollo del navegador.

---

### Carrito funcionando

![Carrito de compras Semana 8](docs/evidencias/semana-8/02_carrito_funcionando.png)

Se mantienen las operaciones de:

- Aumentar cantidad.
- Disminuir cantidad.
- Eliminar productos.
- Vaciar carrito.
- Calcular totales.

---

### Renderizado condicional

![Renderizado condicional](docs/evidencias/semana-8/03_renderizado_condicional.png)

La interfaz modifica dinámicamente el botón de cada producto según su presencia en el carrito.

---

### Implementación de `useEffect` y `fetch`

![Código de carga dinámica](docs/evidencias/semana-8/04_codigo_useeffect.png)

El catálogo se carga mediante `useEffect` y `fetch`, actualizando posteriormente el estado de productos.

---

# 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- React Hooks
- Vite
- ESLint
- Fetch API
- Local Storage
- Git
- GitHub
- GitHub Pages

---

# 🚀 Instalación local

Para ejecutar el proyecto localmente se necesita tener instalado:

```text
Node.js
npm
```

Clonar el repositorio:

```bash
git clone https://github.com/PanshoOw/Tienda-de-videojuegos.git
```

Ingresar al proyecto:

```bash
cd Tienda-de-videojuegos
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

---

# 📜 Scripts disponibles

## Desarrollo

```bash
npm run dev
```

Inicia el servidor local de Vite.

---

## Validación

```bash
npm run lint
```

Ejecuta ESLint para comprobar la calidad y consistencia del código.

---

## Compilación

```bash
npm run build
```

Genera la versión de producción dentro de:

```text
dist/
```

---

## Vista previa de producción

```bash
npm run preview
```

Permite probar localmente el resultado generado mediante `npm run build`.

---

## Despliegue

```bash
npm run deploy
```

Genera la aplicación y publica su contenido mediante GitHub Pages.

---

# 🌐 Configuración de GitHub Pages

El proyecto utiliza una configuración específica de Vite:

```javascript
export default defineConfig({
    plugins: [react()],
    base: '/Tienda-de-videojuegos/',
})
```

Esta configuración permite que los recursos de la aplicación funcionen correctamente bajo la ruta utilizada por GitHub Pages.

Las imágenes y el catálogo utilizan también:

```javascript
import.meta.env.BASE_URL
```

para mantener rutas compatibles tanto en desarrollo como en producción.

---

# ✅ Validación del proyecto

Antes de cada publicación se realizan las siguientes comprobaciones:

```bash
npm run lint
npm run build
```

Estas verificaciones permiten detectar posibles errores antes de publicar una nueva versión.

También se comprueba manualmente:

- Carga del catálogo.
- Búsqueda.
- Filtros.
- Carrito.
- Persistencia.
- Renderizado condicional.
- Carrusel.
- Diseño responsivo.
- Navegación.
- GitHub Pages.

---

# 📚 Conceptos aplicados

Durante el desarrollo se han aplicado conceptos como:

- Componentes funcionales.
- JSX.
- Props.
- Estado.
- `useState`.
- `useEffect`.
- Custom Hooks.
- Renderizado condicional.
- Comunicación padre-hijo.
- Eventos.
- Métodos de arreglos:
  - `map`
  - `filter`
  - `reduce`
  - `some`
- Fetch API.
- JSON.
- Async/Await.
- Manejo básico de errores.
- Local Storage.
- Diseño responsivo.
- Reutilización de código.
- Separación de responsabilidades.

---

# 🎯 Evolución arquitectónica

La aplicación comenzó con una estructura sencilla y ha evolucionado progresivamente hacia una organización más modular.

Algunas mejoras realizadas incluyen:

```text
Importación directa de JSON
        ↓
Carga dinámica mediante fetch
```

```text
Lógica completa del carrito dentro de App.jsx
        ↓
Custom Hook useCarrito
```

```text
Productos del carrito dentro de ShoppingCart
        ↓
Componente reutilizable CartItem
```

```text
Funciones duplicadas para precios
        ↓
Utilidad compartida formatearPrecio
```

Este proceso permite mantener componentes más pequeños, responsabilidades más claras y código más fácil de mantener.

---

# 👨‍💻 Autor

**Francisco Villarzú Miraglia**

Proyecto desarrollado para:

**Desarrollo Frontend I — PFY2201**

Duoc UC

---

# 🎮 El Bazar de PanshoOw

> Tu espacio para descubrir videojuegos, ofertas y nuevas aventuras.