import React from "react";

/**
 * Componente Header.
 * Muestra el título del juego y los datos principales.
 * @param {object} props - Las propiedades pasadas desde el componente padre.
 * @param {number} props.tacosVendidos - El número total de tacos vendidos.
 * @param {number} props.dinero - La cantidad de dinero acumulado.
 */

function Header({ tacosVendidos, dinero }) { // <-- Añadimos 'dinero' a las props
  return (
    <header className="App-header">
      <h1>Taco Tycoon</h1>
      {/* Muestra el valor que recibe a través de props */}
      <h2>Tacos Vendidos: {tacosVendidos}</h2>
      <h2>Dinero: {dinero}</h2> {/* <-- Nueva línea para mostrar el dinero */}
    </header>
  );
}

export default Header;
