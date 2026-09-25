function Toast({ mensaje }) {
    if (!mensaje) {
        return null
    }

    return (
        <div
        className="toast"
        role="status"
        aria-live="polite"
        >
        <span className="toast-icono">✓</span>
        <span>{mensaje}</span>
        </div>
    )
}

export default Toast