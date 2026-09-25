function ShoppingCart({
    carrito,
    onAumentar,
    onDisminuir,
    onEliminar,
    onVaciar,
}) {
    const formatearPrecio = (precio) =>
        new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
        }).format(precio)

    const totalProductos = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    )

    const totalPrecio = carrito.reduce(
        (total, producto) =>
        total + producto.precioOferta * producto.cantidad,
        0
    )

    return (
        <section className="carrito">
        <div className="carrito-encabezado">
            <div>
            <span className="seccion-etiqueta">
                TU COMPRA
            </span>

            <h2>Carrito</h2>
            </div>

            <div className="carrito-encabezado-acciones">
            <span className="carrito-contador">
                {totalProductos}{' '}
                {totalProductos === 1 ? 'producto' : 'productos'}
            </span>

            {carrito.length > 0 && (
                <button
                type="button"
                className="carrito-vaciar"
                onClick={onVaciar}
                >
                Vaciar carrito
                </button>
            )}
            </div>
        </div>

        {carrito.length === 0 ? (
            <p className="carrito-vacio">
            Tu carrito está vacío.
            </p>
        ) : (
            <>
            <div className="carrito-lista">
                {carrito.map((producto) => (
                <article
                    className="carrito-producto"
                    key={producto.id}
                >
                    <div className="carrito-producto-info">
                    <h3>{producto.nombre}</h3>

                    <p>
                        {formatearPrecio(producto.precioOferta)} c/u
                    </p>
                    </div>

                    <div className="carrito-acciones">
                    <div className="cantidad-controles">
                        <button
                        type="button"
                        onClick={() => onDisminuir(producto.id)}
                        aria-label={`Disminuir cantidad de ${producto.nombre}`}
                        >
                        −
                        </button>

                        <span>{producto.cantidad}</span>

                        <button
                        type="button"
                        onClick={() => onAumentar(producto.id)}
                        aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        >
                        +
                        </button>
                    </div>

                    <strong className="carrito-subtotal">
                        {formatearPrecio(
                        producto.precioOferta * producto.cantidad
                        )}
                    </strong>

                    <button
                        type="button"
                        className="carrito-eliminar"
                        onClick={() => onEliminar(producto.id)}
                    >
                        Eliminar
                    </button>
                    </div>
                </article>
            ))}
            </div>

            <div className="carrito-total">
                <span>Total</span>
                <strong>
                {formatearPrecio(totalPrecio)}
                </strong>
            </div>
            </>
        )}
        </section>
    )
}

export default ShoppingCart