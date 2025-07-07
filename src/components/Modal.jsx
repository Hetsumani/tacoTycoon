// Importamos la biblioteca React para poder definir un componente.
import React from 'react';

// Importamos los estilos específicos para este componente.
// Esta práctica de tener un archivo CSS por componente se llama "CSS Modules" o simplemente "component-scoped CSS".
import './Modal.css';

/**
 * Componente de ventana modal reutilizable y accesible.
 * Su propósito es mostrar contenido en un cuadro de diálogo que se superpone a la página principal,
 * requiriendo la interacción del usuario.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {boolean} props.isOpen - Determina si la modal está visible. Es el interruptor principal del componente.
 * @param {function} props.onClose - Función *callback* que se invoca cuando el usuario intenta cerrar la modal,
 * ya sea haciendo clic en el botón de cierre o en el fondo oscuro.
 * @param {string} props.titulo - El texto que se mostrará en el encabezado de la modal.
 * @param {React.ReactNode} props.children - Cualquier elemento o componente de React válido que se renderizará
 * como el cuerpo de la modal. Esto hace que el componente `Modal` sea un 'contenedor' genérico y altamente reutilizable.
 */
function Modal({ isOpen, onClose, titulo, children }) {
  // --- Renderizado Condicional ---
  // Este patrón de 'retorno temprano' (early return) es muy eficiente y mejora la legibilidad.
  // Si la condición principal para mostrar la modal no se cumple, salimos de la función inmediatamente,
  // evitando procesar y renderizar el resto del componente. React simplemente no renderizará nada.
  if (!isOpen) {
    return null;
  }

  // Si isOpen es true, renderizamos la estructura JSX de la modal.
  return (
    // --- Capa de Superposición (Overlay) ---
    // Este `div` crea el fondo semitransparente que cubre toda la página, indicando al usuario
    // que el contenido principal está temporalmente inactivo.
    // El `onClick={onClose}` permite al usuario cerrar la modal haciendo clic fuera del contenido,
    // una práctica de Experiencia de Usuario (UX) muy común y esperada.
    <div className="modal-overlay" onClick={onClose}>

      {/* --- Contenedor del Contenido ---
        Aquí ocurre un pequeño truco de magia con los eventos de JavaScript.
        El `div` padre (modal-overlay) tiene un `onClick` para cerrar la modal. Si el usuario hace clic
        aquí (en el contenido blanco), ese evento de clic "burbujearía" hacia arriba hasta el padre
        y cerraría la modal, lo cual no queremos.
        
        `e.stopPropagation()` detiene esa propagación del evento, asegurando que solo los clics
        directos en el fondo oscuro (`modal-overlay`) activen el `onClose`.
      */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* --- Encabezado de la Modal --- */}
        <div className="modal-header">
          <h2>{titulo}</h2>
          
          {/* Este es el método de cierre explícito. Es crucial para la accesibilidad
              y para usuarios que no sepan que pueden hacer clic en el fondo.
              Usamos la entidad HTML `&times;` para mostrar una 'X' visualmente atractiva.
          */}
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        {/* --- Cuerpo de la Modal --- */}
        <div className="modal-body">
          {/* Aquí es donde se inyecta el contenido dinámico. Cualquier cosa que pasemos
              entre <Modal> y </Modal> en App.jsx se renderizará en este lugar.
              Es la esencia de los componentes de tipo 'wrapper' o 'contenedor' en React.
          */}
          {children}
        </div>
      </div>
    </div>
  );
}

// Exportamos el componente como el valor por defecto del módulo, permitiendo que otros archivos
// lo importen con un nombre de su elección (aunque por convención se usa 'Modal').
export default Modal;