import { useState } from 'react';
import { playAudio } from './AudioPlayer.jsx';

const SAMPLE_TEXT =
  'This is a test of the Google Cloud Text to Speech voice. Stand by for further instructions.';

export default function SettingsPanel({ apiKey, onSave }) {
  const [draft, setDraft] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testMsg, setTestMsg] = useState('');

  const handleSave = () => {
    onSave(draft.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleClear = () => {
    setDraft('');
    onSave('');
  };

  const handleTest = async () => {
    setTestMsg('');
    if (!draft.trim()) {
      setTestMsg('⚠️ 先にAPIキーを入力してください。');
      return;
    }
    setTesting(true);
    try {
      await playAudio(SAMPLE_TEXT, draft.trim());
      setTestMsg('✅ 再生に成功しました。');
    } catch (e) {
      console.error(e);
      setTestMsg(`❌ 再生に失敗: ${e.message || 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-5 fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          🔑 Google Cloud APIキー
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          音声再生（Text-to-Speech）のためのAPIキーを入力してください。キーは
          ブラウザの LocalStorage に保存され、外部サーバーに送られることはありません。
        </p>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          APIキー
        </label>
        <div className="flex gap-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="AIza..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowKey((s) => !s)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            {showKey ? '隠す' : '表示'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            💾 保存
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="px-4 py-2 text-sm rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50"
          >
            {testing ? '⏳ 再生中...' : '🔊 テスト音声を再生'}
          </button>
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-sm rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
            >
              🗑️ APIキーを削除
            </button>
          )}
        </div>

        {saved && (
          <div className="mt-3 text-sm text-emerald-700">✅ 保存しました。</div>
        )}
        {testMsg && (
          <div
            className={`mt-3 text-sm ${
              testMsg.startsWith('✅') ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {testMsg}
          </div>
        )}

        {apiKey && (
          <div className="mt-4 text-xs text-slate-500">
            現在のキー: <span className="font-mono">{apiKey.slice(0, 6)}…{apiKey.slice(-4)}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-3">
          📘 セットアップガイド
        </h3>
        <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
          <li>
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline"
            >
              Google Cloud Console
            </a>
            にアクセスし、プロジェクトを作成（または選択）します。
          </li>
          <li>
            「APIとサービス」→「ライブラリ」から{' '}
            <strong>Cloud Text-to-Speech API</strong> を有効化します。
          </li>
          <li>
            「APIとサービス」→「認証情報」で <strong>APIキー</strong> を作成します。
          </li>
          <li>
            （推奨）作成したキーに HTTP リファラ制限を設定し、不正利用を防ぎます。
          </li>
          <li>キーをコピーし、上の入力欄に貼り付けて「保存」を押します。</li>
          <li>「テスト音声を再生」で動作確認をします。</li>
        </ol>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          ⚠️ APIキーはブラウザ内にのみ保存されます。共有端末では使用後に「APIキーを削除」を押してください。
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          ℹ️ 音声について
        </h3>
        <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
          <li>音声は en-GB（British English）の <code className="font-mono">en-GB-Neural2-A</code> を使用します。</li>
          <li>Reading / Listening 問題のスクリプトを読み上げます。</li>
          <li>料金は Google Cloud TTS の無料枠（毎月100万文字）の範囲内なら無料です。</li>
        </ul>
      </div>
    </div>
  );
}
