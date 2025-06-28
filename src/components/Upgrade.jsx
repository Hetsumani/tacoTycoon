import React from "react";

/**
 * Muestra una única mejora con su nombre, costo y un botón para comprar.
 * @param {object} props
 * @param {string} props.nombre - El nombre de la mejora.
 * @param {number} props.costo - El costo de la mejora.
 * @param {number} props.nivel - El nivel actual de la mejora.
 * @param {function} props.onComprar - La función a ejecutar cuando se hace clic.
 * @param {boolean} props.estaDeshabilitado - Determina si el botón está activo.
 */

function Upgrade({nombre, costo, nivel, onComprar, estaDeshabilitado}){
    return(
        <div className="upgrade">
            <span>{nombre} (Nivel {nivel})</span>
            <span>Costo: ${costo}</span>
            {/* El botón está deshabilitado por ahora. Lo haremos funcional en la siguiente etapa. */}
            <button onClick={onComprar} disabled = {estaDeshabilitado}>Mejorar</button>
        </div>
    );
}

export default Upgrade;