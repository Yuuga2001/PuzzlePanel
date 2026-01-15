// src/components/Panel.tsx
import React from 'react';
import type { PanelState } from '@/lib/gameLogic';

interface PanelProps {
  state: PanelState;
  onClick: () => void;
  disabled?: boolean;
}

const Panel: React.FC<PanelProps> = ({ state, onClick, disabled }) => {
  return (
    <div className="perspective w-12 h-12 md:w-16 md:h-16" onClick={!disabled ? onClick : undefined}>
        <div className={`panel ${state === 'X' ? 'panel-flipped' : ''}`}>
            {/* Front Face (O) */}
            <div className="panel-face panel-front bg-stone-light text-symbol-dark shadow-inner-strong rounded-md">
                <span>○</span>
            </div>
            {/* Back Face (X) */}
            <div className="panel-face panel-back bg-stone-dark text-symbol-light shadow-inner-strong rounded-md">
                <span>×</span>
            </div>
        </div>
    </div>
  );
};

export default Panel;
