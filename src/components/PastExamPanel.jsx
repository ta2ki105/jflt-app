import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import AudioPlayer from './AudioPlayer.jsx';
import { loadPastExamData, setUnlocked } from '../pastExamAuth.js';

export default function PastExamPanel({ apiKey, onLock }) {
  const { t } = useI18n();
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  // Level filter: 'all' | 2 | 3. Lets the user practise each level
  // separately.
  const [level, setLevel] = useState('all');

  useEffect(() => {
    let cancelled = false;
    loadPastExamData()
      .then((data) => {
        if (!cancelled) setQuestions(data || []);
      })
      .catch((e) => {
        console.error(e);
        if (!cancelled) setError(String(e?.message || e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLock = () => {
    setUnlocked(false);
    onLock?.();
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-5 text-sm text-rose-700">
        ❌ {t('pastExam.load_failed')}: {error}
      </div>
    );
  }

  if (!questions) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
        ⏳ {t('pastExam.loading')}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <PanelHeader t={t} onLock={handleLock} />
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
          📭 {t('pastExam.empty')}
        </div>
      </div>
    );
  }

  const levels = Array.from(new Set(questions.map((x) => x.level))).sort(
    (a, b) => a - b
  );
  const filtered =
    level === 'all' ? questions : questions.filter((x) => x.level === level);

  const changeLevel = (v) => {
    setLevel(v);
    setIndex(0);
    setAnswered(false);
    setSelected(null);
  };

  const levelFilter = (
    <LevelFilter
      t={t}
      levels={levels}
      current={level}
      counts={{
        all: questions.length,
        ...Object.fromEntries(
          levels.map((lv) => [lv, questions.filter((x) => x.level === lv).length])
        ),
      }}
      onChange={changeLevel}
    />
  );

  if (filtered.length === 0) {
    return (
      <div className="space-y-4 fade-in">
        <PanelHeader t={t} onLock={handleLock} />
        {levelFilter}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
          📭 {t('pastExam.level_empty')}
        </div>
      </div>
    );
  }

  const safeIndex = index % filtered.length;
  const q = filtered[safeIndex];
  const correctIndex = q.answer;
  const isCorrect = answered && selected === correctIndex;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const goNext = () => {
    setAnswered(false);
    setSelected(null);
    setIndex((i) => (i + 1) % filtered.length);
  };
  const goPrev = () => {
    setAnswered(false);
    setSelected(null);
    setIndex((i) => (i - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="space-y-4 fade-in">
      <PanelHeader t={t} onLock={handleLock} />
      {levelFilter}

      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-rose-100 text-rose-700 border-rose-200">
            🔒 {t('pastExam.badge')} · {t('pastExam.level_label')} {q.level}
          </span>
          {q.starred && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-amber-100 text-amber-800 border-amber-300"
              title={t('pastExam.starred_badge')}
            >
              {t('pastExam.starred_badge')}
            </span>
          )}
          {q.topic && (
            <span className="text-xs text-slate-500 truncate">{q.topic}</span>
          )}
          <span className="text-xs text-slate-400 ml-2">
            {safeIndex + 1} / {filtered.length}
          </span>
          {q.passage && (
            <div className="ml-auto">
              <AudioPlayer
                text={q.passage}
                apiKey={apiKey}
                label={t('card.playAudio')}
              />
            </div>
          )}
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

function LevelFilter({ t, levels, current, counts, onChange }) {
  const options = [
    { value: 'all', label: t('pastExam.filter_all'), count: counts.all },
    ...levels.map((lv) => ({
      value: lv,
      label: `${t('pastExam.level_label')} ${lv}`,
      count: counts[lv] || 0,
    })),
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = current === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              active
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
            }`}
          >
            {opt.label}
            <span
              className={`ml-1.5 text-xs ${
                active ? 'text-rose-100' : 'text-slate-400'
              }`}
            >
              {opt.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PanelHeader({ t, onLock }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold text-rose-900">🔒 {t('pastExam.panel_title')}</div>
        <div className="text-xs text-rose-700 mt-0.5">{t('pastExam.panel_subtitle')}</div>
      </div>
      <button
        type="button"
        onClick={onLock}
        className="px-3 py-1.5 text-sm rounded-lg bg-white border border-rose-300 text-rose-700 hover:bg-rose-100"
      >
        🔐 {t('pastExam.lock_button')}
      </button>
    </div>
  );
}
