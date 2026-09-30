import formatearPrecio from '../utils/formatearPrecio'

function ProductCard({
    producto,
    onAgregar,
    enCarrito,
}) {
    return (
        <article className="producto-card">

        {/* Imagen y categoría del videojuego */}
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

        {/* Información principal del producto */}
        <div className="producto-contenido">
            <p className="producto-plataforma">
            {producto.plataforma}
            </p>

            <h3>{producto.nombre}</h3>

            <p className="producto-descripcion">
            {producto.descripcion}
            </p>

            {/* Precios normal y oferta */}
            <div className="producto-precios">
            <span className="precio-normal">
                {formatearPrecio(producto.precioNormal)}
            </span>

            <span className="precio-oferta">
                {formatearPrecio(producto.precioOferta)}
            </span>
            </div>

            {/* Acción para agregar el producto al carrito */}
            <button
                type="button"
                className={`producto-boton ${
                    enCarrito ? 'producto-boton-activo' : ''
                }`}
                onClick={() => onAgregar(producto)}
            >
                {enCarrito
                    ? '✓ En el carrito'
                    : 'Agregar al carrito'}
            </button>
        </div>
        </article>
    )
}

export default ProductCard