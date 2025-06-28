// Este componente es simple. Su único trabajo es mostrar los detalles de una mejora que recibe a través de props.
import React from "react";

/**
 * Muestra una única mejora con su nombre, costo y un botón para comprar.
 * @param {object} props
 * @param {string} props.nombre - El nombre de la mejora.
 * @param {number} props.costo - El costo de la mejora.
 */

function Upgrade({nombre, costo}){
    return(
        <div className="upgrader">
            <span>{nombre}</span>
            <span>Costo: ${costo}</span>
            {/* El botón está deshabilitado por ahora. Lo haremos funcional en la siguiente etapa. */}
            <button disabled>Mejorar</button>
        </div>
    );
}

export default Upgrade;