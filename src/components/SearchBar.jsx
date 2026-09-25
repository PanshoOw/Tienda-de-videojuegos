function SearchBar({ busqueda, onCambiarBusqueda }) {
    return (
        <section className="buscador">
        <label htmlFor="busqueda-productos">
            Buscar videojuegos
        </label>

        <div className="buscador-control">
            <input
            id="busqueda-productos"
            type="search"
            value={busqueda}
            onChange={(event) =>
                onCambiarBusqueda(event.target.value)
            }
            placeholder="Ej: Elden Ring, Nintendo, RPG..."
            />

            {busqueda && (
            <button
                type="button"
                onClick={() => onCambiarBusqueda('')}
            >
                Limpiar
            </button>
            )}
        </div>
        </section>
    )
}

export default SearchBar