import { useState } from 'react';
import {
  WRITING_COACH_SCRIPT,
  WRITING_TASKS,
  SUPPORTED_AIS,
} from '../writingScript.js';

const STEPS = [
  {
    n: 1,
    title: 'AI チャットを開く',
    body: '下記の対応 AI のいずれかを開きます。新しいチャット (会話) を始めてください。',
  },
  {
    n: 2,
    title: 'スクリプトをコピー',
    body: 'このページ下部の「コピー」ボタンでスクリプト全文をクリップボードに取得します。',
  },
  {
    n: 3,
    title: 'チャット欄に貼り付けて送信',
    body: 'AI への 最初のメッセージ として貼り付け → 送信。AI は 3 つのタスクタイプを提示してきます。',
  },
  {
    n: 4,
    title: 'タスクタイプを選ぶ',
    body: '「E-Mail」「Report」「Essay」のいずれかを返信。AI が具体的な課題を生成します。',
  },
  {
    n: 5,
    title: '自分で書いて送信',
    body: '時間を測りながら、語数制限内で書き上げて AI に送信。',
  },
  {
    n: 6,
    title: 'フィードバックを確認',
    body: '語数 / 構造 / 文法 / 推定 STANAG レベルを構造化された形で評価してくれます。',
  },
];

const TIPS = [
  '本番と同じく時間を計りましょう (Report 30分 / Essay 60分 が目安)',
  '辞書・翻訳ツールは使わずにまず書き切る。後で AI のフィードバックで補強する。',
  'フィードバック内容は別ノート (Notion / Obsidian 等) に記録すると、自分の弱点パターンが見えてきます',
  '同じトピックを 2 週間後に再挑戦すると、改善度合いが客観的にわかる',
  'Report は SCENARIO DETAILS の役職・場所・人数を本文に組み込めているかが評価ポイント',
  'Essay は Pros 2 点 + Cons 2 点 + 結論 という構造を守ることがハイレベル評価の第一歩',
];

export default function WritingPanel() {
  const [copied, setCopied] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WRITING_COACH_SCRIPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Clipboard write failed', e);
      alert(
        'クリップボードへのコピーに失敗しました。手動で選択 → コピーしてください。'
      );
    }
  };

  return (
    <div className="space-y-5 fade-in">
      {/* Header / intro */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          ✍️ Writing 練習 — AI 添削スクリプト
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          JFLT Writing は <strong>3 名以上の試験官による定性評価</strong>が行われます。
          自宅で同等のフィードバックを得るのは難しい — そこで、汎用 AI チャット
          (Gemini / Claude / ChatGPT) を JFLT 専用の添削コーチに変身させる
          プロンプトを用意しました。AI に貼り付けるだけで、
          公式形式の課題生成 → 添削 → 推定 STANAG レベル評価 まで自動化できます。
        </p>
      </div>

      {/* Task type overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">📚 対応する 3 つのタスク</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WRITING_TASKS.map((t) => (
            <div
              key={t.id}
              className="border border-slate-200 rounded-xl p-3 bg-slate-50/40"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <div className="font-bold text-slate-900">{t.label}</div>
                  <div className="text-[11px] text-slate-500">
                    {t.formality} ・ {t.words}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                {t.description}
              </p>
              <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-1.5">
                <span className="font-semibold">構造:</span> {t.structure}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step instructions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">🚀 使い方 (6 ステップ)</h3>
        <ol className="space-y-2">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-start gap-3">
              <span className="flex-none w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                {s.n}
              </span>
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{s.title}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{s.body}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Supported AIs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">🤖 対応 AI チャット</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SUPPORTED_AIS.map((ai) => (
            <a
              key={ai.id}
              href={ai.url}
              target="_blank"
              rel="noreferrer"
              className="block border border-slate-200 rounded-xl p-3 hover:border-blue-400 hover:bg-blue-50/40 transition-colors"
            >
              <div className="font-semibold text-blue-700 text-sm">{ai.name} ↗</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                {ai.note}
              </div>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-3">
          ※ 各サービスのアカウント・利用規約・料金体系はそれぞれ別途確認してください。
        </p>
      </div>

      {/* Script copy block */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900">
            📋 添削コーチ用プロンプト
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowScript((s) => !s)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {showScript ? '隠す' : '全文を表示'}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? '✓ コピー完了' : '📋 スクリプトをコピー'}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          このプロンプトを AI チャットの <strong>最初のメッセージ</strong> として
          貼り付けて送信してください。AI が JFLT writing examiner として
          自分の役割を理解し、3 つのタスク選択肢を提示してきます。
        </p>

        {showScript && (
          <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-800 overflow-auto max-h-96 whitespace-pre-wrap leading-relaxed">
            {WRITING_COACH_SCRIPT}
          </pre>
        )}

        {!showScript && (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center text-xs text-slate-500">
            プロンプト全文は約 {Math.round(WRITING_COACH_SCRIPT.length / 100) / 10}k 文字あります。
            「全文を表示」で展開、または「スクリプトをコピー」でクリップボードへ。
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">💡 効果的な使い方のコツ</h3>
        <ul className="space-y-1.5">
          {TIPS.map((tip, i) => (
            <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
              <span className="text-amber-500 flex-none">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer note */}
      <div className="text-[11px] text-slate-400 text-center">
        スクリプト本体は <code className="font-mono">src/writingScript.js</code> で管理されています。
      </div>
    </div>
  );
}
