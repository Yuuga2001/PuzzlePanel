# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # プロダクションビルド
npm run lint     # ESLintでコードチェック
npm run start    # プロダクションサーバー起動
```

## Architecture

パズルゲーム。パネルをタップして目標の盤面パターンを作成する。

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

### Project Structure

```
src/
├── app/
│   ├── layout.tsx    # RootLayout、メタデータ、SEO設定
│   └── page.tsx      # メインゲーム画面、ゲーム状態管理
├── components/
│   ├── GameBoard.tsx # 盤面のグリッド表示
│   ├── Panel.tsx     # 個別パネル（O/X状態）
│   ├── Controls.tsx  # 残りタップ数、終了ボタン
│   ├── InfoDisplay.tsx    # レベル・盤面サイズ表示
│   └── ConfirmModal.tsx   # 終了確認モーダル
└── lib/
    └── gameLogic.ts  # ゲームロジック（問題生成、パネル反転、判定）
```

### Game Logic (gameLogic.ts)

- `PanelState`: `'O'`（表）または `'X'`（裏）
- `flipPanels()`: タップした座標とその周囲8マス（3x3）を反転
- `generateProblem()`: レベルに応じた問題生成（目標盤面から逆算して初期盤面を作成）
- `stages[]`: レベル進行に応じた盤面サイズ(4-8)とタップ数(1-4)の定義

### Game States
`'loading' | 'playing' | 'cleared' | 'failed' | 'finished'`

### Custom Colors (Tailwind)
- `stone-light`: #d4b483（黄土色パネル）
- `stone-dark`: #3a3a3a（暗い石板）
- `background`: #2a2a2a（神殿の背景）
