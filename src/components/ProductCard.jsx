function ProductCard({ producto, onAgregar }) {
    const formatearPrecio = (precio) =>
        new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
        }).format(precio)

    return (
        <article className="producto-card">
        <div className="producto-imagen-contenedor">
            <img
            className="producto-imagen"
            src={`${import.meta.env.BASE_URL}${producto.imagen}`}
            alt={`Portada de ${producto.nombre}`}
            />

            <span className="producto-categoria">
            {producto.categoria}
            </span>
        </div>

        <div className="producto-contenido">
            <p className="producto-plataforma">
            {producto.plataforma}
            </p>

            <h3>{producto.nombre}</h3>

            <p className="producto-descripcion">
            {producto.descripcion}
            </p>

            <div className="producto-precios">
            <span className="precio-normal">
                {formatearPrecio(producto.precioNormal)}
            </span>

            <span className="precio-oferta">
                {formatearPrecio(producto.precioOferta)}
            </span>
            </div>

            <button
                type="button"
                className="producto-boton"
                onClick={() => onAgregar(producto)}
            >
                Agregar al carrito
            </button>
        </div>
        </article>
    )
}

export default ProductCard