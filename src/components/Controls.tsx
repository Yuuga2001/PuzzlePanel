// src/components/Controls.tsx
import React from 'react';

interface ControlsProps {
  tapsLeft: number;
  onEndGame: () => void;
}

const Controls: React.FC<ControlsProps> = ({ tapsLeft, onEndGame }) => {
  return (
    <div className="w-full max-w-md flex justify-between items-center bg-stone-dark/70 p-4 rounded-lg shadow-inner-strong">
      <div>
        <p className="text-sm text-stone-light/80">残りタップ数</p>
        <p className="text-3xl font-bold text-stone-light">　{tapsLeft}</p>
      </div>
      <button
        onClick={onEndGame}
        className="px-6 py-3 bg-red-800/80 hover:bg-red-700/80 border border-red-500/50 rounded-lg text-white font-bold transition-colors shadow-lg"
      >
        終了する
      </button>
    </div>
  );
};

export default Controls;
