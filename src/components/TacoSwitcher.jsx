import React from "react";

const TacoSwitcher = ({ tacos, currentTacoId, onSwitch }) => {
  return (
    <div className="flex flex-wrap gap-2 my-4 justify-center">
      {Object.entries(tacos).map(([tacoId, taco]) => (
        <button
          key={tacoId}
          onClick={() => onSwitch(tacoId)}
          disabled={!taco.unlocked}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition-all
            ${currentTacoId === tacoId
              ? "bg-yellow-400 text-black"
              : taco.unlocked
              ? "bg-white hover:bg-yellow-200"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {taco.name}
        </button>
      ))}
    </div>
  );
};

export default TacoSwitcher;
