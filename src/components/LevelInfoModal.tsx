// src/components/LevelInfoModal.tsx
import React from 'react';

interface LevelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
}

const stageData = [
  { stage: 1, levels: '1-5', size: '4x4', taps: 1, count: 5 },
  { stage: 2, levels: '6-20', size: '4x4', taps: 2, count: 15 },
  { stage: 3, levels: '21-30', size: '5x5', taps: 3, count: 10 },
  { stage: 4, levels: '31-40', size: '5x5', taps: 4, count: 10 },
  { stage: 5, levels: '41-50', size: '6x6', taps: 5, count: 10 },
  { stage: 6, levels: '51-60', size: '6x6', taps: 6, count: 10 },
  { stage: 7, levels: '61-70', size: '7x7', taps: 7, count: 10 },
  { stage: 8, levels: '71-80', size: '7x7', taps: 8, count: 10 },
  { stage: 9, levels: '81-90', size: '8x8', taps: 9, count: 10 },
  { stage: 10, levels: '91-100', size: '8x8', taps: 10, count: 10 },
];

const getCurrentStageIndex = (level: number): number => {
  if (level <= 5) return 0;
  if (level <= 20) return 1;
  if (level <= 30) return 2;
  if (level <= 40) return 3;
  if (level <= 50) return 4;
  if (level <= 60) return 5;
  if (level <= 70) return 6;
  if (level <= 80) return 7;
  if (level <= 90) return 8;
  return 9;
};

const LevelInfoModal: React.FC<LevelInfoModalProps> = ({ isOpen, onClose, currentLevel }) => {
  if (!isOpen) return null;

  const currentStageIndex = getCurrentStageIndex(currentLevel);

  return (
    <div
      className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-dark p-4 md:p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl md:text-2xl font-bold text-stone-light text-center mb-4">
          レベル構成
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="text-stone-light/80 border-b border-stone-light/30">
                <th className="py-2 px-1 md:px-2 text-center">ST</th>
                <th className="py-2 px-1 md:px-2 text-center">Lv</th>
                <th className="py-2 px-1 md:px-2 text-center">盤面</th>
                <th className="py-2 px-1 md:px-2 text-center">タップ</th>
                <th className="py-2 px-1 md:px-2 text-center">問題数</th>
              </tr>
            </thead>
            <tbody>
              {stageData.map((row, index) => (
                <tr
                  key={row.stage}
                  className={`border-b border-stone-light/20 ${
                    index === currentStageIndex
                      ? 'bg-blue-700/40 text-stone-light font-bold'
                      : 'text-stone-light/70'
                  }`}
                >
                  <td className="py-2 px-1 md:px-2 text-center">{row.stage}</td>
                  <td className="py-2 px-1 md:px-2 text-center">{row.levels}</td>
                  <td className="py-2 px-1 md:px-2 text-center">{row.size}</td>
                  <td className="py-2 px-1 md:px-2 text-center">{row.taps}回</td>
                  <td className="py-2 px-1 md:px-2 text-center">{row.count}問</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-600/80 hover:bg-gray-500/80 border border-gray-400/50 rounded-lg text-white font-bold transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default LevelInfoModal;
