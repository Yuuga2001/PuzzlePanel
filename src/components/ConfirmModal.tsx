// src/components/ConfirmModal.tsx
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="bg-stone-dark p-8 rounded-lg shadow-lg text-center">
        <p className="text-lg text-stone-light mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-red-800/80 hover:bg-red-700/80 border border-red-500/50 rounded-lg text-white font-bold transition-colors"
          >
            はい
          </button>
          <button
            onClick={onCancel}
            className="px-8 py-3 bg-gray-600/80 hover:bg-gray-500/80 border border-gray-400/50 rounded-lg text-white font-bold transition-colors"
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
