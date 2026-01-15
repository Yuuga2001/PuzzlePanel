// src/components/HowToPlayModal.tsx
import React from 'react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-30 p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-dark p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-stone-light mb-4 text-center">遊び方</h2>

        <div className="space-y-4 text-stone-light/90">
          <div>
            <h3 className="font-bold text-stone-light mb-1">1. 目標を確認</h3>
            <p className="text-sm">画面上部の「目標盤面」の形を覚えます。</p>
          </div>

          <div>
            <h3 className="font-bold text-stone-light mb-1">2. パネルをタップ</h3>
            <p className="text-sm">「操作盤面」のパネルをタップして、形を揃えていきます。</p>
          </div>

          <div>
            <h3 className="font-bold text-stone-light mb-1">3. 反転ルール</h3>
            <p className="text-sm">
              パネルを1回タップすると、タップしたパネルと
              <span className="text-stone-light font-bold">周囲8マス（合計9マス）</span>
              が同時に反転（○ ⇔ ×）します。
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-light mb-1">4. クリア条件</h3>
            <p className="text-sm">
              「規定タップ回数」を<span className="text-stone-light font-bold">ちょうど</span>使い切った時に、
              「操作盤面」が「目標盤面」と完全に一致すればクリアです。
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-blue-700/80 hover:bg-blue-600/80 border border-blue-500/50 rounded-lg text-white font-bold transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
