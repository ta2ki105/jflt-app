# Claude Chat 用 問題生成プロンプト集

新しい問題セットを Claude Chat で生成する際の **そのままコピペできるプロンプト** をまとめています。

スキル別に 4 種類 (Reading / Listening / Vocab / Grammar)。
末尾に **共通の必須ルール** と **トラブル防止のチェックリスト**。

---

## 1. Reading 問題生成プロンプト

```
あなたは NATO 軍事英語試験 (STANAG 6001 / JFLT) の問題作成専門家です。
JFLT Reading セクションの問題を作成してください。

【出力フォーマット】
ES Modules 形式の単一 .js ファイル。以下の構造で出力すること:

export const READING = {
  1: [ /* L1問題 */ ],
  2: [ /* L2問題 */ ],
  3: [ /* L3問題 */ ],
  4: [ /* L4問題 */ ],
};

【1問あたりのスキーマ】(全フィールド必須)
{
  topic: "短いトピック名 (英語、10〜40字)",
  passage: "本文 (英語、レベル別ワード数を厳守)",
  question: "設問 (英語)",
  options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],  // 必ず4個
  answer: 0|1|2|3,  // 0始まりインデックス
  ex: "解説 (日本語または英語、なぜそれが正解かを論理的に)"
}

【レベル別仕様 (STANAG 6001 準拠)】
- L1 (10問): ~50 words, 単純な事実検索 (時刻、人名、場所、数値)
  例: チェックポイント手順、補給リスト、訓練スケジュール
- L2 (35問): ~150 words, 条件・制限・原因・関係性の理解
  例: ROE、補給ロジスティクス、人道的支援、PKO 状況報告
- L3 (25問): ~300 words, 抽象的・分析的内容、論証構造
  例: 戦略・ドクトリン・サイバー・多国籍協力
- L4 (10問): ~400 words, 高度な学術的・形式的英語、複雑な論理関係
  例: 抑止理論・核態勢・情報戦・ハイブリッド戦・戦略安定性

【トピック領域 (NATO 27 公式トピック)】
作戦/兵站/医療/通信/情報/CIMIC/PKO/対テロ/サイバー/海洋/航空/宇宙/
核抑止/同盟政策/装備調達/演習/法務/民間支援/気候/技術/メディア etc.

各レベルでトピックの偏りがないよう分散させること。

【選択肢設計の原則】★ 重要 ★
- L1: 本文中の表現と一致する選択肢を含めて良い (直接検索)
- L2/L3/L4: パラフレーズ必須。本文のキーワードをそのまま選択肢に
  入れてはいけない (キーワードマッチで解けてしまうため)
- 不正解選択肢 (distractor) は本文に登場するが質問に答えていない情報、
  常識的に正しいが本文では言及されていない情報、関連トピック等
- L4 では「字面は近いが意味が逆」「程度・対象が異なる」のような微妙な
  差を意図的に含める

【解説 (ex) の書き方】
- 該当箇所を引用する (「'X' という記述から…」)
- なぜ他の選択肢が誤りか触れる (主要な distractor について)
- そのレベルで何が試されているか軽く言及
- 1〜3 文程度

【今回の生成内容】
[ ここに生成範囲を指定: 例「L2 を 5問追加生成」「L3 全 25問」等 ]

【出力時の絶対ルール】★ 守らないとファイルが壊れる ★
1. オブジェクト間の区切りは「,」のみ。「,\n,\n」のような余分なカンマ厳禁
2. 文字列内のシングルクオート (') はバックスラッシュエスケープ
   または passage を二重引用符で統一
3. em-dash (—) や smart quote (' " ") はそのまま使用可 (UTF-8で扱われる)
4. answer は文字列ではなく数値で出力
5. options 配列は必ず長さ4
6. ファイル末尾に余分なコードブロック区切りや説明文を入れない
   (純粋な .js コードのみ出力)

それでは生成してください。
```

---

## 2. Listening 問題生成プロンプト

