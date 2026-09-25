function Navbar({
    categorias,
    categoriaActiva,
    onCambiarCategoria,
}) {
    return (
        <nav className="navbar-principal">
            <div className="navbar-contenido">
                <a className="navbar-marca" href="#inicio">
                    PanshoOw
                </a>

                <div className="navbar-categorias">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            type="button"
                            className={
                                categoriaActiva === categoria
                                    ? 'categoria-boton activa'
                                    : 'categoria-boton'
                            }
                            onClick={() => onCambiarCategoria(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                <a className="navbar-contacto" href="#contacto">
                    Contacto
                </a>
            </div>
        </nav>
    )
}

export default Navbar