// src/components/GameBoard.tsx
import React from 'react';
import type { Board } from '@/lib/gameLogic';
import Panel from './Panel';

interface GameBoardProps {
  board: Board;
  onPanelClick?: (row: number, col: number) => void;
  disabled?: boolean;
  isTarget?: boolean;
  panelSize?: number;
  gap?: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onPanelClick,
  disabled,
  isTarget,
  panelSize = 48,
  gap = 8,
}) => {
  const gridSize = board.length;

  const boardStyle = isTarget
    ? "bg-stone-dark/50 rounded-lg shadow-inner"
    : "bg-stone-dark/80 rounded-lg shadow-inner-strong";

  const padding = isTarget ? 8 : 12;

  return (
    <div
      className={boardStyle}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        padding: `${padding}px`,
      }}
    >
      {board.map((row, r_idx) =>
        row.map((panelState, c_idx) => (
          <Panel
            key={`${r_idx}-${c_idx}`}
            state={panelState}
            onClick={() => onPanelClick && onPanelClick(r_idx, c_idx)}
            disabled={disabled}
            size={panelSize}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
