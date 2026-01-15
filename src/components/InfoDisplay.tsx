// src/components/InfoDisplay.tsx
import React from 'react';

interface InfoDisplayProps {
  level: number;
  boardSize: number;
  requiredTaps: number;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ level, boardSize, requiredTaps }) => {
  return (
    <div className="w-full max-w-md bg-stone-dark/70 p-4 rounded-lg text-center shadow-inner-strong">
      <div className="flex justify-around items-center">
        <div>
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
