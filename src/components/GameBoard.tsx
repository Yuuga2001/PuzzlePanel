// src/components/GameBoard.tsx
import React from 'react';
import type { Board } from '@/lib/gameLogic';
import Panel from './Panel';

interface GameBoardProps {
  board: Board;
  onPanelClick?: (row: number, col: number) => void;
  disabled?: boolean;
  isTarget?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onPanelClick, disabled, isTarget }) => {
  const gridSize = board.length;

  const boardStyle = isTarget
    ? "bg-stone-dark/50 p-2 md:p-3 rounded-lg shadow-inner"
    : "bg-stone-dark/80 p-2 md:p-4 rounded-lg shadow-inner-strong";

  return (
    <div
      className={boardStyle}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gap: '8px',
      }}
    >
      {board.map((row, r_idx) =>
        row.map((panelState, c_idx) => (
          <Panel
            key={`${r_idx}-${c_idx}`}
            state={panelState}
            onClick={() => onPanelClick && onPanelClick(r_idx, c_idx)}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
