// App.jsx

import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import ClickerButton from "./components/ClickerButton";
import UpgradeList from "./components/upgradeList";
import AyudanteList from "./components/AyudanteList";
import Modal from "./components/Modal"; // <-- 1. IMPORTAMOS LA MODAL
import "./App.css";

import asadaImage from './assets/asada.webp';

const initialGameState = {
  asada: {
    id: "asada",
    nombre: "Asada",
    precioBase: 5,
    tacosVendidos: 0,
    isUnlocked: true,
    unlockCost: 0,
    imagen: asadaImage,
    upgrades: [
      {
        id: "asada-1",
        nombre: "Cebolla",
        nivel: 0,
        costoBase: 250,
        costo: 250,
        efecto: 0.15,
      },
      {
        id: "asada-2",
        nombre: "Cilantro",
        nivel: 0,
        costoBase: 2000,
        costo: 2000,
        efecto: 0.25,
      },
      {
        id: "asada-3",
        nombre: "Salsa",
        nivel: 0,
        costoBase: 5000,
        costo: 5000,
        efecto: 0.4,
      },
      {
        id: "asada-4",
        nombre: "Guacamole",
        nivel: 0,
        costoBase: 10000,
        costo: 10000,
        efecto: 0.55,
      },
      {
        id: "asada-5",
        nombre: "Doble Tortilla",
        nivel: 0,
        costoBase: 50000,
        costo: 50000,
        efecto: 0.7,
      },
    ],
    ayudantes: [
      {
        id: "asada-ayudante-1",
        nombre: "Don Chema",
        nivel: 0,
        costoBase: 1500,
        costo: 1500,
        descripcion: "Genera 1 Taco por Segundo por nivel.",
      },
      {
        id: "asada-ayudante-2",
        nombre: "Doña Concha",
        nivel: 0,
        costoBase: 10000,
        costo: 10000,
        descripcion: "Duplica el TPS total por cada nivel.",
      },
    ],
  },
  adobada: {
    id: "adobada",
    nombre: "Adobada",
    precioBase: 7,
    tacosVendidos: 0,
    isUnlocked: false,
    unlockCost: 100000,
    upgrades: [
      {
        id: "adobada-1",
        nombre: "Piña",
        nivel: 0,
        costoBase: 30,
        costo: 30,
        efecto: 0.2,
      },
      {
        id: "adobada-2",
        nombre: "Cilantro",
        nivel: 0,
        costoBase: 40,
        costo: 40,
        efecto: 0.3,
      },
      {
        id: "adobada-3",
        nombre: "Cebolla",
        nivel: 0,
        costoBase: 40,
        costo: 40,
        efecto: 0.4,
      },
      {
        id: "adobada-4",
        nombre: "Salsa",
        nivel: 0,
        costoBase: 80,
        costo: 80,
        efecto: 0.5,
      },
      {
        id: "adobada-5",
        nombre: "Guacamole",
        nivel: 0,
        costoBase: 150,
        costo: 150,
        efecto: 0.6,
      },
    ],
    ayudantes: [
      {
        id: "adobada-ayudante-1",
        nombre: "El Don Trompa",
        nivel: 0,
        costoBase: 1000,
        costo: 1000,
        descripcion: "Genera 1 Taco por Segundo por nivel.",
      },
      {
        id: "adobada-ayudante-2",
        nombre: "El Trompito",
        nivel: 0,
        costoBase: 7500,
        costo: 7500,
        descripcion: "Duplica el TPS total por cada nivel.",
      },
    ],
  },
  cabeza: {
    id: "cabeza",
    nombre: "Cabeza",
    precioBase: 6,
    tacosVendidos: 0,
    isUnlocked: false,
    unlockCost: 150000,
    upgrades: [
      {
        id: "cabeza-1",
        nombre: "Cachete Extra",
        nivel: 0,
        costoBase: 500,
        costo: 500,
        efecto: 0.2,
      },
      {
        id: "cabeza-2",
        nombre: "Lengua Premium",
        nivel: 0,
        costoBase: 1000,
        costo: 1000,
        efecto: 0.3,
      },
      {
        id: "cabeza-3",
        nombre: "Salsa Verde",
        nivel: 0,
        costoBase: 2000,
        costo: 2000,
        efecto: 0.4,
      },
      {
        id: "cabeza-4",
        nombre: "Tortilla de Maíz Azul",
        nivel: 0,
        costoBase: 3000,
        costo: 3000,
        efecto: 0.5,
      },
      {
        id: "cabeza-5",
        nombre: "Cebolla y Cilantro",
        nivel: 0,
        costoBase: 5000,
        costo: 5000,
        efecto: 0.6,
      },
    ],
    ayudantes: [
      {
        id: "cabeza-ayudante-1",
        nombre: "El Aquiles Baeza",
        nivel: 0,
        costoBase: 1200,
        costo: 1200,
        descripcion: "Genera 1 Taco por Segundo por nivel.",
      },
      {
        id: "cabeza-ayudante-2",
        nombre: "Doña Dolores Delano",
        nivel: 0,
        costoBase: 9500,
        costo: 9500,
        descripcion: "Duplica el TPS total por cada nivel.",
      },
    ],
  },
  quesabirria: {
    id: "quesabirria",
    nombre: "Quesabirria",
    precioBase: 10,
    tacosVendidos: 0,
    isUnlocked: false,
    unlockCost: 200000,
    upgrades: [
      {
        id: "quesabirria-1",
        nombre: "Más Queso",
        nivel: 0,
        costoBase: 1000,
        costo: 1000,
        efecto: 0.25,
      },
      {
        id: "quesabirria-2",
        nombre: "Consomé",
        nivel: 0,
        costoBase: 3000,
        costo: 3000,
        efecto: 0.35,
      },
      {
        id: "quesabirria-3",
        nombre: "Carne Extra",
        nivel: 0,
        costoBase: 8000,
        costo: 8000,
        efecto: 0.5,
      },
      {
        id: "quesabirria-4",
        nombre: "Tortilla Crujiente Bañada en Aceite de la Birria🥵",
        nivel: 0,
        costoBase: 16000,
        costo: 16000,
        efecto: 0.65,
      },
      {
        id: "quesabirria-5",
        nombre: "Con Gordito",
        nivel: 0,
        costoBase: 25000,
        costo: 25000,
        efecto: 0.8,
      },
    ],
    ayudantes: [
      {
        id: "quesabirria-ayudante-1",
        nombre: "El Aitor Tilla",
        nivel: 0,
        costoBase: 2000,
        costo: 2000,
        descripcion: "Genera 1 Taco por Segundo por nivel.",
      },
      {
        id: "quesabirria-ayudante-2",
        nombre: "Taquero Elton Tito",
        nivel: 0,
        costoBase: 12000,
        costo: 12000,
        descripcion: "Duplica el TPS total por cada nivel.",
      },
    ],
  },
};