```
あなたは NATO 軍事英語試験 (STANAG 6001 / JFLT) の問題作成専門家です。
JFLT Listening セクションの問題を作成してください。

【出力フォーマット】
export const LISTENING = {
  1: [ /* L1問題 */ ],
  2: [ /* L2問題 */ ],
  3: [ /* L3問題 */ ],
  4: [ /* L4問題 */ ],
};

【スキーマ】(Reading と同一)
{
  topic: "...",
  passage: "音声原稿 (TTSで自然に読まれるよう調整)",
  question: "...",
  options: [...4個],
  answer: 0|1|2|3,
  ex: "..."
}

【Listening 特有の注意】★ 重要 ★
passage は Google Cloud TTS で読み上げられる音声原稿。以下に注意:

- 時刻は単語で表記:
  ✅ "fourteen forty-five", "oh-six-hundred", "twenty-two hundred"
  ❌ "14:45", "0600"  (数字は読み間違いの元)
- 数値も単語推奨: "approximately twenty-five", "five hundred litres"
- グリッド座標は単語: "grid four-four-seven Echo"
- コールサイン: "Bravo Two", "Hotel Six", "Sunray", "Zero"
- 軍事無線フォーマット: "this is X", "over", "out", "roger", "wilco"
- 自然な放送・ブリーフィングのリズムで書く

【選択肢の表記】
- L1 では時刻を「14:45 — departure time」のように読み手の参考用にコロン
  併記しても良い (passage は単語、options は数字 OK)

【レベル別仕様】
- L1 (10問): ~30 秒の短い無線通信 / アナウンス
  例: 衛兵交代、給食時間、QRF招集、weather brief
- L2 (35問): ~60 秒のブリーフィング / 状況報告 / 命令
  例: 偵察ブリーフィング、補給依頼、医療搬送、CIMIC連絡
- L3 (25問): ~90 秒の戦略・分析的なブリーフィング
  例: NATO サミット結果、サイバー事案、能力開発
- L4 (10問): ~120 秒の高度な議論・講義・分析
  例: 抑止論、戦略安定性、ハイブリッド脅威、文民統制

【今回の生成内容】
[ 例「L2 リスニングを 5問追加」]

【出力時の絶対ルール】(Reading と同じ)
- 余分なカンマ禁止
- 純粋な .js のみ出力 (説明文不要)
- options 4個、answer は数値、UTF-8

生成してください。
```

---

## 3. Vocab 問題生成プロンプト

```
あなたは NATO 軍事英語試験 (STANAG 6001 / JFLT) の問題作成専門家です。
JFLT Vocabulary セクションの問題を作成してください。

【出力フォーマット】
export const VOCAB = {
  1: [ /* L1: 15問 */ ],
  2: [ /* L2: 15問 */ ],
  3: [ /* L3: 15問 */ ],
  4: [ /* L4: 15問 */ ],
};

【スキーマ】(passage 不要)
{
  question: "語彙の意味を問う設問 (英語)",
  options: ["...", "...", "...", "..."],  // 4個
  answer: 0|1|2|3,
  ex: "短い解説。語源・コロケーション・対義語など"
}

【レベル別ターゲット語彙】
- L1: 基本軍事用語・略語
  stand by, FOB, sitrep, roger, checkpoint, deploy, casualty, MEDEVAC,
  briefing, mess hall, chain of command, mandatory, objective ...
- L2: 作戦語彙・実務語
  ROE, OPORD, escalation of force, force protection, collateral damage,
  logistics, reconnaissance, imminent threat, comply, caveat, mitigate,
  prerequisite, perimeter, sustainment ...
- L3: 戦略・政策語
  deterrence, interoperability, mandate, asymmetric warfare, situational
  awareness, attribution, cohesion, proportionate, contingency, precedent,
  consensus, invoke, ambiguity, paramount, consolidate ...
- L4: 学術・抽象語
  strategic ambiguity, burden sharing, escalation dominance, non-kinetic
  effect, plausible deniability, predicated upon, inadvertent, centrifugal,
  salience, paradigmatic, asymmetry, subordinated, preclude, compromise (v),
  commensurate, notwithstanding ...

【設問パターン例】
- 直接定義: "What does 'X' mean?"
- 文脈穴埋め: "Choose the best word: 'The threat is _____ .'"
- 略語展開: "What does 'FOB' stand for?"
- 同義語選択: "Which word is closest in meaning to 'mitigate'?"
- 用法判別: "Which sentence uses 'preclude' correctly?"

【今回の生成内容】
[ 例「L3 Vocab を 5問追加。テーマ: 同盟政策」]

【絶対ルール】(他と同じ)
- 余分なカンマ禁止、4選択肢、数値 answer、純粋 .js

生成してください。
```

