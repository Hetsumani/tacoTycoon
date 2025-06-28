// Este componente ahora necesita pasar la función de compra
// y el estado deshabilitado a cada <Upgrade />
import React from "react";
import Upgrade from "./upgrade";

/**
 * Renderiza una lista de componentes Upgrade.
 * @param {object} props
 * @param {Array<object>} props.upgrades - El arreglo de objetos de mejoras.
 * @param {function} props.onComprarMejora - La función para manejar la compra.
 * @param {number} props.dinero - El dinero actual del jugador.
 */

function UpgradeList({ upgrades, onComprarMejora, dinero }) {
  return (
    <div className="upgrade-list">
      <h3>Mejoras de Asada</h3>
      {upgrades.map((upgrade) => (        
        <Upgrade
          key={upgrade.id}
          nombre={upgrade.nombre}
          costo={upgrade.costo}
          nivel={upgrade.nivel}
          // Pasamos una función que llama al manejador con el ID específico de esta mejora.
          onComprar={() => onComprarMejora(upgrade.id)}
          // El botón se deshabilita si el dinero es menor que el costo.
          estaDeshabilitado={dinero < upgrade.costo}
        />
      ))}
    </div>
  );
}

export default UpgradeList;
