import { useState, useMemo } from 'react';
import { useI18n } from '../i18n/useI18n.js';

function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Build one multiple-choice round: every word in the topic, each paired
// with 3 random same-topic distractors (options + answer position freshly
// shuffled). Runtime-generated rather than hand-authored, since a 90-word
// pool has plenty of distractor variety without needing static options.
function buildRound(words) {
  return shuffle(words).map((w) => {
    const distractors = shuffle(words.filter((x) => x.term !== w.term)).slice(0, 3);
    const options = shuffle([w, ...distractors]);
    return {
      word: w,
      options,
      answerIndex: options.findIndex((o) => o.term === w.term),
    };
  });
}

export default function TopicVocabQuiz({ topic }) {
  const { t } = useI18n();
  const [seed, setSeed] = useState(0);
  const round = useMemo(() => buildRound(topic.words), [topic, seed]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const q = round[index];
  const optionLabels = ['A', 'B', 'C', 'D'];
  const isCorrect = answered && selected === q.answerIndex;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setScore((s) => ({
      correct: s.correct + (idx === q.answerIndex ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const goNext = () => {
    setSelected(null);
    setAnswered(false);
    setIndex((i) => (i + 1) % round.length);
  };
  const goPrev = () => {
    setSelected(null);
    setAnswered(false);
    setIndex((i) => (i - 1 + round.length) % round.length);
  };
  const reshuffle = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore({ correct: 0, total: 0 });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {index + 1} / {round.length}
        </span>
        <span>{t('topicVocab.score', { correct: score.correct, total: score.total })}</span>
      </div>

      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <p className="text-xs text-slate-400 mb-1">{t('topicVocab.quiz_prompt')}</p>
          <p className="text-2xl font-semibold text-slate-900">{q.word.term}</p>
        </div>

        <ul className="px-5 pb-4 space-y-2">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isAnswerCorrect = idx === q.answerIndex;

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
              <li key={opt.term}>
                <button
                  type="button"
                  disabled={answered}
                  onClick={() => handleSelect(idx)}
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
                    {opt.jp}
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
                isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                <span className="font-semibold text-slate-900">
                  {isCorrect
                    ? t('card.correct')
                    : t('card.incorrect', { label: optionLabels[q.answerIndex] })}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                {q.word.example}
              </p>
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
            onClick={reshuffle}
            className="px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
          >
            🔀 {t('topicVocab.reshuffle')}
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
