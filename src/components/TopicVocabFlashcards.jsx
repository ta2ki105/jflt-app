import { useState, useMemo } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import AudioPlayer from './AudioPlayer.jsx';
import { markKey } from '../topicVocabMarks.js';

function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function TopicVocabFlashcards({ topic, apiKey, marks, onToggleMark }) {
  const { t } = useI18n();
  const [seed, setSeed] = useState(0);
  const deck = useMemo(() => shuffle(topic.words), [topic, seed]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = deck[index];
  const isMarked = !!(marks && marks[markKey(topic.id, card.term)]);

  const goNext = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };
  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + deck.length) % deck.length);
  };
  const reshuffle = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {index + 1} / {deck.length}
        </span>
        <button
          type="button"
          onClick={reshuffle}
          className="px-3 py-1 text-xs rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
        >
          🔀 {t('topicVocab.reshuffle')}
        </button>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className="relative w-full min-h-[220px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center px-6 py-8 text-center hover:border-indigo-300 transition-colors fade-in cursor-pointer"
      >
        <div
          className="w-full flex items-center justify-end gap-2 mb-2"
          onClick={(e) => e.stopPropagation()}
        >
          <AudioPlayer text={card.term} apiKey={apiKey} label={t('card.hearWord')} />
          <button
            type="button"
            onClick={() => onToggleMark && onToggleMark(card.term)}
            title={isMarked ? t('topicVocab.unmark_button') : t('topicVocab.mark_button')}
            aria-pressed={isMarked}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center text-base transition-colors ${
              isMarked
                ? 'bg-amber-100 border-amber-300 text-amber-700'
                : 'bg-white border-slate-200 text-slate-300 hover:border-slate-400 hover:text-slate-500'
            }`}
          >
            🚩
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 flex-1">
        {!flipped ? (
          <>
            <span className="text-xs text-slate-400">{t('topicVocab.flash_front_hint')}</span>
            <span className="text-3xl font-bold text-slate-900">{card.term}</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-bold text-indigo-700">{card.jp}</span>
            <div className="border-t border-slate-100 pt-3 mt-1 max-w-md">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                {card.example}
              </p>
              {card.exampleJa && (
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  {card.exampleJa}
                </p>
              )}
            </div>
            <span className="text-xs text-slate-400">{t('topicVocab.flash_back_hint')}</span>
          </>
        )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="px-4 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-slate-400"
        >
          {t('card.back')}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {t('card.next')}
        </button>
      </div>
    </div>
  );
}
