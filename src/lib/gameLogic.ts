// src/lib/gameLogic.ts

// --- 型定義 ---
export type PanelState = 'O' | 'X'; // O: 表, X: 裏
export type Board = PanelState[][];

export interface Problem {
  level: number;
  size: number;
  initialBoard: Board;
  targetBoard: Board;
  requiredTaps: number;
}

/**
 * 指定された座標のパネルと、その周囲のパネルを反転させる
 * @param board - 現在の盤面
 * @param row - タップされた行
 * @param col - タップされた列
 * @returns 新しい盤面
 */
export const flipPanels = (board: Board, row: number, col: number): Board => {
  const newBoard = board.map(r => [...r]);
  const size = newBoard.length;

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < size && c >= 0 && c < size) {
        newBoard[r][c] = newBoard[r][c] === 'O' ? 'X' : 'O';
      }
    }
  }
  return newBoard;
};

/**
 * 2つの盤面が一致するかどうかを判定する
 * @param board1 - 盤面1
 * @param board2 - 盤面2
 * @returns 一致する場合は true
 */
export const areBoardsEqual = (board1: Board, board2: Board): boolean => {
  if (board1.length !== board2.length) return false;
  for (let i = 0; i < board1.length; i++) {
    if (board1[i].length !== board2[i].length) return false;
    for (let j = 0; j < board1[i].length; j++) {
      if (board1[i][j] !== board2[i][j]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * 新しい問題を生成する
 * @param level - 現在のレベル (1から)
 * @returns 生成された問題オブジェクト
 */

interface Stage {
  size: number;
  taps: number;
  levels: number;
}

const stages: Stage[] = [
    { size: 4, taps: 1, levels: 10 }, // Lv 1-10
    { size: 4, taps: 2, levels: 10 }, // Lv 11-20
    { size: 5, taps: 1, levels: 10 }, // Lv 21-30
    { size: 5, taps: 2, levels: 10 }, // Lv 31-40
    { size: 6, taps: 2, levels: 10 }, // Lv 41-50
    { size: 6, taps: 3, levels: 10 }, // Lv 51-60
    { size: 7, taps: 3, levels: 10 }, // Lv 61-70
    { size: 7, taps: 4, levels: 10 }, // Lv 71-80
    { size: 8, taps: 3, levels: 10 }, // Lv 81-90
    { size: 8, taps: 4, levels: 10 }, // Lv 91-100
];

export const getStageForLevel = (level: number): number => {
    if (level <= 0) return 0;
    let tempLevel = level;
    let stageNumber = 1;
    for (const stage of stages) {
        if (tempLevel <= stage.levels) {
            return stageNumber;
        }
        tempLevel -= stage.levels;
        stageNumber++;
    }
    return stageNumber; // For levels beyond the defined stages
};

export const generateProblem = (level: number): Problem => {
  let size: number = 4;
  let requiredTaps: number = 1;

  let tempLevel = level;
  for (const stage of stages) {
    if (tempLevel <= stage.levels) {
      size = stage.size;
      requiredTaps = stage.taps;
      break;
    }
    tempLevel -= stage.levels;
  }

  // If level exceeds defined stages, extrapolate
  if (tempLevel > 0) {
      size = 6 + Math.floor((level - 100) / 10);
      requiredTaps = 1 + ((level - 100) % 5);
      if (size > 9) size = 9; // Max size
      if (size < 4) size = 4; // Min size
  }

  // 1. 全て 'O' の目標盤面を作成
  let targetBoard: Board = Array(size).fill(0).map(() => Array(size).fill('O'));
  
  // 2. 規定回数タップして初期盤面を生成する
  let currentBoard = targetBoard;
  const tapHistory: {row: number, col: number}[] = [];

  for (let i = 0; i < requiredTaps; i++) {
    // 同じ場所を2回タップしないように、簡易的な重複チェック
    let row: number, col: number;
    do {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    } while (tapHistory.some(t => t.row === row && t.col === col));
    
    tapHistory.push({ row, col });
    currentBoard = flipPanels(currentBoard, row, col);
  }

  // 3. 目標盤面が複雑になるように、少しランダムに反転させる
  // これにより、同じ設定（サイズ、タップ数）でも異なる問題が生成される
  let initialBoard = currentBoard;
  const complexity = Math.floor(Math.random() * (size / 2)); // 盤面サイズに応じた複雑性
  for(let i=0; i < complexity; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    initialBoard = flipPanels(initialBoard, row, col);
    targetBoard = flipPanels(targetBoard, row, col);
  }


  return {
    level,
    size,
    initialBoard,
    targetBoard,
    requiredTaps,
  };
};

