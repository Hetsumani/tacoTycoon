// App.jsx

import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ClickerButton from './components/ClickerButton';
import UpgradeList from './components/upgradeList';
import AyudanteList from './components/AyudanteList';
import './App.css';

// --- DATOS INICIALES ---

// ETAPA 7: Se reestructura toda la data inicial en un solo objeto `initialGameState`.
// Esto nos permite manejar múltiples tipos de tacos de forma escalable.
// Cada clave del objeto (ej. 'asada') representa un tipo de taco.
const initialGameState = {
  asada: {
    id: 'asada',
    nombre: 'Asada',
    precioBase: 5,
    tacosVendidos: 0,
    // ETAPA 7 EXTRA: Se añade la propiedad `isUnlocked` para controlar la visibilidad y funcionalidad.
    isUnlocked: true, // Asada empieza desbloqueado.
    unlockCost: 0,
    upgrades: [
      { id: 'asada-1', nombre: 'Cebolla', nivel: 0, costoBase: 250, costo: 250, efecto: 0.15 },
      { id: 'asada-2', nombre: 'Cilantro', nivel: 0, costoBase: 2000, costo: 2000, efecto: 0.25 },
      { id: 'asada-3', nombre: 'Salsa', nivel: 0, costoBase: 5000, costo: 5000, efecto: 0.40 },
      { id: 'asada-4', nombre: 'Guacamole', nivel: 0, costoBase: 10000, costo: 10000, efecto: 0.55 },
      { id: 'asada-5', nombre: 'Doble Tortilla', nivel: 0, costoBase: 50000, costo: 50000, efecto: 0.70 },
    ],
    ayudantes: [
      { id: 'asada-ayudante-1', nombre: 'Don Chema', nivel: 0, costoBase: 1500, costo: 1500, descripcion: 'Genera 1 Taco por Segundo por nivel.' },
      { id: 'asada-ayudante-2', nombre: 'Doña Concha', nivel: 0, costoBase: 10000, costo: 10000, descripcion: 'Duplica el TPS total por cada nivel.' },
    ]
  },
  // ETAPA 7: Se añade el objeto completo para el nuevo tipo de taco: Adobada.
  adobada: {
    id: 'adobada',
    nombre: 'Adobada',
    precioBase: 7,
    tacosVendidos: 0,
    // ETAPA 7 EXTRA: Adobada empieza bloqueado y con un costo de desbloqueo.
    isUnlocked: false,
    unlockCost: 100000,
    upgrades: [
      { id: 'adobada-1', nombre: 'Piña', nivel: 0, costoBase: 30, costo: 30, efecto: 0.2 },
      { id: 'adobada-2', nombre: 'Cilantro', nivel: 0, costoBase: 40, costo: 40, efecto: 0.3 },
      { id: 'adobada-3', nombre: 'Cebolla', nivel: 0, costoBase: 40, costo: 40, efecto: 0.4 },
      { id: 'adobada-4', nombre: 'Salsa', nivel: 0, costoBase: 80, costo: 80, efecto: 0.5 },
      { id: 'adobada-5', nombre: 'Guacamole', nivel: 0, costoBase: 150, costo: 150, efecto: 0.6 },
    ],
    ayudantes: []
  }
};

