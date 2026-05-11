# 問題追加・更新フローチャート

このドキュメントは JFLT Training アプリに新しい問題を追加／既存問題を差し替えるための手順をまとめています。

---

## 全体フロー

```
┌─────────────────────────┐
│ 1. 問題生成              │
│    Claude チャット 等で    │
│    問題セットを作成       │
└──────────┬──────────────┘
           ▼
┌─────────────────────────┐
│ 2. スキーマ検証          │
│  必須フィールドが揃って  │
│  いるか確認              │
└──────────┬──────────────┘
           ▼
┌─────────────────────────┐
│ 3. 構文クリーニング      │
│   ・余分なカンマ除去     │
│   ・括弧の対応確認        │
└──────────┬──────────────┘
           ▼
┌─────────────────────────┐
│ 4. ファイル配置          │
│  src/<skill>-complete.js  │
│   または                  │
│  src/<skill>-data.js     │
└──────────┬──────────────┘
           ▼
┌─────────────────────────┐
│ 5. data.js (バレル) 更新  │
│  export 経路を確認        │
└──────────┬──────────────┘
           ▼
┌─────────────────────────┐
│ 6. 起動・動作確認         │
│   問題タブで表示確認      │
│   採点 → 統計反映確認     │
└─────────────────────────┘
```

---

## 1. 問題生成

カテゴリごとに以下の構造を満たす問題セットを作成します。

### 必須フィールド (1問あたり)

| フィールド | 型 | 用途 |
|---|---|---|
| `topic` | string | ヘッダーに表示するトピック名 (10〜40 文字目安) |
| `passage` | string | Reading / Listening の本文。Vocab / Grammar では不要 |
| `question` | string | 設問文 |
| `options` | string[] | 選択肢 4 個 |
| `answer` | number | 正解の **0始まり** インデックス (0..3) |
| `ex` | string | 解説 (採点後に表示) |

例:

```javascript
{
  topic: "Patrol orders",
  passage: "All call signs, this is Zero. Routine patrol along Route Blue will depart at fourteen forty-five...",
  question: "By what time must vehicles be ready?",
  options: ["14:45", "17:00", "14:15", "14:00"],
  answer: 2,
  ex: "Vehicles must be ready by 14:15 — 30 minutes before the 14:45 departure."
}
```

### レベル別問題数 (推奨)

| Skill | L1 | L2 | L3 | L4 | 合計 |
|---|---:|---:|---:|---:|---:|
| Reading / Listening | 10 | 35 | 25 | 10 | **80** |
| Vocab / Grammar | 15 | 15 | 15 | 15 | **60** |

> 採点では「各レベル 10問以上正解」が合格基準なので、L1 / L4 でも最低10問が必要です。

---

## 2. スキーマ検証

提出ファイルに対して以下を確認:

- [ ] 全問題に `question`, `options`, `answer`, `ex` がある
- [ ] `options` の長さが **4**
- [ ] `answer` が `0` 〜 `3` の整数
- [ ] Reading / Listening は `passage` も必須

---

## 3. 構文クリーニング (重要)

ファイルを生成 AI から受け取った際にしばしば入る不正な構文:

### 3.1 行単独カンマ

```js
{ ... },
,                  // ← これを削除
{ ... },
```

PowerShell で一括削除:

```powershell
$path = "C:\path\to\new-questions.js"
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text -split "`r?`n"
$cleaned = $lines | Where-Object { $_ -notmatch "^\s*,\s*$" }
[System.IO.File]::WriteAllText(
  $path,
  ($cleaned -join "`n"),
  (New-Object System.Text.UTF8Encoding $false)
)
```

### 3.2 文字エンコーディング

em-dash (`—`)、smart quote (`'`, `"`) は **UTF-8 (BOMなし)** で保存。
PowerShell の `Set-Content` ではなく `[System.IO.File]::WriteAllText` を使用すること。

### 3.3 末尾の閉じカッコ

各レベル配列の終端、トップレベル `}` が正しく閉じているか:

```js
export const READING = {
  1: [ /* ... */ ],
  2: [ /* ... */ ],
  3: [ /* ... */ ],
  4: [ /* ... */ ],   // ← 末尾カンマ可
};
```

---

## 4. ファイル配置

```
src/
├── reading-complete.js    Reading 80問
├── listening-complete.js  Listening 80問
├── vocab-data.js          Vocab 60問
├── grammar-data.js        Grammar 60問
└── data.js                バレル (再エクスポート)
```

新しいスキルを追加する場合:

1. `src/<new-skill>-data.js` を作成
2. `src/data.js` に `export { NEW_SKILL } from './<new-skill>-data.js';` を追記
3. `src/App.jsx` の `DATASETS` に新エントリを追加

---

## 5. data.js (バレル) の確認

```javascript
// src/data.js
export { READING } from './reading-complete.js';
export { LISTENING } from './listening-complete.js';
export { VOCAB } from './vocab-data.js';
export { GRAMMAR } from './grammar-data.js';
```

ファイル名を変更した場合はここも更新します。

---

## 6. 動作確認

### 6.1 起動

```bash
npm run dev
```

### 6.2 確認項目

| 項目 | 確認方法 |
|---|---|
| 表示 | 問題タブで該当カテゴリ・レベルを開き、問題数が想定通りか |
| 採点 | 正解選択時に ✅、不正解時に ❌ と正解強調 + 解説表示 |
| 統計 | 統計タブで該当セクションのレベル別 correct/total が増えるか |
| JFLT スコア | レベル評価ロジック (`src/scoring.js`) が反映されているか |

### 6.3 問題数の自動カウント

```bash
# Listening の総問題数
grep -c "topic:" src/listening-complete.js

# Reading の総問題数
grep -c "topic:" src/reading-complete.js
```

---

## トラブルシューティング

| 症状 | 原因 | 対処 |
|---|---|---|
| 画面が真っ白 | JS 構文エラー (余分なカンマ等) | ブラウザ DevTools コンソール確認 → 該当ファイルの構文チェック |
| 文字化け | エンコーディング不一致 | UTF-8 (BOMなし) で再保存 |
| 問題数が合わない | 配列カンマ抜け / 重複問題 | `grep -c "topic:"` で確認 |
| 統計が増えない | `_level` フィールド注入失敗 | `App.jsx` の `flattenByLevel` を確認 |
| JFLT スコアが想定外 | `scoring.js` の閾値 (PASS=10, HALF=7) を確認 |

---

## 採点ルール (再掲)

| 1レベルあたり正解数 | 評価 | スコア出力例 (L2 を解いた場合) |
|---:|---|---|
| **10 問以上** | そのレベル合格 → 上位レベルへ | `2` (L3 未挑戦時) |
| **7〜9 問** | 前のレベル + `+` | `1+` |
| **0〜6 問** | 前のレベル | `1` |

総合 JFLT は 4セクション (Reading/Listening/Vocab/Grammar) の **最低値**。
