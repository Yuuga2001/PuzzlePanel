"use client";

import { useState, useEffect } from 'react';
import Controls from '@/components/Controls';
import GameBoard from '@/components/GameBoard';
import InfoDisplay from '@/components/InfoDisplay';
import ConfirmModal from '@/components/ConfirmModal';
import { generateProblem, flipPanels, areBoardsEqual, getStageForLevel } from '@/lib/gameLogic';
import type { Problem, Board } from '@/lib/gameLogic';

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


const siteUrl = "https://puzzle-panel.example.com"; // TODO: 本番環境のドメインに変更してください

const JsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Puzzle Panel (パズルパネル)",
    "url": siteUrl,
    "description": "A brain-teasing puzzle game with an ancient Egyptian theme. Flip the stone panels to match the target pattern in a set number of moves. | 古代エジプトがテーマの、シンプルで奥深いロジカルパズルゲーム。石板を反転させ、規定回数内に目標の模様を完成させよう。",
    "inLanguage": ["en", "ja"],
    "applicationCategory": "Game",
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
      "price": "0"
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

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-4 space-y-4 md:space-y-6">
      <JsonLd />
      <ConfirmModal 
        isOpen={isConfirmModalOpen}
        onConfirm={confirmEndGame}
        onCancel={cancelEndGame}
        message="本当にゲームを終了しますか？"
      />
      {(gameState === 'cleared' || gameState === 'failed') && <GameStatusOverlay status={gameState} />}
      
      <InfoDisplay
        level={problem.level}
        boardSize={problem.size}
        requiredTaps={problem.requiredTaps}
      />

      <div className="text-center">
        <p className="text-sm text-stone-light/70">目標盤面</p>
        <GameBoard board={problem.targetBoard} disabled={true} isTarget={true} />
      </div>

      <div className="text-center">
        <p className="text-sm text-stone-light/70">操作盤面</p>
        <GameBoard
          board={currentBoard}
          onPanelClick={handlePanelClick}
          disabled={gameState !== 'playing'}
        />
      </div>

      <Controls tapsLeft={tapsLeft} onEndGame={handleEndGame} />
    </main>
  );
}