export default function App() {
  // --- ESTADO ---
  const [dinero, setDinero] = useState(0);
  // ETAPA 7: Se unifican los estados relacionados con los tacos en un solo objeto `gameState`.
  const [gameState, setGameState] = useState(initialGameState);

  // --- CÁLCULOS DERIVADOS ---

  // ETAPA 7: `gananciaPorClick` se convierte en una función que toma el ID del taco.
  // Esto es necesario porque ahora cada tipo de taco tiene su propia ganancia.
  const calculateGananciaPorClick = (tacoId) => {
    const taco = gameState[tacoId];
    if (!taco) return 0;
    const multiplicadorBase = 1;
    const bonusPorMejoras = taco.upgrades.reduce((total, mejora) => total + (mejora.nivel * mejora.efecto), 0);
    return taco.precioBase * (multiplicadorBase + bonusPorMejoras);
  };
  
  // ETAPA 7: El TPS total ahora lee desde la nueva estructura de estado anidada.
  const totalTps = useMemo(() => {
    const tpsAsada = (() => {
      // ETAPA 7 EXTRA: Se añade una comprobación para no calcular el TPS de un taco bloqueado.
      if (!gameState.asada.isUnlocked) return 0;
      const ayudantes = gameState.asada.ayudantes;
      const tpsBase = (ayudantes.find(a => a.id === 'asada-ayudante-1')?.nivel || 0) * 1;
      const multiplicadorNivel = ayudantes.find(a => a.id === 'asada-ayudante-2')?.nivel || 0;
      return tpsBase * Math.pow(2, multiplicadorNivel);
    })();
    return tpsAsada;
  }, [gameState]);

  // ETAPA 7: Se añade un cálculo para el total de tacos vendidos de todos los tipos.
  const totalTacos = useMemo(() => {
    return Object.values(gameState).reduce((total, taco) => total + taco.tacosVendidos, 0);
  }, [gameState]);


  // --- BUCLE DEL JUEGO ---
  useEffect(() => {
    if (totalTps === 0) return;
    const intervalId = setInterval(() => {
      const gananciaPorSegundo = totalTps * calculateGananciaPorClick('asada');
      // ETAPA 7: La actualización de estado ahora debe modificar el objeto anidado correctamente.
      setGameState(prev => ({
        ...prev,
        asada: {
          ...prev.asada,
          tacosVendidos: prev.asada.tacosVendidos + (totalTps / 10)
        }
      }));
      setDinero(prevDinero => prevDinero + (gananciaPorSegundo / 10));
    }, 100);
    return () => clearInterval(intervalId);
    // ETAPA 7: `gameState` se convierte en una dependencia para que el bucle se actualice si algo cambia.
  }, [totalTps, gameState]);

  // --- MANEJADORES DE EVENTOS ---
  
  // ETAPA 7: El manejador ahora recibe `tacoId` para saber qué taco incrementar.
  const handleVenderTaco = (tacoId) => {
    const ganancia = calculateGananciaPorClick(tacoId);
    setDinero(prevDinero => prevDinero + ganancia);
    // ETAPA 7: La actualización del estado es más compleja para modificar una propiedad anidada de forma inmutable.
    setGameState(prev => ({
      ...prev,
      [tacoId]: {
        ...prev[tacoId],
        tacosVendidos: prev[tacoId].tacosVendidos + 1
      }
    }));
  };

  // ETAPA 7: El manejador de compra ahora es más genérico, aceptando `tacoId` y `itemType` ('upgrades' o 'ayudantes').
  const handleComprar = (tacoId, itemId, itemType) => {
    const taco = gameState[tacoId];
    const items = taco[itemType];
    const item = items.find(i => i.id === itemId);

    if (dinero >= item.costo) {
      setDinero(dinero - item.costo);
      const nuevosItems = items.map(i => {
        if (i.id === itemId) {
          const nuevoNivel = i.nivel + 1;
          return { ...i, nivel: nuevoNivel, costo: Math.floor(i.costoBase * Math.pow(1.15, nuevoNivel)) };
        }
        return i;
      });
      // ETAPA 7: La actualización del estado busca el taco correcto y el tipo de item correcto para actualizar.
      setGameState(prev => ({ ...prev, [tacoId]: { ...prev[tacoId], [itemType]: nuevosItems } }));
    }
  };

  // ETAPA 7 EXTRA: Se añade una nueva función para manejar la lógica de desbloqueo.
  const handleUnlockTaco = (tacoId) => {
    const taco = gameState[tacoId];
    if (dinero >= taco.unlockCost) {
        setDinero(prevDinero => prevDinero - taco.unlockCost);
        // Actualiza el estado para poner la propiedad `isUnlocked` del taco en `true`.
        setGameState(prev => ({
            ...prev,
            [tacoId]: { ...prev[tacoId], isUnlocked: true }
        }));
    }
  };


  // --- RENDERIZADO ---
  return (
    <div className="App">
      <Header
        tacosVendidos={totalTacos}
        dinero={dinero}
        tps={totalTps}
      />
      <main className='game-container'>
        {/* ETAPA 7: Se mapea el objeto `gameState` para renderizar una sección por cada tipo de taco.
            Esto hace que la UI sea dinámica y se adapte a los datos. */}
        {Object.values(gameState).map(taco => (
          <div key={taco.id} className="taco-type-section">
            {/* ETAPA 7 EXTRA: Se añade renderizado condicional. Muestra una cosa si el taco
                está desbloqueado, y otra (el botón de desbloqueo) si no lo está. */}
            {taco.isUnlocked ? (
              // Si está desbloqueado: renderiza la interfaz normal del juego.
              <>
                {/*Desplegamos el guisado del taco y su ganancia por cada uno}*/}
                <h2>{taco.nombre} ${calculateGananciaPorClick(taco.id).toFixed(2)}</h2>
                <ClickerButton
                  onVenderTaco={() => handleVenderTaco(taco.id)}
                  guisado={taco.nombre}
                />
                <UpgradeList
                  titulo={`Mejoras de ${taco.nombre}`}
                  upgrades={taco.upgrades}
                  onComprarMejora={(itemId) => handleComprar(taco.id, itemId, 'upgrades')}
                  dinero={dinero}
                />
                {taco.ayudantes.length > 0 && (
                  <AyudanteList
                    titulo={`Ayudantes de ${taco.nombre}`}
                    ayudantes={taco.ayudantes}
                    onComprarAyudante={(itemId) => handleComprar(taco.id, itemId, 'ayudantes')}
                    dinero={dinero}
                  />
                )}
              </>
            ) : (
              // Si NO está desbloqueado: renderiza la sección de desbloqueo.
              <div className="unlock-section">
                <h2>Desbloquear Taquería de {taco.nombre}</h2>
                <p>Costo: ${taco.unlockCost.toLocaleString()}</p>
                <button
                  className="unlock-button"
                  onClick={() => handleUnlockTaco(taco.id)}
                  disabled={dinero < taco.unlockCost}
                >
                  Desbloquear
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}