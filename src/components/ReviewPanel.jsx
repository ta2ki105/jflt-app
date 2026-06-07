import { useState, useMemo } from 'react';
import { useI18n } from '../i18n/useI18n.js';

/**
 * 復習タブ — Review previously-answered questions.
 *
 * Reads `stats.answeredQuestions` (populated by recordAnswer) and shows
 * each one with a ○ / × badge. Clicking a row expands an inline card so
 * the user can re-attempt the question. Re-attempt results flow back
 * through `onReattempt(category, level, qIndex, isCorrect)`.
 */
export default function ReviewPanel({ datasets, stats, onReattempt }) {
  const { t, lang } = useI18n();
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterResult, setFilterResult] = useState('all'); // all | correct | incorrect
  const [openKey, setOpenKey] = useState(null); // expanded question key
  const [reSelected, setReSelected] = useState(null);
  const [reAnswered, setReAnswered] = useState(false);

  const aq = stats.answeredQuestions || {};

  // Build a flat sorted list of attempts, then group for display.
  const items = useMemo(() => {
    const list = [];
    for (const [cat, perLevel] of Object.entries(aq)) {
      if (filterCategory !== 'all' && filterCategory !== cat) continue;
      for (const [lv, perQ] of Object.entries(perLevel || {})) {
        const level = Number(lv);
        for (const [qi, rec] of Object.entries(perQ || {})) {
          const qIndex = Number(qi);
          if (!rec) continue;
          if (filterResult === 'correct' && !rec.isCorrect) continue;
          if (filterResult === 'incorrect' && rec.isCorrect) continue;
          const question = datasets[cat]?.data?.[level]?.[qIndex];
          if (!question) continue; // dataset changed since last answer
          list.push({
            key: `${cat}|${level}|${qIndex}`,
            category: cat,
            level,
            qIndex,
            record: rec,
            question,
          });
        }
      }
    }
    // sort: incorrect first, then by most recent
    list.sort((a, b) => {
      if (a.record.isCorrect !== b.record.isCorrect) {
        return a.record.isCorrect ? 1 : -1;
      }
      return (b.record.lastAt || 0) - (a.record.lastAt || 0);
    });
    return list;
  }, [aq, datasets, filterCategory, filterResult]);

  // Group by category + level for visual sectioning
  const groups = useMemo(() => {
    const map = new Map();
    for (const item of items) {
      const groupKey = `${item.category}|${item.level}`;
      if (!map.has(groupKey)) {
        map.set(groupKey, {
          key: groupKey,
          category: item.category,
          level: item.level,
          items: [],
        });
      }
      map.get(groupKey).items.push(item);
    }
    return Array.from(map.values());
  }, [items]);

  const total = items.length;
  const correctCount = items.filter((i) => i.record.isCorrect).length;
  const incorrectCount = total - correctCount;

  const handleToggle = (key) => {
    if (openKey === key) {
      setOpenKey(null);
      setReSelected(null);
      setReAnswered(false);
    } else {
      setOpenKey(key);
      setReSelected(null);
      setReAnswered(false);
    }
  };

  const handleRetry = (item, idx) => {
    if (reAnswered) return;
    setReSelected(idx);
    setReAnswered(true);
    const isCorrect = idx === item.question.answer;
    onReattempt(item.category, item.level, item.qIndex, isCorrect);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      return d.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-GB', {
        month: 'short',
        day: 'numeric',
      });
    } catch (_) {
      return '';
    }
  };

  return (
    <div className="space-y-4 fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          {t('review.title')}
        </h2>
        <p className="text-sm text-slate-600">{t('review.intro')}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            {t('review.filter_category')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 text-xs rounded-lg border ${
                filterCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              {t('review.filter_all')}
            </button>
            {Object.entries(datasets).map(([key, info]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilterCategory(key)}
                className={`px-3 py-1 text-xs rounded-lg border ${
                  filterCategory === key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                {info.icon} {info.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            {t('review.filter_result')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setFilterResult('all')}
              className={`px-3 py-1 text-xs rounded-lg border ${
                filterResult === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              {t('review.filter_all')} ({total})
            </button>
            <button
              type="button"
              onClick={() => setFilterResult('correct')}
              className={`px-3 py-1 text-xs rounded-lg border ${
                filterResult === 'correct'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-emerald-700 border-emerald-200 hover:border-emerald-400'
              }`}
            >
              ○ {t('review.filter_correct')} ({correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterResult('incorrect')}
              className={`px-3 py-1 text-xs rounded-lg border ${
                filterResult === 'incorrect'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400'
              }`}
            >
              × {t('review.filter_incorrect')} ({incorrectCount})
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      {total === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-sm text-slate-500">
          {Object.keys(aq).length === 0
            ? t('review.empty')
            : t('review.empty_filtered')}
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.key}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-xs">
                <span className="text-base">
                  {datasets[group.category].icon}
                </span>
                <span className="font-semibold text-slate-700">
                  {datasets[group.category].label}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">L{group.level}</span>
                <span className="ml-auto text-slate-400">
                  {group.items.length}
                </span>
              </div>
              <ul className="divide-y divide-slate-100">
                {group.items.map((item) => {
                  const expanded = openKey === item.key;
                  const isCorrect = item.record.isCorrect;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => handleToggle(item.key)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50/60 flex items-start gap-3"
                      >
                        <span
                          className={`flex-none w-7 h-7 rounded-full flex items-center justify-center text-base font-bold ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                              : 'bg-rose-100 text-rose-700 border border-rose-300'
                          }`}
                          aria-label={isCorrect ? '○' : '×'}
                        >
                          {isCorrect ? '○' : '×'}
                        </span>
                        <span className="flex-1 min-w-0">
                          {item.question.topic && (
                            <div className="text-sm font-semibold text-slate-900 truncate">
                              {item.question.topic}
                            </div>
                          )}
                          <div className="text-xs text-slate-600 line-clamp-2">
                            {item.question.question}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                            <span>
                              {t('review.attempts_count', {
                                count: item.record.attempts || 1,
                              })}
                            </span>
                            {item.record.lastAt && (
                              <>
                                <span>·</span>
                                <span>
                                  {t('review.last_attempt', {
                                    date: formatDate(item.record.lastAt),
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                        </span>
                        <span className="text-xs text-slate-400 flex-none mt-1">
                          {expanded ? '▲' : '▼'}
                        </span>
                      </button>

                      {expanded && (
                        <div className="px-4 pb-4 fade-in">
                          {item.question.passage && (
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed mb-3">
                              {item.question.passage}
                            </div>
                          )}
                          <p className="text-sm font-medium text-slate-900 mb-2">
                            {item.question.question}
                          </p>
                          <ul className="space-y-1.5 mb-3">
                            {item.question.options.map((opt, oi) => {
                              const correctIdx = item.question.answer;
                              const showFeedback = reAnswered;
                              let cls =
                                'border-slate-200 bg-white hover:border-blue-300';
                              if (showFeedback) {
                                if (oi === correctIdx) {
                                  cls = 'border-emerald-400 bg-emerald-50';
                                } else if (oi === reSelected) {
                                  cls = 'border-rose-400 bg-rose-50';
                                } else {
                                  cls = 'border-slate-200 bg-white opacity-70';
                                }
                              } else if (oi === reSelected) {
                                cls = 'border-blue-400 bg-blue-50';
                              }
                              return (
                                <li key={oi}>
                                  <button
                                    type="button"
                                    disabled={reAnswered}
                                    onClick={() => handleRetry(item, oi)}
                                    className={`w-full text-left flex items-start gap-2 px-3 py-2 border rounded-lg transition-colors text-sm ${cls} ${
                                      reAnswered
                                        ? 'cursor-default'
                                        : 'cursor-pointer'
                                    }`}
                                  >
                                    <span
                                      className={`flex-none w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
                                        showFeedback && oi === correctIdx
                                          ? 'bg-emerald-500 text-white border-emerald-500'
                                          : showFeedback && oi === reSelected
                                          ? 'bg-rose-500 text-white border-rose-500'
                                          : oi === reSelected
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'bg-white text-slate-600 border-slate-300'
                                      }`}
                                    >
                                      {showFeedback && oi === correctIdx
                                        ? '✓'
                                        : showFeedback && oi === reSelected
                                        ? '✕'
                                        : optionLabels[oi]}
                                    </span>
                                    <span className="text-slate-800">
                                      {opt}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                          {reAnswered && (
                            <div
                              className={`rounded-lg p-3 border text-xs ${
                                reSelected === item.question.answer
                                  ? 'bg-emerald-50 border-emerald-200'
                                  : 'bg-amber-50 border-amber-200'
                              }`}
                            >
                              <div className="font-semibold mb-1 text-slate-900">
                                {reSelected === item.question.answer
                                  ? `✅ ${t('card.correct')}`
                                  : `❌ ${t('card.incorrect', {
                                      label: optionLabels[item.question.answer],
                                    })}`}
                              </div>
                              {item.question.ex && (
                                <p className="text-slate-700 leading-relaxed">
                                  {item.question.ex}
                                </p>
                              )}
                            </div>
                          )}
                          <div className="mt-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleToggle(item.key)}
                              className="text-xs text-slate-500 hover:text-slate-900"
                            >
                              {t('common.close')}
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
