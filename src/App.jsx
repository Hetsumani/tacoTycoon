// Solo necesitamos modificar dos archivos: App.jsx (donde vive la lógica) y Header.jsx (donde se muestra la información).
// El componente ClickerButton.jsx no necesita cambios, lo que demuestra la ventaja de nuestra arquitectura actual.
import React, { useState } from 'react'; // React 18+ permite JSX sin importar, pero seguimos importando useState.
import Header from './components/Header';
import ClickerButton from './components/ClickerButton';
import './App.css';                      // Hoja de estilos global de la app.

/* -------------------------------------------------------------------------- */
/*  Componente                                                                */
/* -------------------------------------------------------------------------- */

export default function App() {

  /* ---------------------------------------------------------------------- */
  /*  Estado                                                                */
  /* ---------------------------------------------------------------------- */
  
  const [tacosVendidos, setTacosVendidos] = useState(0); // Estado inicial: 0 tacos.
  // Añadimos un nuevo estado para el dinero
  const [dinero, setDinero] = useState(0);

  /* ---------------------------------------------------------------------- */
  /*  Lógica del juego                                                      */
  /* ---------------------------------------------------------------------- */

  const PRECIO_TACO_ASADA = 5;

  /* ---------------------------------------------------------------------- */
  /*  Manejadores de eventos                                                */
  /* ---------------------------------------------------------------------- */

  // La función que modifica el estado también se queda en el componente padre.
  const handleVenderTaco = () => {
    // Variante segura basada en el valor previo:
    setTacosVendidos(prevTacos => prevTacos + 1);
    setDinero(dinero + PRECIO_TACO_ASADA)
  };

  /* ---------------------------------------------------------------------- */
  /*  Render (JSX)                                                          */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="App">
      {/* Pasamos el nuevo estado 'dinero' al Header como prop. */}
      <Header tacosVendidos={tacosVendidos} dinero={dinero}/>
      <main>        
        <ClickerButton onVenderTaco={handleVenderTaco} guisado='Asada' />
      </main>
    </div>
  );
}
