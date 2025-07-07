/*Este componente será nuestro botón. No manejará el estado directamente.
En su lugar, recibirá una función desde su padre (App)
para ejecutarla cuando se haga clic en él.*/
import React from "react";

/**
 * Componente para el botón de venta de tacos.
 * @param {object} props - Las propiedades pasadas desde el componente padre.
 * @param {function} props.onVenderTaco - La función a llamar cuando se hace clic en el botón.
 * @param {string} props.guisado - El nombre del guisado para mostrar en el botón.
 */

function ClickerButton({ onVenderTaco, guisado }) {
  return <button onClick={onVenderTaco}>Vender Taco de {guisado}</button>;
}

export default ClickerButton;
