import ProductCard from './ProductCard'

function ProductList({
    productos,
    carrito,
    onAgregar,
}) {
    if (productos.length === 0) {
        return (
        <p className="productos-vacio">
            No se encontraron productos con los filtros seleccionados.
        </p>
        )
    }

    return (
        <section className="productos-grid">
        {productos.map((producto) => (
            <ProductCard
                key={producto.id}
                producto={producto}
                onAgregar={onAgregar}
                enCarrito={carrito.some(
                    (item) => item.id === producto.id
                )}
            />
        ))}
        </section>
    )
}

export default ProductList