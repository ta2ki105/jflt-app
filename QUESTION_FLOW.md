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

---

## 実践: 新しい問題を追加する具体的手順

ここでは Reading L2 を 10問追加するシナリオを例に、実際のコマンドと操作を順
を追って示します。他のスキル・他の数も応用可能。

### Step 1. 既存トピックの抽出 (重複防止)

PowerShell で:

```powershell
cd C:\Users\USER\.claude\work\jflt-app
. .\scripts\dedup.ps1
Copy-TopicsToClipboard src\reading-complete.js
```

→ クリップボードに `- Topic Name` 形式で全 80 問のトピック名が入ります。

### Step 2. 既存トピック分布の確認 (新規テーマ選定)

```powershell
Show-TopicHistogram src\reading-complete.js -Top 20
```

頻出キーワードが見えたら、それ以外の領域を新規テーマに選びます。

### Step 3. プロンプト作成

`PROMPTS.md` の §1 (Reading) のテンプレを開き、以下を埋めて Claude Chat へ:

1. 「【今回の生成内容】」を `Reading L2 を 10問追加。テーマ: 海洋安全保障・サイバー作戦` のように埋める
2. プロンプト末尾に **§9.1 の【既存トピック一覧】ブロック** を追加し、
   Step 1 でクリップボードにコピーした内容を貼り付ける
3. プロンプト末尾に **§9.4 の【多様性要件】ブロック** を追加

### Step 4. Claude Chat から受領 → 一時保存

Claude が出力した `.js` を、まず **既存ファイルとは別名** で保存:

```
C:\Users\USER\Downloads\new-questions.js
```

→ プロジェクトの `src/` にコピー (検証用、まだマージしない):

```powershell
Copy-Item "$HOME\Downloads\new-questions.js" "src\new-questions.js"
```

### Step 5. 構文クリーニング (余分カンマ除去)

```powershell
$path = "src\new-questions.js"
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text -split "`r?`n"
$cleaned = $lines | Where-Object { $_ -notmatch "^\s*,\s*$" }
[System.IO.File]::WriteAllText(
  $path, ($cleaned -join "`n"),
  (New-Object System.Text.UTF8Encoding $false)
)
Write-Host "削除行数: $($lines.Count - $cleaned.Count)"
```

### Step 6. 重複監査 (一括チェック)

```powershell
. .\scripts\dedup.ps1
Invoke-DedupAudit `
  -NewFile src\new-questions.js `
  -ExistingFile src\reading-complete.js
```

出力例の見方:
- ✅ すべて緑 → そのまま Step 7 へ
- ⚠️ Yellow (大文字違い・類似質問) → 内容を確認、問題なければ続行 / リネーム検討
- ❌ Red (完全一致・内部重複) → §9.5 の差し替えプロンプトで該当問題を再生成依頼、Step 4 から繰り返し

### Step 7. 問題数の最終確認

```powershell
# 新ファイルの問題数
(Select-String -Path src\new-questions.js -Pattern 'topic:' -AllMatches).Matches.Count
```

想定数と一致していることを確認。

### Step 8. マージ

新ファイルの問題本体だけ抜き出して既存ファイルの該当レベル末尾に挿入:

**手動マージ (簡単な方法)**:
1. `src\new-questions.js` を VSCode 等で開く
2. 追加したいレベルの問題オブジェクト (`{ topic: ... }, { ... }`) をコピー
3. `src\reading-complete.js` の該当レベル `]` の直前に貼り付け
4. 直前のオブジェクトの末尾に `,` がついていることを確認
5. 保存

**自動マージ (PowerShell)** — 別ファイルにレベルごと配列が入っている場合:

```powershell
# 例: new-questions.js から L2 配列だけ抽出して reading-complete.js の L2 末尾に追加
# (構造が単純な場合のみ。複雑な場合は手動推奨)
```

### Step 9. ブラウザで動作確認

```powershell
npm run dev
```

確認項目:
- [ ] 問題タブで Reading L2 を選択
- [ ] 新しい問題が表示される (進捗表示で問題数が増えている)
- [ ] 採点 → ✅/❌ の反応確認
- [ ] 統計タブで Reading L2 の合計問題数が増えている

### Step 10. 一時ファイル削除

確認できたら:

```powershell
Remove-Item src\new-questions.js
```

---

## ワンライナー版 (慣れてきたら)

毎回同じ流れなので、簡略化版:

```powershell
cd C:\Users\USER\.claude\work\jflt-app
. .\scripts\dedup.ps1

# 1. プロンプト用のトピック一覧
Copy-TopicsToClipboard src\reading-complete.js

# (Claude Chat で生成 → Downloads に保存)

# 2. 取り込み + クリーン + 監査を一気に
$f = "src\new-questions.js"
Copy-Item "$HOME\Downloads\new-questions.js" $f
$lines = [System.IO.File]::ReadAllBytes($f) | ForEach-Object { [char]$_ } | Join-String
$cleaned = ($lines -split "`r?`n" | Where-Object { $_ -notmatch "^\s*,\s*$" }) -join "`n"
[System.IO.File]::WriteAllText($f, $cleaned, (New-Object System.Text.UTF8Encoding $false))
Invoke-DedupAudit -NewFile $f -ExistingFile src\reading-complete.js

# (問題なければ手動で reading-complete.js にマージ)
# (npm run dev で確認)

# 3. 一時ファイル削除
Remove-Item $f
```