---

## 4. Grammar 問題生成プロンプト

```
あなたは NATO 軍事英語試験 (STANAG 6001 / JFLT) の問題作成専門家です。
JFLT Grammar セクションの問題を作成してください。

【出力フォーマット】
export const GRAMMAR = {
  1: [ /* L1: 15問 */ ],
  2: [ /* L2: 15問 */ ],
  3: [ /* L3: 15問 */ ],
  4: [ /* L4: 15問 */ ],
};

【スキーマ】(passage 不要)
{
  question: "文法問題の設問 (英語、軍事文脈推奨)",
  options: ["...", "...", "...", "..."],
  answer: 0|1|2|3,
  ex: "ルール解説。なぜ正解か、文法用語を交えて"
}

【レベル別文法ターゲット】
- L1: 基礎文法
  時制 (現在/過去/現在進行)、主語動詞一致、a/an/the、前置詞 (at/on/in
  with time)、所有格、be 動詞、do/does、比較級 (-er)
- L2: 中級文法 / 報告書文体
  受動態、現在完了、第一・第二条件文、reported speech、関係代名詞
  (who/whose/which)、despite/although、used to、gerund/infinitive
- L3: 上級文法 / フォーマル英語
  過去完了、subjunctive (essential/recommend that ~ be)、cleft sentence、
  inversion (Never has)、whereas、participle phrase、formal connectors
  (furthermore, whereas)、データ語彙の単複扱い
- L4: 学術・公式文書
  nominalisation、third conditional inverted (Had X been)、whereby、
  notwithstanding、thereby、hedging (may, suggest, appears)、
  passive impersonal (It is widely believed that...)、subjunctive demand

【軍事報告書スタイルの推奨】
- フォーマルレジスター (proceeded > went, deployed > sent)
- 受動態の積極使用 ("The order was issued at 0900")
- 名詞化 (decision rather than decided)
- "I/we" 回避、impersonal 構造

【今回の生成内容】
[ 例「L4 Grammar を 5問追加。テーマ: 仮定法・公式文書」]

【絶対ルール】(他と同じ)

生成してください。
```

---

## 5. 共通: 受け取ったファイルの統合手順

Claude Chat から `.js` を受け取ったら:

```powershell
# 1. ダウンロードフォルダから src/ にコピー
Copy-Item "C:\Users\USER\Downloads\new-questions.js" `
          "C:\Users\USER\.claude\work\jflt-app\src\reading-complete.js"

# 2. 余分なカンマを除去 (Listening でよく発生)
$path = "C:\Users\USER\.claude\work\jflt-app\src\reading-complete.js"
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text -split "`r?`n"
$cleaned = $lines | Where-Object { $_ -notmatch "^\s*,\s*$" }
[System.IO.File]::WriteAllText(
  $path, ($cleaned -join "`n"),
  (New-Object System.Text.UTF8Encoding $false)
)

# 3. 問題数の確認
(Select-String -Path $path -Pattern "topic:" -AllMatches |
  Measure-Object -Line).Lines
```

---

## 6. 既存問題に追記するときの差分プロンプト

「既存ファイルに何問か追加したい」というケース:

```
以下は現在使用中の Reading L2 の最後の問題です:

[ 既存ファイルから直近 1〜2 問貼り付け ]

