import { useState, useRef } from 'react';

/**
 * Calls Google Cloud Text-to-Speech and plays the resulting MP3.
 * Returns a promise that resolves when playback starts.
 */
export async function playAudio(text, apiKey) {
  if (!apiKey) {
    alert('設定タブで APIキーを入力してください');
    return;
  }
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'en-GB', name: 'en-GB-Neural2-A' },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    }
  );
  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error(`API request failed (${response.status}) ${err}`);
  }
  const data = await response.json();
  const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
  await audio.play();
  return audio;
}

export default function AudioPlayer({ text, apiKey, label = '音声再生' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const handlePlay = async () => {
    setError('');
    if (!apiKey) {
      setError('設定タブで APIキーを入力してください');
      return;
    }
    if (!text) return;
    try {
      // stop any currently playing audio
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (_) { /* ignore */ }
        audioRef.current = null;
      }
      setLoading(true);
      const audio = await playAudio(text, apiKey);
      audioRef.current = audio;
    } catch (e) {
      console.error('Audio playback error:', e);
      setError('音声再生に失敗しました。APIキーを確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handlePlay}
        disabled={loading}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 disabled:opacity-50"
        title={label}
      >
        <span className="text-base">{loading ? '⏳' : '🔊'}</span>
        <span>{loading ? '読み込み中...' : label}</span>
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
