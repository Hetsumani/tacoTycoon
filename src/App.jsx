// Solo necesitamos modificar dos archivos: App.jsx (donde vive la lógica) y Header.jsx (donde se muestra la información).
// El componente ClickerButton.jsx no necesita cambios, lo que demuestra la ventaja de nuestra arquitectura actual.
import React, { useState } from 'react'; // React 18+ permite JSX sin importar, pero seguimos importando useState.
import Header from './components/Header';
import ClickerButton from './components/ClickerButton';
import UpgradeList from './components/upgradeList';
import './App.css';                      // Hoja de estilos global de la app.

/* -------------------------------------------------------------------------- */
/*  Datos Iniciales                                                           */
/* -------------------------------------------------------------------------- */
// Definimos los datos iniciales para las mejoras del taco de Asada.

const initialAsadaUpgrades = [
  { id: 'asada-1', nombre: 'Cebolla', costo: 10},
  { id: 'asada-2', nombre: 'Cilantro', costo: 20},
  { id: 'asada-3', nombre: 'Salsa', costo: 50},
  { id: 'asada-4', nombre: 'Guacamole', costo: 100},
  { id: 'asada-5', nombre: 'Doble Tortilla', costo: 200},
]

/* -------------------------------------------------------------------------- */
/*  Componente                                                                */
/* -------------------------------------------------------------------------- */

export default function App() {

  /* ---------------------------------------------------------------------- */
  /*  Estado                                                                */
  /* ---------------------------------------------------------------------- */
  
  const [tacosVendidos, setTacosVendidos] = useState(0); // Estado inicial: 0 tacos.  
  const [dinero, setDinero] = useState(0);
  // Nuevo estado para manejar el arreglo de mejoras.
  const [asadaUpgrades, setAsadaUpgrades] = useState(initialAsadaUpgrades);

  /* ---------------------------------------------------------------------- */
  /*  Lógica del juego                                                      */
  /* ---------------------------------------------------------------------- */

  const PRECIO_TACO_ASADA = 5;

  /* ---------------------------------------------------------------------- */
  /*  Manejadores de eventos                                                */
  /* ---------------------------------------------------------------------- */

  
  const handleVenderTaco = () => {    
    setTacosVendidos(prevTacos => prevTacos + 1);
    setDinero(dinero + PRECIO_TACO_ASADA)
  };

  /* ---------------------------------------------------------------------- */
  /*  Render (JSX)                                                          */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="App">      
      <Header tacosVendidos={tacosVendidos} dinero={dinero}/>
      <main>        
        <ClickerButton onVenderTaco={handleVenderTaco} guisado='Asada' />
        {/* Renderizamos la lista de mejoras y le pasamos los datos del estado. */}
        <UpgradeList upgrades={asadaUpgrades}/>
      </main>
    </div>
  );
}
