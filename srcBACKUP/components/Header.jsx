// src/components/Header.jsx

import React from 'react';

// Se simplifica para mostrar solo los totales globales.
function Header({ tacosVendidos, dinero, tps }) {
  return (
    <header className="App-header">
      <h1>Taco Tycoon</h1>
      <div className="stats-container">
        <h2>Tacos Totales: {tacosVendidos.toFixed(0)}</h2>
        <h2>Dinero: ${dinero.toFixed(2)}</h2>
        <h3>TPS Total: {tps.toFixed(1)}</h3>
      </div>
    </header>
  );
}

export default Header;