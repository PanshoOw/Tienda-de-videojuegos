import { useEffect, useState } from 'react'

function GameCarousel({
    etiqueta,
    titulo,
    descripcion,
    imagenes,
    intervalo = 5000,
    }) {
    const [indiceActual, setIndiceActual] = useState(0)

    const mostrarAnterior = () => {
        setIndiceActual((indice) =>
        indice === 0
            ? imagenes.length - 1
            : indice - 1
        )
    }

    const mostrarSiguiente = () => {
        setIndiceActual((indice) =>
        indice === imagenes.length - 1
            ? 0
            : indice + 1
        )
    }

    useEffect(() => {
        const temporizador = setInterval(() => {
        setIndiceActual((indice) =>
            indice === imagenes.length - 1
            ? 0
            : indice + 1
        )
        }, intervalo)

        return () => clearInterval(temporizador)
    }, [imagenes.length, intervalo])

    if (imagenes.length === 0) {
        return null
    }

    return (
        <section className="juego-destacado">
        <div className="juego-destacado-encabezado">
            <span className="seccion-etiqueta">
            {etiqueta}
            </span>

            <h2>{titulo}</h2>

            <p>{descripcion}</p>
        </div>

        <div className="game-carousel">
            <img
            className="game-carousel-imagen"
            src={`${import.meta.env.BASE_URL}${imagenes[indiceActual].src}`}
            alt={imagenes[indiceActual].alt}
            />

            <button
            type="button"
            className="carousel-control carousel-anterior"
            onClick={mostrarAnterior}
            aria-label="Mostrar imagen anterior"
            >
            ‹
            </button>

            <button
            type="button"
            className="carousel-control carousel-siguiente"
            onClick={mostrarSiguiente}
            aria-label="Mostrar imagen siguiente"
            >
            ›
            </button>

            <div className="carousel-indicadores">
            {imagenes.map((imagen, indice) => (
                <button
                key={imagen.id}
                type="button"
                className={
                    indice === indiceActual
                    ? 'carousel-indicador activo'
                    : 'carousel-indicador'
                }
                onClick={() => setIndiceActual(indice)}
                aria-label={`Mostrar imagen ${indice + 1}`}
                />
            ))}
            </div>
        </div>
        </section>
    )
}

export default GameCarousel