export default function App() {
  const [dinero, setDinero] = useState(10000000000);
  const [gameState, setGameState] = useState(initialGameState);
  // <-- 2. AÑADIMOS EL NUEVO ESTADO PARA LA MODAL
  // Este objeto nos dirá si una modal está abierta (`show`), para qué taco (`tacoId`),
  // y qué contenido mostrar (`type`: 'upgrades' o 'ayudantes').
  const [modalConfig, setModalConfig] = useState({
    show: false,
    tacoId: null,
    type: null,
  });

  const calculateGananciaPorClick = (tacoId) => {
    const taco = gameState[tacoId];
    if (!taco) return 0;
    const bonusPorMejoras = taco.upgrades.reduce(
      (total, mejora) => total + mejora.nivel * mejora.efecto,
      0
    );
    return taco.precioBase * (1 + bonusPorMejoras);
  };

  const totalTps = useMemo(() => {
    return Object.values(gameState).reduce((total, taco) => {
      if (!taco.isUnlocked) return total;
      const ayudante1 = taco.ayudantes[0];
      const ayudante2 = taco.ayudantes[1];
      const tpsBase = ayudante1?.nivel || 0;
      const multiplicador = Math.pow(2, ayudante2?.nivel || 0);
      return total + tpsBase * multiplicador;
    }, 0);
  }, [gameState]);

  const totalTacos = useMemo(() => {
    return Object.values(gameState).reduce(
      (total, taco) => total + taco.tacosVendidos,
      0
    );
  }, [gameState]);

  useEffect(() => {
    if (totalTps === 0) return;
    const intervalId = setInterval(() => {
      let gananciaTotal = 0;
      const nuevosTacosVendidos = {};

      Object.values(gameState).forEach((taco) => {
        if (!taco.isUnlocked) return;
        const ayudante1 = taco.ayudantes[0];
        const ayudante2 = taco.ayudantes[1];
        const tpsBase = ayudante1?.nivel || 0;
        const multiplicador = Math.pow(2, ayudante2?.nivel || 0);
        const tps = tpsBase * multiplicador;
        const ganancia = (tps * calculateGananciaPorClick(taco.id)) / 10;
        gananciaTotal += ganancia;
        nuevosTacosVendidos[taco.id] = (taco.tacosVendidos || 0) + tps / 10;
      });

      setGameState((prev) => {
        const nuevoEstado = { ...prev };
        for (const [id, nuevosTacos] of Object.entries(nuevosTacosVendidos)) {
          nuevoEstado[id] = {
            ...nuevoEstado[id],
            tacosVendidos: nuevosTacos,
          };
        }
        return nuevoEstado;
      });

      setDinero((prev) => prev + gananciaTotal);
    }, 100);
    return () => clearInterval(intervalId);
  }, [totalTps, gameState]);

  const handleVenderTaco = (tacoId) => {
    const ganancia = calculateGananciaPorClick(tacoId);
    setDinero((prev) => prev + ganancia);
    setGameState((prev) => ({
      ...prev,
      [tacoId]: {
        ...prev[tacoId],
        tacosVendidos: prev[tacoId].tacosVendidos + 1,
      },
    }));
  };

  const handleComprar = (tacoId, itemId, itemType) => {
    const taco = gameState[tacoId];
    const items = taco[itemType];
    const item = items.find((i) => i.id === itemId);

    // Si es un ayudante y ya alcanzó el nivel máximo, no hacer nada.
    if (itemType === "ayudantes" && item.nivel >= 20) {
      return;
    }

    if (dinero >= item.costo) {
      setDinero(dinero - item.costo);
      const nuevosItems = items.map((i) =>
        i.id === itemId
          ? {
              ...i,
              nivel: i.nivel + 1,
              costo: Math.floor(i.costoBase * Math.pow(1.15, i.nivel + 1)),
            }
          : i
      );
      setGameState((prev) => ({
        ...prev,
        [tacoId]: { ...prev[tacoId], [itemType]: nuevosItems },
      }));
    }
  };

  const handleUnlockTaco = (tacoId) => {
    const taco = gameState[tacoId];
    if (dinero >= taco.unlockCost) {
      setDinero((prev) => prev - taco.unlockCost);
      setGameState((prev) => ({
        ...prev,
        [tacoId]: { ...prev[tacoId], isUnlocked: true },
      }));
    }
  };

  // <-- 3. AÑADIMOS MANEJADORES PARA ABRIR Y CERRAR LA MODAL
  const handleOpenModal = (tacoId, type) => {
    setModalConfig({ show: true, tacoId: tacoId, type: type });
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, tacoId: null, type: null });
  };

  return (
    <div className="App">
      <Header tacosVendidos={totalTacos} dinero={dinero} tps={totalTps} />
      <main className="game-container">
        {Object.values(gameState).map((taco) => (
          <div key={taco.id} className="taco-type-section">
            {taco.isUnlocked ? (
              <>
                {/* ===== PUNTO DE CAMBIO: IMAGEN DEL TACO ===== */}
                <img
                  src={taco.imagen}
                  alt={taco.nombre}
                  className="taco-image"
                  width={100}
                />
                <h2>
                  {taco.nombre} ($
                  {calculateGananciaPorClick(taco.id).toFixed(2)})
                </h2>
                <ClickerButton
                  onVenderTaco={() => handleVenderTaco(taco.id)}
                  guisado={taco.nombre}
                />                
                <div className="action-buttons-container">
                  <button onClick={() => handleOpenModal(taco.id, "upgrades")}>
                    Ver Mejoras
                  </button>
                  {taco.ayudantes.length > 0 && (
                    <button
                      onClick={() => handleOpenModal(taco.id, "ayudantes")}
                    >
                      Contratar Ayudantes
                    </button>
                  )}
                </div>
              </>
            ) : (
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
      {/*
        ==================================================================
        RENDERIZADO DE LA MODAL
        ==================================================================
        Aquí es donde nuestro componente <Modal> reutilizable cobra vida.
        Solo existe UNA instancia de la Modal en toda la aplicación, y su contenido
        y visibilidad son controlados completamente por el estado (`modalConfig`).
        Este es un patrón de diseño muy eficiente.
      */}
      <Modal
        // --- PROP: isOpen ---
        // La visibilidad de la modal está directamente ligada al estado.
        // Si `modalConfig.show` es `true`, la modal se renderiza; si es `false`, devuelve `null`.
        // Esto es un ejemplo claro de una "UI declarativa" o "state-driven UI".
        isOpen={modalConfig.show}

        // --- PROP: onClose ---
        // Pasamos la función `handleCloseModal` como una prop. Esto permite que el componente hijo (`Modal`)
        // pueda "comunicarse" con su padre (`App`) para pedirle que cambie el estado.
        // Es la forma en que el botón de cierre o el clic en el fondo de la modal pueden funcionar.
        onClose={handleCloseModal}

        // --- PROP: titulo ---
        // El título se genera dinámicamente basándose en el estado `modalConfig`.
        // Usamos un operador ternario para construir el string:
        titulo={
          // 1. Primero, nos aseguramos de que `tacoId` y `type` no sean nulos para evitar errores.
          modalConfig.tacoId && modalConfig.type
            // 2. Si tenemos datos, construimos el título.
            ? `${
                // Usamos otro ternario para elegir entre "Mejoras" y "Ayudantes".
                modalConfig.type === "upgrades" ? "Mejoras" : "Ayudantes"
              } para Tacos de ${
                // Accedemos al nombre del taco. El `?.` (optional chaining) es una medida de seguridad:
                // si por alguna razón `gameState[modalConfig.tacoId]` fuera indefinido, no rompería la app.
                gameState[modalConfig.tacoId]?.nombre
              }`
            // 3. Si no hay datos, el título es un string vacío.
            : ""
        }
      >
        {/*
          ==================================================================
          CONTENIDO HIJO (CHILDREN) DE LA MODAL
          ==================================================================
          Todo lo que está aquí dentro se pasará a la prop `children` de la Modal.
          Utilizamos "renderizado condicional" con el operador `&&` para decidir
          QUÉ componente de lista mostrar.
        */}

        {/* --- Condición para mostrar la lista de Mejoras --- */}
        {/* Esto se lee como: "SI el tipo es 'upgrades' Y SI tenemos un tacoId, ENTONCES renderiza <UpgradeList>" */}
        {modalConfig.type === "upgrades" && modalConfig.tacoId && (
          <UpgradeList
            // Pasamos solo la lista de mejoras del taco seleccionado.
            upgrades={gameState[modalConfig.tacoId].upgrades}
            // Creamos una función sobre la marcha para pasar los argumentos correctos
            // a nuestro manejador de compras general.
            onComprarMejora={(itemId) =>
              handleComprar(modalConfig.tacoId, itemId, "upgrades")
            }
            // Pasamos el dinero actual para que el componente hijo sepa si habilitar o no los botones.
            dinero={dinero}
          />
        )}

        {/* --- Condición para mostrar la lista de Ayudantes --- */}
        {/* Esto se lee como: "SI el tipo es 'ayudantes' Y SI tenemos un tacoId, ENTONCES renderiza <AyudanteList>" */}
        {modalConfig.type === "ayudantes" && modalConfig.tacoId && (
          <AyudanteList
            // Pasamos solo la lista de ayudantes del taco seleccionado.
            ayudantes={gameState[modalConfig.tacoId].ayudantes}
            // Hacemos lo mismo que con las mejoras, pero especificando el tipo "ayudantes".
            onComprarAyudante={(itemId) =>
              handleComprar(modalConfig.tacoId, itemId, "ayudantes")
            }
            dinero={dinero}
          />
        )}
      </Modal>
    </div>
  );
}
