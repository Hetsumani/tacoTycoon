// Aquí es donde se unen todas las piezas: el nuevo estado,
// el cálculo de TPS y el bucle del juego con useEffect.
import React, { useState, useMemo, useEffect } from 'react'; // ETAPA 6: Se confirma la importación de useEffect
import Header from './components/Header';
import ClickerButton from './components/ClickerButton';
import UpgradeList from './components/upgradeList';
import AyudanteList from './components/AyudanteList'; // ETAPA 6: Se importa el nuevo componente para la lista de ayudantes.
import './App.css';

/* -------------------------------------------------------------------------- */
/* Datos Iniciales                                                           */
/* -------------------------------------------------------------------------- */

const initialAsadaUpgrades = [
  { id: 'asada-1', nombre: 'Cebolla', nivel: 0, costoBase: 10, costo: 10, efecto: 0.1 },
  { id: 'asada-2', nombre: 'Cilantro', nivel: 0, costoBase: 20, costo: 20, efecto: 0.15 },
  { id: 'asada-3', nombre: 'Salsa', nivel: 0, costoBase: 50, costo: 50, efecto: 0.2 },
  { id: 'asada-4', nombre: 'Guacamole', nivel: 0, costoBase: 100, costo: 100, efecto: 0.25 },
  { id: 'asada-5', nombre: 'Doble Tortilla', nivel: 0, costoBase: 200, costo: 200, efecto: 0.3 },
];

// ETAPA 6: Se definen los datos iniciales para los ayudantes.
// Cada uno tiene su costo, nivel y una descripción de su efecto.
const initialAyudantes = [
  { id: 'ayudante-1', nombre: 'Don Chema', nivel: 0, costoBase: 1500, costo: 1500, descripcion: 'Genera 1 taco por segundo por nivel.' },
  { id: 'ayudante-2', nombre: 'Doña Concha', nivel: 0, costoBase: 10000, costo: 100000, descripcion: 'Duplica el TPS total por cada nivel.' }
];

const PRECIO_BASE_TACO_ASADA = 5;

/* -------------------------------------------------------------------------- */
/* Componente                                                                */
/* -------------------------------------------------------------------------- */

export default function App() {
  /* ---------------------------------------------------------------------- */
  /* Estado                                                                  */
  /* ---------------------------------------------------------------------- */
  const [tacosVendidos, setTacosVendidos] = useState(0);
  const [dinero, setDinero] = useState(0);
  const [asadaUpgrades, setAsadaUpgrades] = useState(initialAsadaUpgrades);
  // ETAPA 6: Se añade un nuevo estado para manejar la lista de ayudantes.
  const [ayudantes, setAyudantes] = useState(initialAyudantes);

  /* ---------------------------------------------------------------------- */
  /* Lógica del juego (Cálculos Derivados)                                   */
  /* ---------------------------------------------------------------------- */
  const gananciaPorClick = useMemo(() => {
    const multiplicadorBase = 1;
    const bonusPorMejoras = asadaUpgrades.reduce((total, mejora) => {
      return total + (mejora.nivel * mejora.efecto);
    }, 0);
    return PRECIO_BASE_TACO_ASADA * (multiplicadorBase + bonusPorMejoras);
  }, [asadaUpgrades]);

  // ETAPA 6: Se añade el cálculo para los Tacos Por Segundo (TPS).
  // Se usa `useMemo` para que este valor solo se recalcule cuando el estado de `ayudantes` cambie.
  const tps = useMemo(() => {
    // Se calcula el TPS base que aporta Don Chema (1 por nivel).
    const tpsBase = (ayudantes.find(a => a.id === 'ayudante-1')?.nivel || 0) * 1;
    // Se obtiene el nivel de Doña Concha para saber cuántas veces duplicar el TPS.
    const multiplicadorNivel = ayudantes.find(a => a.id === 'ayudante-2')?.nivel || 0;
    // La fórmula aplica el multiplicador: tpsBase * (2^nivelDeDoñaConcha)
    return tpsBase * Math.pow(2, multiplicadorNivel);
  }, [ayudantes]);

  /* ---------------------------------------------------------------------- */
  /* Efectos Secundarios (Bucle del Juego)                                   */
  /* ---------------------------------------------------------------------- */

  // ETAPA 6: Este es el Hook `useEffect` que maneja la producción automática.
  // Es el corazón del juego pasivo.
  useEffect(() => {
    // Si no hay producción por segundo (tps es 0), no se hace nada. Es una optimización.
    if (tps === 0) return;

    // `setInterval` es una función de JavaScript que ejecuta un código cada X milisegundos.
    // Aquí, se ejecutará cada 100ms (10 veces por segundo) para una animación fluida.
    const intervalID = setInterval(() => {
      // Se actualiza el estado usando la forma de función (callback).
      // Esto garantiza que siempre se use el valor más reciente del estado, evitando errores.
      setTacosVendidos(prevTacos => prevTacos + (tps / 10));
      setDinero(prevDinero => prevDinero + (tps * gananciaPorClick / 10));
    }, 100);

    // La función de limpieza: `useEffect` devuelve esta función.
    // React la ejecuta cuando el componente va a ser "desmontado" o antes de que el efecto se repita.
    return () => {
      clearInterval(intervalID); // Limpia el intervalo para evitar que siga corriendo y cause fugas de memoria.
    };
    // El arreglo de dependencias: Le dice a React que este efecto debe volver a ejecutarse
    // solo si los valores de `tps` o `gananciaPorClick` cambian.
  }, [tps, gananciaPorClick]);

  /* ---------------------------------------------------------------------- */
  /* Manejadores de eventos                                                  */
  /* ---------------------------------------------------------------------- */
  const handleVenderTaco = () => {
    setTacosVendidos(prevTacos => prevTacos + 1);
    setDinero(prevDinero => prevDinero + gananciaPorClick);
  };

  // ETAPA 6: Esta función se generalizó para manejar la compra tanto de mejoras
  // como de ayudantes, recibiendo como parámetros el estado y su función de actualización.
  // Esto evita tener dos funciones de compra casi idénticas.
  const handleComprar = (id, items, setItems) => {
    const item = items.find(i => i.id === id);
    if (dinero >= item.costo) {
      setDinero(dinero - item.costo);
      setItems(prevItems =>
        prevItems.map(i => {
          if (i.id === id) {
            const nuevoNivel = i.nivel + 1;
            return {
              ...i,
              nivel: nuevoNivel,
              costo: Math.floor(i.costoBase * Math.pow(1.15, nuevoNivel)),
            };
          }
          return i;
        })
      );
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Render (JSX)                                                            */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="App">
      <Header
        tacosVendidos={tacosVendidos}
        dinero={dinero}
        gananciaPorClick={gananciaPorClick}
        // ETAPA 6: Se pasa el valor de tps al Header para que lo muestre.
        tps={tps}
      />
      <main className='game-container'>
        <div className="clicker-section">
          <ClickerButton onVenderTaco={handleVenderTaco} guisado="Asada" />
        </div>
        <div className="upgrades-section">
          <UpgradeList
            upgrades={asadaUpgrades}
            onComprarMejora={(id) => handleComprar(id, asadaUpgrades, setAsadaUpgrades)}
            dinero={dinero}
          />
          {/* ETAPA 6: Se renderiza el nuevo componente de lista de ayudantes. */}
          {/* Se le pasan los datos de los ayudantes, la función de compra y el dinero actual. */}
          <AyudanteList
            ayudantes={ayudantes}
            onComprarAyudante={(id) => handleComprar(id, ayudantes, setAyudantes)}
            dinero={dinero}
          />
        </div>
      </main>
    </div>
  );
}