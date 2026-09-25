function Footer() {
    return (
        <footer
        id="contacto"
        className="footer"
        >
        <div className="footer-contenido">
            <div className="footer-principal">
            <div>
                <span className="seccion-etiqueta">
                CONTACTO
                </span>

                <h2>¿Buscas tu próxima aventura?</h2>

                <p>
                Explora nuestro catálogo y encuentra
                videojuegos para distintas plataformas
                y estilos de juego.
                </p>
            </div>

            <a
                className="footer-boton"
                href="#inicio"
            >
                Volver al inicio
            </a>
            </div>

            <div className="footer-inferior">
            <strong>El Bazar de PanshoOw</strong>

            <span>
                Proyecto eCommerce desarrollado con React.
            </span>
            </div>
        </div>
        </footer>
    )
}

export default Footer