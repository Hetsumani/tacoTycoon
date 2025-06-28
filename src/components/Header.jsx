import React from "react";

/**
 * Componente Header.
 * Muestra el título del juego y los datos principales.
 * @param {object} props - Las propiedades pasadas desde el componente padre.
 * @param {number} props.tacosVendidos - El número total de tacos vendidos.
 * @param {number} props.dinero - La cantidad de dinero acumulado.
 * @param {number} props.gananciaPorClick - La ganancia actual por cada clic.
 */

function Header({ tacosVendidos, dinero, gananciaPorClick }) { // <-- Añadimos 'dinero' a las props
  return (
    <header className="App-header">
      <h1>Taco Tycoon</h1>
      {/* Muestra el valor que recibe a través de props */}
      <h2>Tacos Vendidos: {tacosVendidos}</h2>
      <h2>Dinero: {dinero}</h2> {/* <-- Nueva línea para mostrar el dinero */}
      <h3>Ganancia por Taco: ${gananciaPorClick.toFixed(2)}</h3>
    </header>
  );
}

export default Header;
