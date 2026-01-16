// src/hooks/useResponsiveSize.ts
import { useState, useEffect } from 'react';

interface ResponsiveSize {
  panelSize: number;
  gap: number;
}

export const useResponsiveSize = (boardSize: number): ResponsiveSize => {
  const [sizes, setSizes] = useState<ResponsiveSize>({
    panelSize: 48,
    gap: 6,
  });

  useEffect(() => {
    const calculateSizes = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // 各要素の高さを概算（padding含む）
      // InfoDisplay: 約70px
      // 目標盤面ラベル: 約20px
      // 操作盤面ラベル: 約20px
      // Controls: 約70px
      // padding: 24px (p-3 * 2)
      // 余白: 約40px
      const fixedHeight = 70 + 20 + 20 + 70 + 24 + 40;

      // 残りの高さを2つの盤面で均等に分配
      const availableHeight = vh - fixedHeight;
      const boardHeight = availableHeight / 2;

      // 幅の制約も考慮（画面幅 - padding）
      const availableWidth = Math.min(vw - 24, 400);

      // パネルサイズを計算
      const gapSize = 6;
      const gapTotal = (boardSize - 1) * gapSize;
      const paddingTotal = 16;
      const maxPanelFromHeight = (boardHeight - gapTotal - paddingTotal) / boardSize;
      const maxPanelFromWidth = (availableWidth - gapTotal - paddingTotal) / boardSize;
      const panelSize = Math.floor(Math.min(maxPanelFromHeight, maxPanelFromWidth, 56));

      setSizes({
        panelSize: Math.max(panelSize, 28),
        gap: gapSize,
      });
    };

    calculateSizes();
    window.addEventListener('resize', calculateSizes);
    return () => window.removeEventListener('resize', calculateSizes);
  }, [boardSize]);

  return sizes;
};
