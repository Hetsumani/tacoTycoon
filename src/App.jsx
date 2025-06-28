/**
 * App.jsx
 * -----------
 * Componente raíz de **Taco Tycoon**.
 *
 * ─ Importa React y el *Hook* `useState`.
 * ─ Mantiene el estado principal del juego (tacos vendidos).
 * ─ Renderiza la interfaz con un contador y un botón.
 *
 * Recuerda: todo componente de función puede usar *Hooks* para
 * “engancharse” a características de React (estado, ciclo de vida, etc.).
 */

import React, { useState } from 'react'; // React 18+ permite JSX sin importar, pero seguimos importando useState.
import './App.css';                      // Hoja de estilos global de la app.

/* -------------------------------------------------------------------------- */
/*  Componente                                                                */
/* -------------------------------------------------------------------------- */

/**
 * `App` es un **componente funcional**:
 *  - Es una función de JavaScript que devuelve JSX.
 *  - React lo vuelve a ejecutar (re-renderizar) cada vez que su estado cambia.
 *
 *  Nota: un archivo puede exportar varios componentes, pero
 *  `export default` indica cuál es el principal al importarlo.
 */
export default function App() {

  /* ---------------------------------------------------------------------- */
  /*  Estado                                                                */
  /* ---------------------------------------------------------------------- */

  /**
   * useState 👇
   * ──────────
   *   ‣ `tacosVendidos`  → Valor actual.
   *   ‣ `setTacosVendidos` → Función que actualiza ese valor.
   *
   *  ⚠️ ¡Nunca modifiques la variable de estado directamente!
   *  Debes llamar a la función *setter* para que React:
   *    1. Cambie el valor de forma inmutable.
   *    2. Programe un nuevo re-render.
   */
  const [tacosVendidos, setTacosVendidos] = useState(0); // Estado inicial: 0 tacos.

  /* ---------------------------------------------------------------------- */
  /*  Manejadores de eventos                                                */
  /* ---------------------------------------------------------------------- */

  /**
   * handleVenderTaco
   * ────────────────
   * Se ejecuta al hacer clic en el botón “Vender Taco de Asada”.
   * Incrementa el contador **de forma atómica**:
   *
   *   setTacosVendidos(prev => prev + 1);
   *
   * Usar la versión de *callback* (`prev => …`) es más seguro si varias
   * actualizaciones pudieran ejecutarse en rápida sucesión.
   */
  const handleVenderTaco = () => {
    // Variante segura basada en el valor previo:
    setTacosVendidos(prevTacos => prevTacos + 1);
  };

  /* ---------------------------------------------------------------------- */
  /*  Render (JSX)                                                          */
  /* ---------------------------------------------------------------------- */

  /**
   * JSX ≈ “HTML con superpoderes”.
   *   - Etiquetas en minúscula → elementos DOM.
   *   - Etiquetas en mayúscula → componentes React.
   *   - Llaves `{}` permiten insertar expresiones de JS.
   *
   * React convierte este árbol en su “Virtual DOM” y lo sincroniza con
   * el DOM real de forma eficiente mediante *diffing*.
   */
  return (
    <div className="App">
      <header className="App-header">
        {/*  Título principal  */}
        <h1>Tacos Tycoon</h1>

        {/*  Contador reactivo: se actualiza cada vez que cambia el estado  */}
        <h2>Tacos vendidos: {tacosVendidos}</h2>

        {/*  Botón de acción. onClick → manejador de evento  */}
        <button
          type="button"
          onClick={handleVenderTaco}
          aria-label="Vender un taco de asada"
        >
          Vender Taco de Asada
        </button>
      </header>
    </div>
  );
}
