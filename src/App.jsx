import { useEffect, useState } from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import productos from './data/productos.json'
import SearchBar from './components/SearchBar'
import Toast from './components/Toast'
import Footer from './components/Footer'
import GameCarousel from './components/GameCarousel'
import './App.css'

const CLAVE_CARRITO = 'bazarPanshoOw_carrito'

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
  const categorias = [
    'Todos',
    'PC',
    'Nintendo',
    'Multiplataforma',
  ]

  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

  const [busqueda, setBusqueda] = useState('')

  const [mensajeToast, setMensajeToast] = useState('')

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO)

    if (!carritoGuardado) {
      return []
    }

    try {
      return JSON.parse(carritoGuardado)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(carrito)
    )
  }, [carrito])

  useEffect(() => {
    if (!mensajeToast) {
      return
    }

    const temporizador = setTimeout(() => {
      setMensajeToast('')
    }, 2500)

    return () => clearTimeout(temporizador)
  }, [mensajeToast])

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

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExiste = carritoActual.some(
        (item) => item.id === producto.id
      )

      if (productoExiste) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1,
        },
      ]
    })

    setMensajeToast(`${producto.nombre} agregado al carrito`)
  }

  const aumentarCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    )
  }

  const disminuirCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

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

          <p>
            {productosFiltrados.length}{' '}
            {productosFiltrados.length === 1
              ? 'producto'
              : 'productos'}
          </p>
        </div>

        <ProductList
          productos={productosFiltrados}
          onAgregar={agregarAlCarrito}
        />

        <ShoppingCart
          carrito={carrito}
          onAumentar={aumentarCantidad}
          onDisminuir={disminuirCantidad}
          onEliminar={eliminarDelCarrito}
          onVaciar={vaciarCarrito}
        />
      </main>

      <Footer />

      <Toast mensaje={mensajeToast} />
    </>
  )
}

export default App