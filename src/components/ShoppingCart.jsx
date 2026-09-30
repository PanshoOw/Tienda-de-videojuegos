import formatearPrecio from '../utils/formatearPrecio'
import CartItem from './CartItem'

function ShoppingCart({
    carrito,
    onAumentar,
    onDisminuir,
    onEliminar,
    onVaciar,
    }) {
    // Calcula la cantidad total de productos considerando sus unidades.
    const totalProductos = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    )

    // Calcula el precio total de todos los productos del carrito.
    const totalPrecio = carrito.reduce(
        (total, producto) =>
        total + producto.precioOferta * producto.cantidad,
        0
    )

    return (
        <section className="carrito">

        {/* Encabezado y resumen general del carrito */}
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
                {totalProductos === 1
                ? 'producto'
                : 'productos'}
            </span>

            {/* El botón solo aparece cuando existen productos */}
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

        {/* Renderizado condicional según el contenido del carrito */}
        {carrito.length === 0 ? (
            <p className="carrito-vacio">
            Tu carrito está vacío.
            </p>
        ) : (
            <>
            {/* Lista de productos agregados */}
            <div className="carrito-lista">
                {carrito.map((producto) => (
                    <CartItem
                        key={producto.id}
                        producto={producto}
                        onAumentar={onAumentar}
                        onDisminuir={onDisminuir}
                        onEliminar={onEliminar}
                    />
                ))}
            </div>

            {/* Total final de la compra */}
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