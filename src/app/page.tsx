"use client";

import { useState, useEffect } from 'react';
import Controls from '@/components/Controls';
import GameBoard from '@/components/GameBoard';
import InfoDisplay from '@/components/InfoDisplay';
import ConfirmModal from '@/components/ConfirmModal';
import HowToPlayModal from '@/components/HowToPlayModal';
import LevelInfoModal from '@/components/LevelInfoModal';
import { generateProblem, flipPanels, areBoardsEqual, getStageForLevel } from '@/lib/gameLogic';
import type { Problem, Board } from '@/lib/gameLogic';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';

type GameState = 'loading' | 'playing' | 'cleared' | 'failed' | 'finished';

const GameStatusOverlay: React.FC<{ status: 'cleared' | 'failed' }> = ({ status }) => {
    const isCleared = status === 'cleared';
    const message = isCleared ? "クリア" : "失敗";
    const style = isCleared 
        ? "text-blue-400 bg-blue-900/80" 
        : "text-red-400 bg-red-900/80";

    return (
        <div className={`absolute inset-0 flex items-center justify-center ${style} z-10`}>
            <h2 className="text-6xl font-bold animate-pulse">{message}</h2>
        </div>
    );
};


const siteUrl = "https://puzzlepanel.riverapp.jp";

const JsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Puzzle Panel (パズルパネル)",
    "url": siteUrl,
    "description": "A brain-teasing puzzle game with an ancient Egyptian theme. Flip the stone panels to match the target pattern in a set number of moves. | シンプルで奥深いロジカルパズルゲーム。石板を反転させ、規定回数内に目標の模様を完成させよう。",
    "inLanguage": ["en", "ja"],
    "applicationCategory": "Game",
    "genre": ["Puzzle", "Logic", "Brain Teaser"],
    "gamePlatform": "WebBrowser",
    "operatingSystem": "Any",
    "screenshot": `${siteUrl}/screenshot.png`,
    "image": `${siteUrl}/og-image.png`,
    "author": {
      "@type": "Organization",
      "name": "Puzzle Panel Project"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY",
      "availability": "https://schema.org/InStock"
    },
    "playMode": "SinglePlayer"
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};


