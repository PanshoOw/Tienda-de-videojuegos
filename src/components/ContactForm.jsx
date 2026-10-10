import { useState } from 'react'

function ContactForm() {
    // Estado de los campos del formulario.
    const [formulario, setFormulario] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    })

    // Almacena los mensajes de error de cada campo.
    const [errores, setErrores] = useState({})

    // Controla el mensaje de confirmación después de una validación exitosa.
    const [enviado, setEnviado] = useState(false)

    // Actualiza el campo correspondiente mientras el usuario escribe.
    const manejarCambio = (evento) => {
        const { name, value } = evento.target

        setFormulario((formularioActual) => ({
            ...formularioActual,
            [name]: value,
        }))

        // Elimina el error del campo cuando el usuario vuelve a modificarlo.
        setErrores((erroresActuales) => ({
            ...erroresActuales,
            [name]: '',
        }))

        setEnviado(false)
    }

    // Comprueba que todos los campos contengan información válida.
    const validarFormulario = () => {
        const nuevosErrores = {}

        if (!formulario.nombre.trim()) {
            nuevosErrores.nombre = 'Ingresa tu nombre.'
        }

        if (!formulario.email.trim()) {
            nuevosErrores.email = 'Ingresa tu correo electrónico.'
        } else {
            const formatoEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!formatoEmail.test(formulario.email)) {
                nuevosErrores.email =
                    'Ingresa un correo electrónico válido.'
            }
        }

        if (!formulario.mensaje.trim()) {
            nuevosErrores.mensaje = 'Escribe un mensaje.'
        }

        return nuevosErrores
    }

    // Valida la información antes de aceptar el formulario.
    const manejarEnvio = (evento) => {
        evento.preventDefault()

        const nuevosErrores = validarFormulario()

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores)
            setEnviado(false)
            return
        }

        setErrores({})
        setEnviado(true)

        setFormulario({
            nombre: '',
            email: '',
            mensaje: '',
        })
    }

    return (
        <section
            id="contacto"
            className="contacto"
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-8">

                        {/* Encabezado de la sección */}
                        <div className="contacto-encabezado">
                            <span className="seccion-etiqueta">
                                CONTACTO
                            </span>

                            <h2>¿Tienes alguna consulta?</h2>

                            <p>
                                Escríbenos y cuéntanos en qué podemos ayudarte.
                            </p>
                        </div>

                        {/* Formulario con componentes de Bootstrap 5 */}
                        <form
                            className="contacto-formulario"
                            onSubmit={manejarEnvio}
                            noValidate
                        >
                            <div className="row g-4">
                                <div className="col-12 col-md-6">
                                    <label
                                        htmlFor="nombre"
                                        className="form-label"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className={`form-control ${
                                            errores.nombre
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        placeholder="Tu nombre"
                                    />

                                    {errores.nombre && (
                                        <div className="invalid-feedback">
                                            {errores.nombre}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${
                                            errores.email
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        value={formulario.email}
                                        onChange={manejarCambio}
                                        placeholder="correo@ejemplo.cl"
                                    />

                                    {errores.email && (
                                        <div className="invalid-feedback">
                                            {errores.email}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="mensaje"
                                        className="form-label"
                                    >
                                        Mensaje
                                    </label>

                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        className={`form-control ${
                                            errores.mensaje
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        rows="5"
                                        value={formulario.mensaje}
                                        onChange={manejarCambio}
                                        placeholder="Escribe tu mensaje..."
                                    />

                                    {errores.mensaje && (
                                        <div className="invalid-feedback">
                                            {errores.mensaje}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn contacto-boton"
                                    >
                                        Enviar mensaje
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Confirmación mediante renderizado condicional */}
                        {enviado && (
                            <div
                                className="alert alert-success mt-4"
                                role="alert"
                            >
                                Formulario validado correctamente.
                                ¡Gracias por contactarnos!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm