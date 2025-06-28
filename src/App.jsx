// Modificaremos los tres archivos que hemos creado: App.jsx (que contendrá toda la nueva lógica),
// UpgradeList.jsx (que pasará la información hacia abajo), y Upgrade.jsx (que recibirá la nueva funcionalidad).
import React, { useState, useMemo } from 'react'; // Importamos useMemo
import Header from './components/Header';
import ClickerButton from './components/ClickerButton';
import UpgradeList from './components/upgradeList';
import './App.css';                      // Hoja de estilos global de la app.

/* -------------------------------------------------------------------------- */
/*  Datos Iniciales                                                           */
/* -------------------------------------------------------------------------- */

// Añadimos 'nivel' y 'costoBase' para el cálculo incremental.
const initialAsadaUpgrades = [
  { id: 'asada-1', nombre: 'Cebolla', nivel: 0, costoBase: 10, costo: 10, efecto: 0.1},
  { id: 'asada-2', nombre: 'Cilantro', nivel: 0, costoBase: 20, costo: 20, efecto: 0.15},
  { id: 'asada-3', nombre: 'Salsa', nivel: 0, costoBase: 50, costo: 50, efecto: 0.2},
  { id: 'asada-4', nombre: 'Guacamole', nivel: 0, costoBase: 100, costo: 100, efecto: 0.25},
  { id: 'asada-5', nombre: 'Doble Tortilla', nivel: 0, costoBase: 200, costo: 200, efecto: 0.3},
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
  const [asadaUpgrades, setAsadaUpgrades] = useState(initialAsadaUpgrades);

  /* ---------------------------------------------------------------------- */
  /*  Lógica del juego                                                      */
  /* ---------------------------------------------------------------------- */

  // Cambiamos la denominación de la constante para calcular aumento de precio según se mejora
  const PRECIO_BASE_TACO_ASADA = 5; 

  /* ---------------------------------------------------------------------- */
  /*  Manejadores de eventos                                                */
  /* ---------------------------------------------------------------------- */

  // --- CÁLCULOS DERIVADOS ---
  // Calculamos la ganancia por clic.
  // Usamos useMemo para que este cálculo solo se rehaga si asadaUpgrades cambia.

  const gananciaPorClick = useMemo(() => {
    const multiplicadorBase = 1;
    // Usamos .reduce() para sumar los efectos de todas las mejoras según su nivel.
    const bonusPorMejoras = asadaUpgrades.reduce((total, mejora) => {
      return total + (mejora.nivel * mejora.efecto);
    }, 0);
    return PRECIO_BASE_TACO_ASADA * (multiplicadorBase + bonusPorMejoras);
  }, [asadaUpgrades]);
    
  const handleVenderTaco = () => {    
    setTacosVendidos(prevTacos => prevTacos + 1);
    // Usamos el valor calculado para la ganancia.
    setDinero(dinero + gananciaPorClick)
  };  
  
  /**
   * Maneja la lógica de compra de una mejora.
   * @param {string} upgradeId - El ID de la mejora a comprar.
   */

  const handleCompraMejora = (upgradeId) => {
    // 1. Encontrar la mejora que se quiere comprar
    const mejora = asadaUpgrades.find(u => u.id === upgradeId);

    // 2. Verificar si hay suficiente dinero.
    if (dinero >= mejora.costo){
      // 3. Restar el costo del dinero
      setDinero(dinero - mejora.costo);

      // 4. Actualizar el arreglo de mejoras de forma INMUTABLE.
      setAsadaUpgrades(upgradesActuales =>
        upgradesActuales.map(u => {
          if (u.id === upgradeId) {
            // Si es la mejora que compramos, creamos un NUEVO objeto.
            const nuevoNivel = u.nivel + 1;
            return{
              ...u, // Copiamos las propiedades existentes (id, nombre, costoBase)
              nivel: nuevoNivel,
              // Calculamos el nuevo costo incremental 
              // Usamos la fórmula: costo = base * 1.15^nivel
              costo: Math.floor(u.costoBase * Math.pow(1.15, nuevoNivel)),
            };
          }
          // Si no es la mejora que compramos, la devolvemos sin cambios.
          return u;
        })
      );
    }
  };

  /* ---------------------------------------------------------------------- */
  /*  Render (JSX)                                                          */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="App">      
      {/* Pasamos la ganancia por clic calculada al Header */}
      <Header 
        tacosVendidos={tacosVendidos}
        dinero={dinero}
        gananciaPorClick={gananciaPorClick}
      />
      <main>        
        <ClickerButton onVenderTaco={handleVenderTaco} guisado='Asada' />
        {/* Pasamos el dinero y la función de compra a la lista de mejoras */}
        <UpgradeList upgrades={asadaUpgrades}
        onComprarMejora={handleCompraMejora}
        dinero={dinero}/>
      </main>
    </div>
  );
}
