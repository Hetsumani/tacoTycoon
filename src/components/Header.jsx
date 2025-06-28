import React from "react";

/**
 * Componente Header.
 * Muestra el título del juego y los datos principales.
 * @param {object} props - Las propiedades pasadas desde el componente padre.
 * @param {number} props.tacosVendidos - El número total de tacos vendidos.
 * @param {number} props.dinero - La cantidad de dinero acumulado.
 * @param {number} props.gananciaPorClick - La ganancia actual por cada clic.
 */

function Header({ tacosVendidos, dinero, gananciaPorClick, tps }) {
  return (
    <header className="App-header">
      <h1>Taco Tycoon</h1>
      <h2>Tacos Vendidos: {tacosVendidos.toFixed(0)}</h2>
      <h2>Dinero: {dinero.toFixed(2)}</h2>
      <h3>Ganancia por Taco: ${gananciaPorClick.toFixed(2)}</h3>
      {/* Nuevo contador de TPS */}
      <h3>Tacos por Seg (TPS): {tps.toFixed(1)}</h3>
    </header>
  );
}

export default Header;
