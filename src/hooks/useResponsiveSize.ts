// src/hooks/useResponsiveSize.ts
import { useState, useEffect } from 'react';

interface ResponsiveSize {
  panelSize: number;
  gap: number;
  isLandscape: boolean;
}

export const useResponsiveSize = (boardSize: number): ResponsiveSize => {
  const [sizes, setSizes] = useState<ResponsiveSize>({
    panelSize: 48,
    gap: 6,
    isLandscape: false,
  });

  useEffect(() => {
    const calculateSizes = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // 横長判定: 幅 > 高さ（アスペクト比1:1を下回った場合）
      const isLandscape = vw > vh;

      const gapSize = 6;
      const gapTotal = (boardSize - 1) * gapSize;
      const paddingTotal = 16;

      let panelSize: number;

      if (isLandscape) {
        // 横長レイアウト
        // 上部: InfoDisplay + Controls (約70px)
        // mb-8: 32px
        // padding: pt-4(16px) + pb-16(64px) = 80px
        // ラベル: 20px
        const fixedHeight = 70 + 32 + 80 + 20;
        const availableHeight = vh - fixedHeight;

        // 幅は2つの盤面 + 間隔(40px = gap-10) + 左右padding(32px)
        const boardSpacing = 40;
        const availableWidthPerBoard = (vw - 32 - boardSpacing) / 2;

        const maxPanelFromHeight = (availableHeight - gapTotal - paddingTotal) / boardSize;
        const maxPanelFromWidth = (availableWidthPerBoard - gapTotal - paddingTotal) / boardSize;
        panelSize = Math.floor(Math.min(maxPanelFromHeight, maxPanelFromWidth));
      } else {
        // 縦長レイアウト
        // InfoDisplay: 約70px + mb-4: 16px
        // 目標盤面ラベル: 約24px + mb-4: 16px
        // 操作盤面ラベル: 約24px + mt-4: 16px
        // Controls: 約70px + mt-4: 16px
        // padding: pt-4(16px) + pb-24(96px) = 112px
        const fixedHeight = 70 + 16 + 24 + 16 + 24 + 16 + 70 + 16 + 112;
        const availableHeight = vh - fixedHeight;
        const boardHeight = availableHeight / 2;

        // 横幅制限を撤廃
        const availableWidth = vw - 32;

        const maxPanelFromHeight = (boardHeight - gapTotal - paddingTotal) / boardSize;
        const maxPanelFromWidth = (availableWidth - gapTotal - paddingTotal) / boardSize;
        panelSize = Math.floor(Math.min(maxPanelFromHeight, maxPanelFromWidth));
      }

      setSizes({
        panelSize: Math.max(panelSize, 28),
        gap: gapSize,
        isLandscape,
      });
    };

    calculateSizes();
    window.addEventListener('resize', calculateSizes);
    return () => window.removeEventListener('resize', calculateSizes);
  }, [boardSize]);

  return sizes;
};
