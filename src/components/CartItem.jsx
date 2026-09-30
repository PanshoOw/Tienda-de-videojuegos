import formatearPrecio from '../utils/formatearPrecio'

function CartItem({
    producto,
    onAumentar,
    onDisminuir,
    onEliminar,
}) {

    // Calcula el subtotal según el precio y la cantidad seleccionada.
    const subtotal =
        producto.precioOferta * producto.cantidad

    return (
        <article className="carrito-producto">

            {/* Información principal del producto */}
            <div className="carrito-producto-info">
                <h3>{producto.nombre}</h3>

                <p>
                    {formatearPrecio(producto.precioOferta)} c/u
                </p>
            </div>

            {/* Controles de cantidad y eliminación */}
            <div className="carrito-acciones">
                <div className="cantidad-controles">
                    <button
                        type="button"
                        onClick={() =>
                            onDisminuir(producto.id)
                        }
                        aria-label={`Disminuir cantidad de ${producto.nombre}`}
                    >
                        −
                    </button>

                    <span>{producto.cantidad}</span>

                    <button
                        type="button"
                        onClick={() =>
                            onAumentar(producto.id)
                        }
                        aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    >
                        +
                    </button>
                </div>

                {/* Subtotal correspondiente al producto */}
                <strong className="carrito-subtotal">
                    {formatearPrecio(subtotal)}
                </strong>

                <button
                    type="button"
                    className="carrito-eliminar"
                    onClick={() =>
                        onEliminar(producto.id)
                    }
                >
                    Eliminar
                </button>
            </div>
        </article>
    )
}

export default CartItem