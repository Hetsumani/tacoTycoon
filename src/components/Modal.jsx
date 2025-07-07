import React from 'react';
import './Modal.css'; // Crearemos este archivo de estilos a continuación.

/**
 * Componente de ventana modal reutilizable.
 * @param {object} props
 * @param {boolean} props.isOpen - Controla si la modal está visible o no.
 * @param {function} props.onClose - Función para cerrar la modal.
 * @param {string} props.titulo - El título que se mostrará en el encabezado de la modal.
 * @param {React.ReactNode} props.children - El contenido que se renderizará dentro de la modal.
 */

function Modal({ isOpen, onClose, titulo, children }) {
  // Si la modal no está abierta, no renderizamos nada. Es una forma de "early return".
  if (!isOpen) {
    return null;
  }

  return (
    // El "overlay" es el fondo oscuro que cubre toda la pantalla.
    <div className="modal-overlay" onClick={onClose}>
      {/* Detenemos la propagación del clic para que al hacer clic dentro del contenido, no se cierre la modal. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{titulo}</h2>
          {/* El botón de cierre que llama a la función que nos pasaron por props. */}
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;