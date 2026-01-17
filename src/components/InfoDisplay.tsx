// src/components/InfoDisplay.tsx
import React from 'react';

interface InfoDisplayProps {
  level: number;
  boardSize: number;
  tapsLeft: number;
  onHelpClick?: () => void;
  onLevelClick?: () => void;
  onEndGame?: () => void;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ level, boardSize, tapsLeft, onHelpClick, onLevelClick, onEndGame }) => {
  return (
    <div
      className="flex-1 bg-stone-dark/70 px-3 py-2 rounded-lg text-center shadow-inner-strong cursor-pointer hover:bg-stone-dark/90 transition-colors"
      onClick={onHelpClick}
      title="タップで遊び方を表示"
    >
      <div className="flex justify-around items-center gap-2">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onLevelClick?.();
          }}
          className="cursor-pointer hover:bg-stone-light/10 rounded px-2 py-0.5 transition-colors"
          title="タップでレベル構成を表示"
        >
          <p className="text-xs text-stone-light/80">Lv</p>
          <p className="text-lg font-bold text-stone-light">{level}</p>
        </div>
        <div>
          <p className="text-xs text-stone-light/80">サイズ</p>
          <p className="text-lg font-bold text-stone-light">{`${boardSize}x${boardSize}`}</p>
        </div>
        <div>
          <p className="text-xs text-stone-light/80">残り</p>
          <p className="text-lg font-bold text-stone-light">{tapsLeft}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEndGame?.();
          }}
          className="px-2 py-1 text-xs bg-stone-dark/50 hover:bg-red-800/60 border border-stone-light/30 rounded text-stone-light/70 hover:text-white transition-colors"
        >
          終了
        </button>
      </div>
    </div>
  );
};

export default InfoDisplay;
