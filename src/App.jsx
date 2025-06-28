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

  // El estado se mantiene en el componente padre (App). Esto se conoce como "State Lifting".
  const [tacosVendidos, setTacosVendidos] = useState(0); // Estado inicial: 0 tacos.

  /* ---------------------------------------------------------------------- */
  /*  Manejadores de eventos                                                */
  /* ---------------------------------------------------------------------- */

  // La función que modifica el estado también se queda en el componente padre.
  const handleVenderTaco = () => {
    // Variante segura basada en el valor previo:
    setTacosVendidos(prevTacos => prevTacos + 1);
  };

  /* ---------------------------------------------------------------------- */
  /*  Render (JSX)                                                          */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="App">
      {/* Usamos el componente Header y le pasamos 'tacosVendidos' como una prop. */}
      <Header tacosVendidos={tacosVendidos} />
      <main>
        {/* Usamos el componente ClickerButton. */}
        {/* Le pasamos la función 'handleVenderTaco' como una prop llamada 'onVenderTaco'. */}
        <ClickerButton onVenderTaco={handleVenderTaco} guisado='Asada' />
      </main>
    </div>
  );
}
