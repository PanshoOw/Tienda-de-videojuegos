import { useEffect, useState } from 'react'

const CLAVE_CARRITO = 'bazarPanshoOw_carrito'

// Recupera el carrito almacenado al iniciar la aplicación.
const obtenerCarritoInicial = () => {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO)

    if (!carritoGuardado) {
        return []
    }

    try {
        return JSON.parse(carritoGuardado)
    } catch {
        return []
    }
    }

    function useCarrito() {
    const [carrito, setCarrito] = useState(obtenerCarritoInicial)

    // Mantiene sincronizado el carrito con localStorage.
    useEffect(() => {
        try {
        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify(carrito)
        )
        } catch (error) {
        console.error(
            'No fue posible guardar el carrito:',
            error
        )
        }
    }, [carrito])

    const agregarProducto = (producto) => {
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

    const eliminarProducto = (id) => {
        setCarrito((carritoActual) =>
        carritoActual.filter((item) => item.id !== id)
        )
    }

    const vaciarCarrito = () => {
        setCarrito([])
    }

    return {
        carrito,
        agregarProducto,
        aumentarCantidad,
        disminuirCantidad,
        eliminarProducto,
        vaciarCarrito,
    }
}

export default useCarrito