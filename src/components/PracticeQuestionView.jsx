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

  const [audioState, setAudioState] = useState('idle'); // idle | loading | played | failed
  const playedKeyRef = useRef(null);

  useEffect(() => {
    if (!isListeningSkill) return;
    if (!apiKey) return;
    const key = `${skill}-${level}-${questionIndex}`;
    if (playedKeyRef.current === key) return;
    playedKeyRef.current = key;
    let cancelled = false;
    setAudioState('loading');
    playAudio(question.passage || '', apiKey, { noKey: t('audio.noKey') })
      .then(() => { if (!cancelled) setAudioState('played'); })
      .catch((e) => {
        console.warn('Listening auto-play failed', e);
        if (!cancelled) setAudioState('failed');
      });
    return () => { cancelled = true; };
  }, [isListeningSkill, apiKey, question, questionIndex, level, skill, t]);

  const handleManualPlay = async () => {
    if (audioState === 'loading') return;
    setAudioState('loading');
    try {
      await playAudio(question.passage || '', apiKey, { noKey: t('audio.noKey') });
      setAudioState('played');
    } catch (e) {
      console.error('Manual play failed', e);
      setAudioState('failed');
    }
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
            className="ml-auto inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700 border border-blue-200 disabled:opacity-50"
            title={isListeningSkill ? t('pq.audio_once_tooltip') : ''}
          >
            <span>{audioState === 'loading' ? '⏳' : '🔊'}</span>
            <span>
              {audioState === 'loading'
                ? t('pq.audio_loading')
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
