import { useState, useMemo } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { TOPIC_VOCAB } from '../topic-vocab-data.js';
import { TOPIC_VOCAB_QUESTIONS } from '../topicVocabQuestions.js';
import AudioPlayer from './AudioPlayer.jsx';

function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Flat pool of every question across every topic pack, each tagged with
// its originating pack's id/icon/labels so the "shuffle all" mode can
// still show which pack a question came from. Built once at module
// scope since TOPIC_VOCAB / TOPIC_VOCAB_QUESTIONS are static imports.
const ALL_QUESTIONS_BASE = TOPIC_VOCAB.flatMap((tp) =>
  (TOPIC_VOCAB_QUESTIONS[tp.id] || []).map((q) => ({
    ...q,
    _packId: tp.id,
    _packIcon: tp.icon,
    _packLabelEn: tp.labelEn,
    _packLabelJa: tp.labelJa,
  }))
);

const ALL_TOPICS_ID = '__all__';

/**
 * Listening-comprehension practice built from the topic-vocab packs'
 * own words (treaties/NATO deployment/extradition/Jesús pack/NATO
 * acronyms). Separate from TopicVocabHub (which drills the words
 * themselves via quiz/flashcard); this zone practises hearing them in
 * a realistic ~90-second passage. A "shuffle all" mode mixes every
 * pack's questions into one randomized run.
 */
