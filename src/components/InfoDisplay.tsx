// src/components/InfoDisplay.tsx
import React from 'react';

interface InfoDisplayProps {
  level: number;
  boardSize: number;
  requiredTaps: number;
  onHelpClick?: () => void;
  onLevelClick?: () => void;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ level, boardSize, requiredTaps, onHelpClick, onLevelClick }) => {
  return (
    <div
      className="flex-1 bg-stone-dark/70 p-4 rounded-lg text-center shadow-inner-strong cursor-pointer hover:bg-stone-dark/90 transition-colors"
      onClick={onHelpClick}
      title="タップで遊び方を表示"
    >
      <div className="flex justify-around items-center gap-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onLevelClick?.();
          }}
          className="cursor-pointer hover:bg-stone-light/10 rounded-lg px-3 py-1 transition-colors"
          title="タップでレベル構成を表示"
        >
          <p className="text-sm text-stone-light/80">レベル</p>
          <p className="text-2xl font-bold text-stone-light">{level}</p>
        </div>
        <div>
          <p className="text-sm text-stone-light/80">サイズ</p>
          <p className="text-2xl font-bold text-stone-light">{`${boardSize}x${boardSize}`}</p>
        </div>
        <div>
          <p className="text-sm text-stone-light/80">規定タップ</p>
          <p className="text-2xl font-bold text-stone-light">{requiredTaps}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