export default function Home() {
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [tapsLeft, setTapsLeft] = useState(0);
  const [totalFailedAttempts, setTotalFailedAttempts] = useState(0);
  const [gameState, setGameState] = useState<GameState>('loading');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isLevelInfoOpen, setIsLevelInfoOpen] = useState(false);

  const { panelSize, gap, isLandscape } = useResponsiveSize(problem?.size ?? 4);

  // 新しい問題を読み込む関数
  const loadProblem = (newLevel: number) => {
    setGameState('loading');
    const newProblem = generateProblem(newLevel);
    setProblem(newProblem);
    setCurrentBoard(newProblem.initialBoard);
    setTapsLeft(newProblem.requiredTaps);
    setLevel(newLevel);
    setGameState('playing');
  };

  // 初期化
  useEffect(() => {
    loadProblem(1);
  }, []);

  // 成功・失敗判定
  useEffect(() => {
    if (gameState === 'playing' && tapsLeft === 0 && problem && currentBoard) {
      const isSuccess = areBoardsEqual(currentBoard, problem.targetBoard);

      if (isSuccess) {
        setGameState('cleared');
        setTimeout(() => {
          loadProblem(level + 1);
        }, 1500); // 1.5秒後に次の問題へ
      } else {
        setGameState('failed');
        setTotalFailedAttempts(prev => prev + 1);
        setTimeout(() => {
          setCurrentBoard(problem.initialBoard);
          setTapsLeft(problem.requiredTaps);
          setGameState('playing');
        }, 1500); // 1.5秒後にリセット
      }
    }
  }, [tapsLeft, gameState, currentBoard, problem, level]);


  // パネルクリック時の処理
  const handlePanelClick = (row: number, col: number) => {
    if (gameState !== 'playing' || !currentBoard || tapsLeft <= 0) return;

    const newBoard = flipPanels(currentBoard, row, col);
    setCurrentBoard(newBoard);
    setTapsLeft(prev => prev - 1);
  };
  
  // 確認モーダルを開く
  const handleEndGame = () => {
    setIsConfirmModalOpen(true);
  };

  // ゲームを実際に終了する
  const confirmEndGame = () => {
    setGameState('finished');
    setIsConfirmModalOpen(false);
  }

  // 終了をキャンセルする
  const cancelEndGame = () => {
    setIsConfirmModalOpen(false);
  }

  if (gameState === 'loading' || !problem || !currentBoard) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <JsonLd />
        <h1 className="text-4xl font-bold">パズルパネル</h1>
        <p className="mt-2">問題を生成中...</p>
      </main>
    );
  }
  
  if (gameState === 'finished') {
    const lastClearedLevel = Math.max(0, level - 1);
    const lastClearedStage = getStageForLevel(lastClearedLevel);

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-background">
        <JsonLd />
        <div className="bg-stone-dark/70 p-8 rounded-lg shadow-inner-strong space-y-6">
            <h2 className="text-3xl text-stone-light font-bold">結果</h2>
            <div className="text-xl space-y-4 text-stone-light/90">
                <p>最後にクリアしたステージ: {lastClearedStage > 0 ? lastClearedStage : 'なし'}</p>
                <p>最後にクリアしたレベル: {lastClearedLevel}</p>
                <p>総失敗回数: {totalFailedAttempts}</p>
            </div>
            <button 
                onClick={() => {
                    setTotalFailedAttempts(0);
                    loadProblem(1);
                }} 
                className="mt-8 px-6 py-3 bg-blue-700/80 hover:bg-blue-600/80 border border-blue-500/50 rounded-lg text-white font-bold transition-colors shadow-lg">
                もう一度最初から
            </button>
        </div>
      </main>
    )
  }

  if (isLandscape) {
    // 横長レイアウト
    return (
      <main className="relative flex h-screen max-h-screen flex-col pt-4 px-4 pb-16 overflow-hidden">
        <JsonLd />
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onConfirm={confirmEndGame}
          onCancel={cancelEndGame}
          message="本当にゲームを終了しますか？"
        />
        <HowToPlayModal
          isOpen={isHowToPlayOpen}
          onClose={() => setIsHowToPlayOpen(false)}
        />
        <LevelInfoModal
          isOpen={isLevelInfoOpen}
          onClose={() => setIsLevelInfoOpen(false)}
          currentLevel={level}
        />
        {(gameState === 'cleared' || gameState === 'failed') && <GameStatusOverlay status={gameState} />}

        {/* 上部: InfoDisplay と Controls を横並び */}
        <div className="w-full flex items-stretch gap-4 mb-8">
          <InfoDisplay
            level={problem.level}
            boardSize={problem.size}
            requiredTaps={problem.requiredTaps}
            onHelpClick={() => setIsHowToPlayOpen(true)}
            onLevelClick={() => setIsLevelInfoOpen(true)}
          />
          <Controls tapsLeft={tapsLeft} onEndGame={handleEndGame} />
        </div>

        {/* 下部: 2つの盤面を横並び */}
        <div className="flex-1 flex justify-center items-center gap-10">
          <div
            className="text-center cursor-pointer"
            onClick={() => setIsHowToPlayOpen(true)}
            title="タップで遊び方を表示"
          >
            <p className="text-xs text-stone-light/70 mb-1">目標盤面</p>
            <GameBoard
              board={problem.targetBoard}
              disabled={true}
              isTarget={true}
              panelSize={panelSize}
              gap={gap}
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-stone-light/70 mb-1">操作盤面</p>
            <GameBoard
              board={currentBoard}
              onPanelClick={handlePanelClick}
              disabled={gameState !== 'playing'}
              panelSize={panelSize}
              gap={gap}
            />
          </div>
        </div>
      </main>
    );
  }

  // 縦長レイアウト
  return (
    <main className="relative flex h-screen max-h-screen flex-col items-center justify-between pt-4 px-4 pb-24 overflow-hidden">
      <JsonLd />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={confirmEndGame}
        onCancel={cancelEndGame}
        message="本当にゲームを終了しますか？"
      />
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
      <LevelInfoModal
        isOpen={isLevelInfoOpen}
        onClose={() => setIsLevelInfoOpen(false)}
        currentLevel={level}
      />
      {(gameState === 'cleared' || gameState === 'failed') && <GameStatusOverlay status={gameState} />}

      <div className="w-full mb-4">
        <InfoDisplay
          level={problem.level}
          boardSize={problem.size}
          requiredTaps={problem.requiredTaps}
          onHelpClick={() => setIsHowToPlayOpen(true)}
          onLevelClick={() => setIsLevelInfoOpen(true)}
        />
      </div>

      <div
        className="text-center cursor-pointer mb-4"
        onClick={() => setIsHowToPlayOpen(true)}
        title="タップで遊び方を表示"
      >
        <p className="text-sm text-stone-light/70 mb-2">目標盤面</p>
        <GameBoard
          board={problem.targetBoard}
          disabled={true}
          isTarget={true}
          panelSize={panelSize}
          gap={gap}
        />
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-stone-light/70 mb-2">操作盤面</p>
        <GameBoard
          board={currentBoard}
          onPanelClick={handlePanelClick}
          disabled={gameState !== 'playing'}
          panelSize={panelSize}
          gap={gap}
        />
      </div>

      <div className="w-full mt-4">
        <Controls tapsLeft={tapsLeft} onEndGame={handleEndGame} />
      </div>
    </main>
  );
}
