// src/components/Ayudante.jsx

import React from "react";

function Ayudante({
  nombre,
  nivel,
  costo,
  descripcion,
  onComprar,
  estaDeshabilitado,
}) {
  // 1. Definimos el nivel máximo como una constante para claridad.
  const MAX_NIVEL = 20;

  // 2. Calculamos el progreso como un porcentaje.
  const progreso = (nivel / MAX_NIVEL) * 100;

  // 3. Ocultamos el botón si ya se alcanzó el nivel máximo.
  const haAlcanzadoMaxNivel = nivel >= MAX_NIVEL;

  return (
    // Ahora .upgrade es un contenedor de columna (flex-direction: column)
    <div className="upgrade">
      {/* Este div agrupa toda la información superior */}
      <div className="upgrade-info">
        <div>
          <strong>
            {nombre} {haAlcanzadoMaxNivel ? "(Nivel MÁX)" : `(Nivel ${nivel})`}
          </strong>
          <p style={{ margin: "4px 0", fontSize: "0.9em" }}>{descripcion}</p>
        </div>
        <div className="upgrade-actions">
          <span>Costo: ${!haAlcanzadoMaxNivel ? costo : "---"}</span>
          {!haAlcanzadoMaxNivel && (
            <button onClick={onComprar} disabled={estaDeshabilitado}>
              Contratar
            </button>
          )}
        </div>
      </div>

      {/* La barra de progreso va debajo */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Ayudante;