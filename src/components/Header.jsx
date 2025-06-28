import React from "react";

/**
 * Componente Header.
 * Muestra el título del juego y los datos principales.
 * @param {object} props - Las propiedades pasadas desde el componente padre.
 * @param {number} props.tacosVendidos - El número total de tacos vendidos.
 */

function Header({ tacosVendidos }) {
  return (
    <header className="App-header">
      <h1>Taco Tycoon</h1>
      {/* Muestra el valor que recibe a través de props */}
      <h2>Tacos Vendidos: {tacosVendidos}</h2>
    </header>
  );
}

export default Header;
