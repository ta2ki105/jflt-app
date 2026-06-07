import { useEffect, useRef, useState } from 'react';
import { playAudio } from './AudioPlayer.jsx';
import { useI18n } from '../i18n/useI18n.js';

/**
 * Single-question view used inside the grading-mode test runner.
 * - No correctness feedback during the test
 * - Listening: audio auto-plays exactly once per question (official spec)
 * - Reading: passage remains visible during the test
 */
export default function PracticeQuestionView({
  question,
  questionIndex,
  totalInSection,
  level,
  skill,
  apiKey,
  selected,
  onSelect,
  onNext,
  isLast,
}) {
  const { t } = useI18n();
  const optionLabels = ['A', 'B', 'C', 'D'];
  const isAudioSkill = skill === 'listening' || skill === 'reading';
  const isListeningSkill = skill === 'listening';

  // Auto-play UX:
  //   1. Question appears → countdown shows for COUNTDOWN_SECONDS
  //      so the user can skim the question + options first
  //   2. After countdown, audio starts automatically
  //   3. User can tap the audio button at any time to skip the countdown
  //      and play immediately
  const COUNTDOWN_SECONDS = 5;

  // idle | waiting | loading | played | failed
  const [audioState, setAudioState] = useState('idle');
  const [countdown, setCountdown] = useState(0);
  const playedKeyRef = useRef(null);
  const playTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  // Track the currently-playing Audio element so we can stop it the moment
  // we move on to the next question. Without this, the previous answer's
  // audio keeps playing while the next question's countdown ticks, which
  // sounds to the user like "the next audio started immediately".
  const audioRef = useRef(null);
  const questionRef = useRef(question);
  questionRef.current = question;

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (_) { /* ignore */ }
      audioRef.current = null;
    }
  };

  const clearTimers = () => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  const startPlayback = async (passage) => {
    // Always stop whatever might still be playing from the previous question
    stopCurrentAudio();
    setAudioState('loading');
    try {
      const audio = await playAudio(
        passage || '',
        apiKey,
        { noKey: t('audio.noKey') }
      );
      audioRef.current = audio || null;
      setAudioState('played');
    } catch (e) {
      console.warn('Listening play failed', e);
      setAudioState('failed');
    }
  };

  useEffect(() => {
    if (!isListeningSkill) return;
    if (!apiKey) return;
    const key = `${skill}-${level}-${questionIndex}`;
    if (playedKeyRef.current === key) return;
    playedKeyRef.current = key;

    // Hard stop on any audio from the previous question before we start the
    // new countdown. Without this, late-arriving previous audio can begin
    // playing AFTER this effect already showed the new question's countdown.
    stopCurrentAudio();
    clearTimers();

    setAudioState('waiting');
    setCountdown(COUNTDOWN_SECONDS);

    let cancelled = false;
    // Snapshot the passage now; if the question prop changes mid-countdown
    // we'd rather play the snapshot than the new question's audio (the
    // new question's own effect will then take over and cancel us).
    const passageSnapshot = question.passage || '';

    // Tick the visible countdown every second
    countdownTimerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    // Trigger playback after the countdown elapses
    playTimerRef.current = setTimeout(() => {
      playTimerRef.current = null;
      if (cancelled) return;
      startPlayback(passageSnapshot);
    }, COUNTDOWN_SECONDS * 1000);

    return () => {
      cancelled = true;
      clearTimers();
      // Also stop in-flight audio on cleanup so leaving / pausing /
      // advancing immediately silences the previous question.
      stopCurrentAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListeningSkill, apiKey, questionIndex, level, skill]);

  // Stop audio on unmount as well (e.g. user changes tab away from grading).
  useEffect(() => {
    return () => {
      clearTimers();
      stopCurrentAudio();
    };
  }, []);

  // Manual play: cancel any pending countdown and start immediately.
  const handleManualPlay = async () => {
    if (audioState === 'loading') return;
    clearTimers();
    setCountdown(0);
    await startPlayback(questionRef.current.passage || '');
  };

  const passageVisible = !isListeningSkill;

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden fade-in">
      {/* Top bar */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-2 border-b border-slate-100">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-slate-100 text-slate-700 border-slate-200">
          {t('pq.section_badge', { level })}
        </span>
        <span className="text-xs text-slate-500">
          {t('pq.q_progress', {
            current: questionIndex + 1,
            total: totalInSection,
          })}
        </span>
        {isAudioSkill && apiKey && (
          <button
            type="button"
            onClick={handleManualPlay}
            disabled={audioState === 'loading'}
            className={`ml-auto inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border disabled:opacity-50 ${
              audioState === 'waiting'
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
            }`}
            title={isListeningSkill ? t('pq.audio_once_tooltip') : ''}
          >
            <span>
              {audioState === 'loading'
                ? '⏳'
                : audioState === 'waiting'
                ? '⏱️'
                : '🔊'}
            </span>
            <span>
              {audioState === 'loading'
                ? t('pq.audio_loading')
                : audioState === 'waiting'
                ? t('pq.audio_waiting', { count: countdown })
                : isListeningSkill
                ? audioState === 'played'
                  ? t('pq.audio_played')
                  : audioState === 'failed'
                  ? t('pq.audio_failed')
                  : t('pq.audio_play')
                : t('pq.audio_read')}
            </span>
          </button>
        )}
      </div>

      {/* Passage */}
      {question.passage && (
        <div className="px-5 pt-3">
          {passageVisible ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[15px] leading-relaxed text-slate-800 whitespace-pre-wrap">
              {question.passage}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 text-sm text-slate-500 italic">
              {t('pq.listen_instruction')}
              {!apiKey && (
                <div className="mt-2 text-rose-600 text-xs not-italic">
                  {t('pq.listen_no_key')}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Question */}
      <div className="px-5 pt-3 pb-2">
        <p className="text-[15px] font-medium text-slate-900">{question.question}</p>
      </div>

      {/* Options */}
      <ul className="px-5 pb-4 space-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const cls = isSelected
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40';
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => onSelect(idx)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 border rounded-xl transition-colors ${cls}`}
              >
                <span
                  className={`flex-none w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border ${
                    isSelected
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  {optionLabels[idx]}
                </span>
                <span className="text-[15px] leading-snug text-slate-800 pt-1">
                  {opt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Action bar */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <span className="text-xs text-slate-500">
          {selected == null ? t('pq.select_prompt') : t('pq.answered')}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={selected == null}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLast ? t('pq.complete_section') : t('pq.next_question')}
        </button>
      </div>
    </article>
  );
}
