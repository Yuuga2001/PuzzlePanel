// src/components/Panel.tsx
import React from 'react';
import type { PanelState } from '@/lib/gameLogic';

interface PanelProps {
  state: PanelState;
  onClick: () => void;
  disabled?: boolean;
  size?: number;
}

const Panel: React.FC<PanelProps> = ({ state, onClick, disabled, size = 48 }) => {
  const fontSize = Math.max(size * 0.5, 12);

  return (
    <div
      className="perspective"
      style={{ width: size, height: size }}
      onClick={!disabled ? onClick : undefined}
    >
        <div className={`panel ${state === 'X' ? 'panel-flipped' : ''}`}>
            {/* Front Face (O) */}
            <div
              className="panel-face panel-front bg-stone-light text-symbol-dark shadow-inner-strong rounded-md"
              style={{ fontSize }}
            >
                <span>○</span>
            </div>
            {/* Back Face (X) */}
            <div
              className="panel-face panel-back bg-stone-dark text-symbol-light shadow-inner-strong rounded-md"
              style={{ fontSize }}
            >
                <span>×</span>
            </div>
        </div>
    </div>
  );
};

export default Panel;