これに続けて、同じスタイル・同じスキーマで Reading L2 を **5問** 追加生成して
ください。出力は { topic: ... } から始まる JSON 風オブジェクトのみ
(配列・export 文は不要)。各問題の末尾は `},` で区切ってください。
余分な改行カンマを入れないでください。
```

このパターンで生成すると、既存ファイルの該当 `]` の直前にコピペするだけで
追加できます。

---

## 7. チェックリスト (受け取り後に必ず確認)

- [ ] ファイル冒頭に `export const SKILL_NAME = {` がある
- [ ] レベルキー `1: [`, `2: [`, `3: [`, `4: [` が揃っている
- [ ] 各レベルの問題数が想定通り (`grep -c "topic:"` 等で確認)
- [ ] 単独行カンマ (`^,$`) が無い
- [ ] 末尾に `};` がある
- [ ] `npm run dev` で起動して問題が表示される
- [ ] 統計タブで該当セクションのカウンタが進む

---

## 8. 生成範囲の例

実用的な指定パターン:

| 目的 | プロンプトの「今回の生成内容」欄 |
|---|---|
| 完全置換 | `Reading L1〜L4 を全80問 (10/35/25/10) 生成` |
| L2 強化 | `Reading L2 を 10問追加。テーマは情報・サイバー中心` |
| 弱点補強 | `Vocab L4 を 8問。テーマ: ハイブリッド脅威関連語彙` |
| 単問追加 | `Listening L3 を 1問。テーマ: 多国籍演習ブリーフィング` |
| カテゴリ刷新 | `Grammar L3 全 15問を、より時事的な軍事文脈で再生成` |

---

## 9. 重複生成の防止 ★ 最重要 ★

新しい問題を追加していくと、**Claude が無意識に同じトピック・同じ構造を再生成
する** ことがよくあります。3 層で防御します。

### 9.1 防御層 1: 既存トピックをプロンプトに渡す (事前防止)

最も効果的。生成前に「使用済みトピック一覧」を Claude に見せる。

```powershell
# scripts/dedup.ps1 を読み込んでクリップボードへ
. .\scripts\dedup.ps1
Copy-TopicsToClipboard src\reading-complete.js
```

→ クリップボードに「- Topic Name」形式で全トピックが入る。
プロンプトの末尾に下記ブロックを足してから貼り付け:

```
【既存トピック一覧 (重複禁止)】
以下は既に使用済みのトピック名です。同じトピック名、および同じ事例・登場
人物・状況設定 を扱う問題を生成しないでください。類似トピックでも視点・
登場人物・数値・地名を変えること。

[ ここにクリップボードの内容を貼り付け ]

トピックの新規性が乏しい場合は、別の NATO 27 領域から選んでください。
```

### 9.2 防御層 2: テーマギャップを明示 (積極的多様化)

「使うな」より「これを使え」のほうが Claude は従順。
既存トピックの分布を可視化して未使用領域を見つける:

```powershell
. .\scripts\dedup.ps1
Show-TopicHistogram src\reading-complete.js -Top 20
```

→ 頻出キーワード (例: "patrol", "convoy", "briefing") が見える。
プロンプトで未使用領域を指定:

```
【今回の生成テーマ】
以下の領域 *のみ* から問題を生成してください (既出が少ない領域):
- Cyber operations / electronic warfare
- Maritime interdiction
- Civil affairs / humanitarian liaison
- Arctic operations
- Air defence integration
- Counter-UAS (drone defence)
- Climate-induced operations
- Space domain situational awareness
```

### 9.3 防御層 3: 受領後の自動検出 (事後検証)

Claude が指示を無視した場合の最終チェック:

```powershell
. .\scripts\dedup.ps1
Invoke-DedupAudit `
  -NewFile src\new-questions.js `
  -ExistingFile src\reading-complete.js
```

実行内容:
1. **Find-DuplicateTopics**: トピック名の完全一致 / 大文字違い / 内部重複
2. **Find-SimilarQuestions**: 質問文の出だし 5 単語が一致するもの
3. **Find-DuplicateOptions**: 選択肢セットが完全一致するもの

### 9.4 効果的な「多様性プロンプト」追加文

各プロンプトの末尾にこれを入れると重複率が大幅に下がります:

```
【多様性要件】
- 全問題でユニークな登場人物名・部隊名・地名・コールサインを使用すること
  (Captain Smith, Bravo Two, Camp Delta などを連続使用しない)
- 同じ動詞/構文パターンを 2 問以上で繰り返さないこと
- 質問の出だし ("What time...", "Why...", "How many...") を分散すること
- 同じ数値・時刻 (例: 0800, 14:00) を 2 問以上で使わないこと
- グリッド座標 (e.g. "grid 447 Echo") も毎回変えること
```

### 9.5 重複が見つかった場合の差し替えプロンプト

検出された重複問題だけを再生成させる:

```
あなたが先ほど生成した以下の Reading 問題は、既存のものと重複しています:

[ Find-DuplicateTopics の出力をそのまま貼り付け ]

これらの問題を、以下の未使用テーマで全く新しい状況設定に差し替えて再生成
してください:
- (テーマ A)
- (テーマ B)

スキーマ・スタイルは前回と同じ。差し替え分のみ出力すれば良い。
```
