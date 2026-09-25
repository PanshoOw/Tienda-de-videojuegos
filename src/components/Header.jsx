function Header({ titulo, descripcion }) {
    return (
        <header
            id="inicio"
            className="header-principal"
        >
            <div className="header-contenido">
                <span className="header-etiqueta">VIDEOJUEGOS & GAMING</span>

                <h1>{titulo}</h1>

                <p>{descripcion}</p>
            </div>
        </header>
    )
}

export default Header