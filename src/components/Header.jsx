// src/components/Header.jsx

import React from 'react';

import logo from '../assets/logo.png';
import taquitosImage from '../assets/taquitos.webp';

// Se simplifica para mostrar solo los totales globales.
function Header({ tacosVendidos, dinero, tps }) {
  return (
    <header className="App-header">
      <img src={logo} width={250} alt="Taco Tycoon" />
      {/* <h1>Taco Tycoon</h1> */}
      <div className="stats-container">

        <img src={taquitosImage} width={100} alt="Taquitos" />
        <h2>{tacosVendidos.toFixed(0)}</h2>
        <h2>Dinero: ${dinero.toFixed(2)}</h2>
        <h3>TPS Total: {tps.toFixed(1)}</h3>
      </div>
    </header>
  );
}

export default Header;