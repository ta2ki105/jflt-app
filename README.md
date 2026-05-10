# JFLT Training

NATO英語能力試験 (JFLT) 対策アプリ — Reading / Listening / Vocabulary / Grammar の240問。

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
| 📝 問題 | カテゴリ × レベルで240問から出題。クリックで自動採点・解説表示。 |
| 📊 統計 | 正解数、正解率、連続正解、最高記録。LocalStorageで保存。 |
| ⚙️ 設定 | Google Cloud APIキーの登録、テスト再生、セットアップガイド。 |

## 音声機能

Reading / Listening 問題の本文を Google Cloud TTS (en-GB-Neural2-A) で読み上げます。

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. **Cloud Text-to-Speech API** を有効化
3. 「認証情報」から APIキーを作成
4. アプリの ⚙️ 設定タブで APIキーを保存

> APIキーはブラウザの LocalStorage にのみ保存され、外部サーバーには送信されません。

## ファイル構成

```
jflt-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── data.js              # 240問データ
    └── components/
        ├── QuestionCard.jsx
        ├── AudioPlayer.jsx
        ├── Statistics.jsx
        └── SettingsPanel.jsx
```

## 注意

- `data.js` は em-dash (—) などのUnicode文字を含むためUTF-8で扱ってください
- APIキーをコミットしないでください (`.gitignore` 済み)
