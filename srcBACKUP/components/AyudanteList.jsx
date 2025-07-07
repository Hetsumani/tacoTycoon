import React from "react";
import Ayudante from "./Ayudante";

/**
 * Renderiza una lista de componentes Ayudante.
 */

function AyudanteList({ayudantes, onComprarAyudante, dinero, titulo}){
    return(
        <div className="upgrade-list"> {/*Reutilizamos la clase CSS*/}
            <h3>{titulo}</h3>
            {ayudantes.map((ayudante) => (
                <Ayudante 
                    key={ayudante.id}
                    nombre={ayudante.nombre}
                    nivel={ayudante.nivel}
                    costo={ayudante.costo}
                    descripcion={ayudante.descripcion}
                    onComprar={() => onComprarAyudante(ayudante.id)}
                    estaDeshabilitado={dinero < ayudante.costo}
                />
            ))}
        </div>
    );
}

export default AyudanteList;