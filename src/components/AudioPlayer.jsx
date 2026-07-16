import { useState, useRef } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { loadVoicePrefs, resolveVoice } from '../voicePrefs.js';

// Pause between speaker turns so the conversation breathes.
const TURN_GAP_MS = 400;

// Speaker-marker syntax for dialogue passages. A line may start with:
//   MAN:  WOMAN:            two-voice (male/female) convention
//   M1: M2: F1: F2:         numbered speakers (two males and/or two
//                           females in one exchange); an optional role
//                           annotation is allowed, e.g. "F1 (Narrator):"
const MARKER_RE = /^(MAN|WOMAN|M[12]|F[12])(?:\s*\([^)]*\))?:\s+(.*)$/;

// Parse passage into turns. Lines beginning with a speaker marker (see
// MARKER_RE) are treated as speaker turns; continuation lines append to
// the previous turn. If no markers are found, the whole passage is one
// default turn. Voices are resolved per turn using the user's saved
// preferences in voicePrefs.
function parseTurns(passage, voiceOverride) {
  const prefs = loadVoicePrefs();
  const lines = passage.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const hasMarkers = lines.some((l) => MARKER_RE.test(l));
  if (!hasMarkers) {
    return [{ voice: voiceOverride || resolveVoice(null, prefs), text: passage }];
  }
  const turns = [];
  for (const line of lines) {
    const m = line.match(MARKER_RE);
    if (m) {
      turns.push({ voice: resolveVoice(m[1], prefs), text: m[2] });
    } else if (turns.length) {
      turns[turns.length - 1].text += ' ' + line;
    }
  }
  return turns.length ? turns : [{ voice: voiceOverride || resolveVoice(null, prefs), text: passage }];
}

async function fetchTts(text, voiceName, apiKey) {
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'en-GB', name: voiceName },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    }
  );
  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error(`API request failed (${response.status}) ${err}`);
  }
  const data = await response.json();
  return new Audio(`data:audio/mp3;base64,${data.audioContent}`);
}

/**
 * Calls Google Cloud Text-to-Speech and plays the resulting MP3(s).
 * For multi-turn dialogue passages (A:/B: markers), one TTS call is
 * made per turn with the appropriate voice, then audios play
 * sequentially with a short gap between turns.
 *
 * Returns a handle exposing `pause()` and a no-op `currentTime` setter
 * so callers that previously held a raw HTMLAudioElement keep working.
 */
export async function playAudio(passage, apiKey, messages, options) {
  const noKeyMsg =
    (messages && messages.noKey) || 'Please enter an API key in Settings.';
  if (!apiKey) {
    alert(noKeyMsg);
    return;
  }

  const voiceOverride = options && options.voiceName;
  const turns = parseTurns(passage || '', voiceOverride);
  // Fetch all turns in parallel — total wait equals the slowest turn,
  // not the sum.
  const audios = await Promise.all(
    turns.map((t) => fetchTts(t.text, t.voice, apiKey))
  );

  let cancelled = false;
  let currentAudio = null;

  const handle = {
    pause() {
      cancelled = true;
      if (currentAudio) {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch (_) { /* ignore */ }
      }
    },
    // No-op setter for backward compatibility with callers that do
    // `audioRef.current.currentTime = 0` right after pause().
    currentTime: 0,
  };

  if (audios.length === 0) return handle;

  // Start first audio synchronously so play() rejections (autoplay
  // blocks, etc.) surface to the caller's try/catch.
  currentAudio = audios[0];
  await currentAudio.play();

  // Schedule remaining turns in the background.
  (async () => {
    await new Promise((resolve) =>
      currentAudio.addEventListener('ended', resolve, { once: true })
    );
    for (let i = 1; i < audios.length; i++) {
      if (cancelled) return;
      await new Promise((resolve) => setTimeout(resolve, TURN_GAP_MS));
      if (cancelled) return;
      currentAudio = audios[i];
      try {
        await currentAudio.play();
      } catch (_) {
        return;
      }
      await new Promise((resolve) =>
        currentAudio.addEventListener('ended', resolve, { once: true })
      );
    }
  })();

  return handle;
}

export default function AudioPlayer({ text, apiKey, label }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const buttonLabel = label || t('audio.play');

  const handlePlay = async () => {
    setError('');
    if (!apiKey) {
      setError(t('audio.noKey'));
      return;
    }
    if (!text) return;
    try {
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (_) { /* ignore */ }
        audioRef.current = null;
      }
      setLoading(true);
      const audio = await playAudio(text, apiKey, { noKey: t('audio.noKey') });
      audioRef.current = audio;
    } catch (e) {
      console.error('Audio playback error:', e);
      setError(t('audio.failed'));
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
        title={buttonLabel}
      >
        <span className="text-base">{loading ? '⏳' : '🔊'}</span>
        <span>{loading ? t('audio.loading') : buttonLabel}</span>
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
