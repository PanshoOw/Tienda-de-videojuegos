import { useEffect, useState } from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import SearchBar from './components/SearchBar'
import Toast from './components/Toast'
import Footer from './components/Footer'
import GameCarousel from './components/GameCarousel'
import useCarrito from './hooks/useCarrito'
import './App.css'

// Imágenes utilizadas por el carrusel de videojuego destacado.
const IMAGENES_GTA_VI = [
  {
    id: 1,
    src: 'img/portada-gtavi.jpg',
    alt: 'Portada de Grand Theft Auto VI',
  },
  {
    id: 2,
    src: 'img/gtavi-2.jpg',
    alt: 'Imagen promocional de Grand Theft Auto VI',
  },
  {
    id: 3,
    src: 'img/gtavi-3.jpg',
    alt: 'Escena promocional de Grand Theft Auto VI',
  },
]

function App() {
  // --------------------------------------------------
  // Configuración general
  // --------------------------------------------------

  const categorias = [
    'Todos',
    'PC',
    'Nintendo',
    'Multiplataforma',
  ]

  // --------------------------------------------------
  // Estados del catálogo
  // --------------------------------------------------

  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [errorProductos, setErrorProductos] = useState('')

  // --------------------------------------------------
  // Estados de filtros e interfaz
  // --------------------------------------------------

  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [mensajeToast, setMensajeToast] = useState('')

  // --------------------------------------------------
  // Gestión del carrito mediante custom Hook
  // --------------------------------------------------

  const {
    carrito,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito()

  // --------------------------------------------------
  // Carga dinámica del catálogo
  // --------------------------------------------------

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargandoProductos(true)
        setErrorProductos('')

        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}data/productos.json`
        )

        if (!respuesta.ok) {
          throw new Error('No fue posible cargar el catálogo.')
        }

        const datos = await respuesta.json()

        if (!Array.isArray(datos)) {
          throw new TypeError(
            'Los datos del catálogo no son válidos.'
          )
        }

        setProductos(datos)
      } catch (error) {
        setErrorProductos(
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al cargar el catálogo.'
        )
      } finally {
        setCargandoProductos(false)
      }
    }

    cargarProductos()
  }, [])

  // --------------------------------------------------
  // Duración del mensaje Toast
  // --------------------------------------------------

  useEffect(() => {
    if (!mensajeToast) {
      return
    }

    const temporizador = setTimeout(() => {
      setMensajeToast('')
    }, 2500)

    return () => clearTimeout(temporizador)
  }, [mensajeToast])

  // --------------------------------------------------
  // Filtrado del catálogo
  // --------------------------------------------------

  const textoBusqueda = busqueda.trim().toLowerCase()

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === 'Todos' ||
      producto.categoria === categoriaActiva

    const coincideBusqueda =
      textoBusqueda === '' ||
      producto.nombre.toLowerCase().includes(textoBusqueda) ||
      producto.plataforma.toLowerCase().includes(textoBusqueda) ||
      producto.genero.toLowerCase().includes(textoBusqueda) ||
      producto.categoria.toLowerCase().includes(textoBusqueda)

    return coincideCategoria && coincideBusqueda
  })

  // --------------------------------------------------
  // Integración entre carrito y Toast
  // --------------------------------------------------

  const agregarAlCarrito = (producto) => {
    agregarProducto(producto)

    setMensajeToast(
      `${producto.nombre} agregado al carrito`
    )
  }

  // --------------------------------------------------
  // Contenido dinámico del catálogo
  // --------------------------------------------------

  let contenidoCatalogo

  if (cargandoProductos) {
    contenidoCatalogo = (
      <p className="productos-estado">
        Cargando catálogo...
      </p>
    )
  } else if (errorProductos) {
    contenidoCatalogo = (
      <p className="productos-estado productos-error">
        {errorProductos}
      </p>
    )
  } else {
    contenidoCatalogo = (
      <ProductList
        productos={productosFiltrados}
        carrito={carrito}
        onAgregar={agregarAlCarrito}
      />
    )
  }

  // --------------------------------------------------
  // Renderizado principal
  // --------------------------------------------------

  return (
    <>
      <Navbar
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onCambiarCategoria={setCategoriaActiva}
      />

      <Header
        titulo="El Bazar de PanshoOw"
        descripcion="Tu espacio para descubrir videojuegos, ofertas y nuevas aventuras."
      />

      <GameCarousel
        etiqueta="PRÓXIMAMENTE"
        titulo="Grand Theft Auto VI"
        descripcion="Uno de los lanzamientos más esperados de la industria vuelve a Vice City."
        imagenes={IMAGENES_GTA_VI}
      />

      <main className="contenido-principal">
        <SearchBar
          busqueda={busqueda}
          onCambiarBusqueda={setBusqueda}
        />

        <div className="catalogo-encabezado">
          <div>
            <span className="seccion-etiqueta">
              CATÁLOGO
            </span>

            <h2>Encuentra tu próxima aventura</h2>
          </div>

          {!cargandoProductos && !errorProductos && (
            <p>
              {productosFiltrados.length}{' '}
              {productosFiltrados.length === 1
                ? 'producto'
                : 'productos'}
            </p>
          )}
        </div>

        {contenidoCatalogo}

        <ShoppingCart
          carrito={carrito}
          onAumentar={aumentarCantidad}
          onDisminuir={disminuirCantidad}
          onEliminar={eliminarProducto}
          onVaciar={vaciarCarrito}
        />
      </main>

      <Footer />

      <Toast mensaje={mensajeToast} />
    </>
  )
}

export default App