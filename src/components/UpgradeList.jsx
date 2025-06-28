// Este componente recibe el arreglo completo de mejoras
// y usa .map() para crear un componente <Upgrade /> por cada una.
import React from "react";
import Upgrade from "./upgrade";

/**
 * Renderiza una lista de componentes Upgrade.
 * @param {object} props
 * @param {Array<object>} props.upgrades - El arreglo de objetos de mejoras.
 */

function UpgradeList({ upgrades }) {
  return (
    <div className="upgrade-list">
      <h3>Mejoras de Asada</h3>
      {upgrades.map((upgrade) => (
        // Usamos .map() para iterar sobre el arreglo.
        // La prop 'key' es esencial para que React identifique cada elemento de forma única.
        <Upgrade
          key={upgrade.id}
          nombre={upgrade.nombre}
          costo={upgrade.costo}
        />
      ))}
    </div>
  );
}

export default UpgradeList;
