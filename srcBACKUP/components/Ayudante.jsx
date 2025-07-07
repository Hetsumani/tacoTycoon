// Este componente será casi idéntico a Upgrade.jsx, pero adaptado para los ayudantes.
import React from "react";
/**
 * Muestra un único ayudante con su nombre, nivel, costo y efecto.
 */

function Ayudante({
  nombre,
  nivel,
  costo,
  descripcion,
  onComprar,
  estaDeshabilitado,
}) {
  return (
    <div className="upgrade">
      {" "}
      {/*Reutilizamos la clase CSS*/}
      <div>
        <strong>
          {nombre} (Nivel {nivel})
        </strong>
        <p style={{ margin: "4px 0", fontSize: "0.9em" }}>{descripcion}</p>
      </div>
      <span>Costo: ${costo}</span>
      <button onClick={onComprar} disabled={estaDeshabilitado}>Contratar</button>
    </div>
  );
}

export default Ayudante;