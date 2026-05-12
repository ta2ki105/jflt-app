# JFLT Training

NATO英語能力試験 (JFLT) 対策アプリ — Reading / Listening / Vocabulary / Grammar の **350問** + JFLT 公式形式の採点モード。

## 技術スタック

- React 18 + Vite
- Tailwind CSS 3
- Google Cloud Text-to-Speech (en-GB)
- LocalStorage (統計・APIキー永続化)

## セットアップ

Node.js 18以上が必要です。

```bash
cd jflt-app
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

ビルド:

```bash
npm run build
npm run preview
```

## 機能

| タブ | 内容 |
|------|------|
| 📝 問題 | カテゴリ × レベルで自由に練習。クリックで自動採点・解説表示。 |
| 🎖️ 採点 | JFLT 公式形式 (15問×4セクション、適応進行) で実力測定 → SLPスコア表示。履歴保存。 |
| 📊 統計 | JFLT 採点基準に基づく総合スコア + セクション別 + レベル別の進捗。 |
| ⚙️ 設定 | Google Cloud APIキーの登録、テスト再生、セットアップガイド。 |

## 問題セット (350問)

| Skill | L1 | L2 | L3 | L4 | 合計 | ファイル |
|---|---:|---:|---:|---:|---:|---|
| Reading | 35 | 55 | 35 | 15 | **140** | `src/reading-complete.js` |
| Listening | 15 | 35 | 25 | 15 | **90** | `src/listening-complete.js` |
| Vocab | 15 | 15 | 15 | 15 | **60** | `src/vocab-data.js` |
| Grammar | 15 | 15 | 15 | 15 | **60** | `src/grammar-data.js` |

`src/data.js` は上記4ファイルから再エクスポートするバレルファイルです。
全レベル 15 問以上を確保しているため、JFLT 公式形式 (15問×4セクション) の採点モードが
全スキルで実施可能です。

## JFLT 採点基準

| 1レベルあたり正解数 | 評価 | スコア例 |
|---:|---|---|
| **10 問以上** | そのレベル合格 → 上位レベルへ | L1 で10+正解 → `1` |
| **7〜9 問** | 前のレベル + `+` | L2 で 7-9 正解 → `1+` |
| **0〜6 問** | 前のレベル | L2 で 6 以下 → `1` |

総合 JFLT スコアは **4セクションの最低値** で算出されます。

ロジック実装: `src/scoring.js`

## 音声機能

Reading / Listening 問題の本文を Google Cloud TTS (en-GB-Neural2-A) で読み上げます。

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. **Cloud Text-to-Speech API** を有効化
3. 「認証情報」から APIキーを作成
4. アプリの ⚙️ 設定タブで APIキーを保存

> APIキーはブラウザの LocalStorage にのみ保存され、外部サーバーには送信されません。

## 問題追加

新しい問題を追加する手順は [QUESTION_FLOW.md](./QUESTION_FLOW.md) を参照してください。

## ファイル構成

```
jflt-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── QUESTION_FLOW.md         問題追加フロー
├── PROMPTS.md               問題生成プロンプト集
├── scripts/
│   ├── dedup.ps1            重複検出ヘルパー
│   └── merge-questions.ps1  自動マージスクリプト
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── data.js              バレル (4ファイルを再エクスポート)
    ├── scoring.js           JFLT スコア計算 + 採点モード対応
    ├── gradingMode.js       採点モード実行ロジック
    ├── reading-complete.js  Reading 140問
    ├── listening-complete.js Listening 90問
    ├── vocab-data.js        Vocab 60問
    ├── grammar-data.js      Grammar 60問
    └── components/
        ├── QuestionCard.jsx
        ├── AudioPlayer.jsx
        ├── Statistics.jsx
        ├── SettingsPanel.jsx
        ├── GradingMode.jsx           採点モードのオーケストレーター
        ├── PracticeQuestionView.jsx  採点モード中の単問表示
        └── PracticeResult.jsx        SLPスコア + レビュー画面
```

## 注意

- データファイルは UTF-8 (BOMなし) で保存してください (em-dash 等の文字化け防止)
- APIキーをコミットしないでください (`.gitignore` 済み)
- 旧バージョンの統計 (`jflt_stats`) は新版 (`jflt_stats_v2`) に自動マイグレーションされます (詳細別記録は引き継がれません)