export default function TopicVocabListeningHub({ onExit, apiKey }) {
  const { t, lang } = useI18n();
  const [topicId, setTopicId] = useState(null); // null | ALL_TOPICS_ID | a pack id
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const isAll = topicId === ALL_TOPICS_ID;
  const topicMeta =
    topicId && !isAll ? TOPIC_VOCAB.find((x) => x.id === topicId) || null : null;

  const shuffledAll = useMemo(
    () => shuffle(ALL_QUESTIONS_BASE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shuffleSeed]
  );

  const totalCount = ALL_QUESTIONS_BASE.length;

  const openTopic = (id) => {
    setTopicId(id);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    if (id === ALL_TOPICS_ID) setShuffleSeed((s) => s + 1);
  };

  const reshuffleAll = () => {
    setShuffleSeed((s) => s + 1);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
  };

  if (topicId === null) {
    return (
      <div className="space-y-4 fade-in">
        <HeaderBar t={t} onExit={onExit} title={t('topicListening.hub_title')} />
        <p className="text-sm text-slate-600">{t('topicListening.hub_body')}</p>

        <button
          type="button"
          onClick={() => openTopic(ALL_TOPICS_ID)}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <span className="text-2xl flex-none">🔀</span>
          <span className="text-left flex-1 min-w-0">
            <span className="block font-semibold text-[15px] truncate">
              {t('topicListening.shuffle_all_button')}
            </span>
            <span className="block text-xs text-emerald-100 mt-0.5">
              {t('topicListening.shuffle_all_subtitle', { count: totalCount })}
            </span>
          </span>
          <span className="text-xl flex-none">→</span>
        </button>

        <div className="grid gap-3 sm:grid-cols-3">
          {TOPIC_VOCAB.map((tp) => (
            <button
              key={tp.id}
              type="button"
              onClick={() => openTopic(tp.id)}
              className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">{tp.icon}</div>
              <div className="font-semibold text-slate-900">
                {lang === 'ja' ? tp.labelJa : tp.labelEn}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {lang === 'ja' ? tp.labelEn : tp.labelJa}
              </div>
              <div className="text-xs text-emerald-600 mt-2 font-medium">
                {t('topicListening.question_count', {
                  count: (TOPIC_VOCAB_QUESTIONS[tp.id] || []).length,
                })}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const questions = isAll ? shuffledAll : TOPIC_VOCAB_QUESTIONS[topicId] || [];

  if (questions.length === 0) {
    return (
      <div className="space-y-4 fade-in">
        <HeaderBar
          t={t}
          onExit={onExit}
          onBack={() => setTopicId(null)}
          title={lang === 'ja' ? topicMeta.labelJa : topicMeta.labelEn}
        />
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          {t('topicListening.empty')}
        </div>
      </div>
    );
  }

  const q = questions[index];
  const correctIndex = q.answer;
  const isCorrect = answered && selected === correctIndex;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const goNext = () => {
    setAnswered(false);
    setSelected(null);
    setIndex((i) => (i + 1) % questions.length);
  };
  const goPrev = () => {
    setAnswered(false);
    setSelected(null);
    setIndex((i) => (i - 1 + questions.length) % questions.length);
  };

  return (
    <div className="space-y-4 fade-in">
      <HeaderBar
        t={t}
        onExit={onExit}
        onBack={() => setTopicId(null)}
        title={
          isAll
            ? t('topicListening.shuffle_all_button')
            : lang === 'ja'
            ? topicMeta.labelJa
            : topicMeta.labelEn
        }
      />

      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-violet-100 text-violet-700 border-violet-200">
            Level {q.level}
          </span>
          {isAll && q._packIcon && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-emerald-100 text-emerald-700 border-emerald-200">
              {q._packIcon} {lang === 'ja' ? q._packLabelJa : q._packLabelEn}
            </span>
          )}
          {q.topic && (
            <span className="text-xs text-slate-500 truncate">{q.topic}</span>
          )}
          <span className="text-xs text-slate-400 ml-2">
            {index + 1} / {questions.length}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {isAll && (
              <button
                type="button"
                onClick={reshuffleAll}
                className="px-3 py-1.5 text-xs rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
              >
                🔀 {t('topicVocab.reshuffle')}
              </button>
            )}
            <AudioPlayer text={q.passage} apiKey={apiKey} label={t('card.playAudio')} />
          </div>
        </div>

        <div className="px-5 pb-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[15px] leading-relaxed text-slate-800 whitespace-pre-wrap">
            {!answered ? (
              <span className="text-slate-400 italic">
                {t('card.listenInstruction')}
              </span>
            ) : (
              q.passage
            )}
          </div>
        </div>

        <div className="px-5 pb-3">
          <p className="text-[15px] font-medium text-slate-900">{q.question}</p>
        </div>

        <ul className="px-5 pb-4 space-y-2">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isAnswerCorrect = idx === correctIndex;

            let cls =
              'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40';
            if (answered) {
              if (isAnswerCorrect) cls = 'border-emerald-400 bg-emerald-50';
              else if (isSelected) cls = 'border-rose-400 bg-rose-50';
              else cls = 'border-slate-200 bg-white opacity-70';
            } else if (isSelected) {
              cls = 'border-blue-400 bg-blue-50';
            }

            return (
              <li key={idx}>
                <button
                  type="button"
                  disabled={answered}
                  onClick={() => {
                    setSelected(idx);
                    setAnswered(true);
                  }}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 border rounded-xl transition-colors ${cls} ${
                    answered ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span
                    className={`flex-none w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border ${
                      answered && isAnswerCorrect
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : answered && isSelected
                        ? 'bg-rose-500 text-white border-rose-500'
                        : isSelected
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-slate-600 border-slate-300'
                    }`}
                  >
                    {answered && isAnswerCorrect
                      ? '✓'
                      : answered && isSelected
                      ? '✕'
                      : optionLabels[idx]}
                  </span>
                  <span className="text-[15px] leading-snug text-slate-800 pt-1">
                    {opt}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {answered && (
          <div className="px-5 pb-5 fade-in">
            <div
              className={`rounded-xl p-4 border ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                <span className="font-semibold text-slate-900">
                  {isCorrect
                    ? t('card.correct')
                    : t('card.incorrect', { label: optionLabels[correctIndex] })}
                </span>
              </div>
              {q.ex && (
                <p className="text-sm text-slate-700 leading-relaxed">{q.ex}</p>
              )}
            </div>
          </div>
        )}

        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
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
            {answered ? t('card.next') : t('card.skip')}
          </button>
        </div>
      </article>
    </div>
  );
}

function HeaderBar({ t, onExit, onBack, title }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-none px-2 py-1 text-sm rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
          >
            ←
          </button>
        )}
        <div className="font-semibold text-emerald-900 truncate">{title}</div>
      </div>
      <button
        type="button"
        onClick={onExit}
        className="flex-none px-3 py-1.5 text-sm rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
      >
        {t('topicVocab.exit_button')}
      </button>
    </div>
  );
}
