import { useI18n } from '../i18n/useI18n.js';
import {
  calculateScore,
  categoryTotals,
  PASS_THRESHOLD,
  HALF_THRESHOLD,
} from '../scoring.js';

const SCORE_COLORS = {
  0: 'from-slate-400 to-slate-500',
  1: 'from-emerald-500 to-teal-600',
  2: 'from-sky-500 to-blue-600',
  3: 'from-violet-500 to-indigo-600',
  4: 'from-rose-500 to-fuchsia-600',
};

const STATUS_CLS = {
  pass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  half: 'bg-amber-100 text-amber-800 border-amber-300',
  fail: 'bg-rose-100 text-rose-700 border-rose-300',
  untested: 'bg-slate-100 text-slate-500 border-slate-200',
};

function CategoryCard({ name, label, icon, perLevel, onReset, t }) {
  const score = calculateScore(perLevel);
  const totals = categoryTotals(perLevel);
  const accuracy = totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : 0;
  const accent = SCORE_COLORS[score.baseLevel] || SCORE_COLORS[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-100">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-white text-2xl shadow-sm`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-slate-500">{label}</div>
          <div className="text-xs text-slate-400">
            {t('stats.score_progress', { correct: totals.correct, total: totals.total })} ({accuracy}%)
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase text-slate-400 tracking-wide">
            {t('stats.jflt_label')}
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums leading-none">
            {score.label}
          </div>
        </div>
      </div>

      {/* Per-level breakdown */}
      <div className="px-5 py-3 space-y-2">
        {score.breakdown.map((b) => {
          const statusCls = STATUS_CLS[b.status];
          const statusText = t(`pr.status.${b.status}`);
          const remaining = Math.max(0, PASS_THRESHOLD - b.correct);
          const widthPct = Math.min(
            100,
            Math.round((b.correct / PASS_THRESHOLD) * 100)
          );
          return (
            <div key={b.level} className="text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 w-7">
                  {t('stats.level', { lv: b.level })}
                </span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      b.status === 'pass'
                        ? 'bg-emerald-500'
                        : b.status === 'half'
                        ? 'bg-amber-400'
                        : 'bg-slate-300'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <span className="tabular-nums text-xs text-slate-600 w-14 text-right">
                  {t('stats.score_progress', { correct: b.correct, total: b.total })}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-md border ${statusCls}`}>
                  {statusText}
                </span>
              </div>
              {b.status !== 'pass' && b.total > 0 && (
                <div className="text-[11px] text-slate-400 ml-9 mt-0.5">
                  {t('stats.remaining', {
                    remaining,
                    pass: PASS_THRESHOLD,
                    half: HALF_THRESHOLD,
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-4 pt-1 flex justify-end">
        <button
          type="button"
          onClick={() => onReset(name)}
          className="text-xs text-slate-500 hover:text-rose-700"
        >
          {t('stats.reset_section')}
        </button>
      </div>
    </div>
  );
}

export default function Statistics({ stats, datasets, onResetAll, onResetCategory }) {
  const { t } = useI18n();
  // Aggregate top-line metrics
  let totalCorrect = 0;
  let totalAttempted = 0;
  for (const c of Object.keys(stats.perCategory)) {
    const tot = categoryTotals(stats.perCategory[c]);
    totalCorrect += tot.correct;
    totalAttempted += tot.total;
  }
  const overallAccuracy =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Overall score: minimum across the four sections
  const sectionScores = Object.entries(stats.perCategory).map(([k, pl]) => ({
    key: k,
    score: calculateScore(pl),
  }));
  const numeric = (s) => {
    if (s.label === '—') return -1;
    return s.baseLevel + (s.suffix === '+' ? 0.5 : 0);
  };
  const minScore = sectionScores.reduce(
    (acc, s) => (numeric(s.score) < numeric(acc.score) ? s : acc),
    sectionScores[0]
  );
  const overallLabel = sectionScores.every((s) => s.score.label === '—')
    ? '—'
    : minScore.score.label;

  const summaryCards = [
    {
      label: t('stats.summary.overall_jflt'),
      value: overallLabel,
      sub: t('stats.summary.overall_sub'),
      accent: SCORE_COLORS[minScore.score.baseLevel] || SCORE_COLORS[0],
      icon: '🎖️',
    },
    {
      label: t('stats.summary.correct_total'),
      value: `${totalCorrect} / ${totalAttempted}`,
      sub: t('stats.summary.correct_total_sub', { pct: overallAccuracy }),
      accent: 'from-blue-500 to-indigo-600',
      icon: '🎯',
    },
    {
      label: t('stats.summary.streak'),
      value: `${stats.streak}`,
      sub: t('stats.summary.streak_sub', { best: stats.bestStreak || 0 }),
      accent: 'from-amber-500 to-orange-600',
      icon: '🔥',
    },
  ];

  return (
    <div className="space-y-5 fade-in">
      {/* Top summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {summaryCards.map((c) => (
          <div
            key={c.label}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
          >
            <div
              className={`inline-flex w-9 h-9 rounded-lg items-center justify-center bg-gradient-to-br ${c.accent} text-white text-lg shadow-sm`}
            >
              {c.icon}
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-900 tabular-nums">
              {c.value}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{c.label}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Scoring rules legend */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm">
        <h3 className="font-semibold text-slate-900 mb-2">
          {t('stats.rules_title')}
        </h3>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>
            <strong className="text-emerald-700">≥ {PASS_THRESHOLD}</strong>
            {t('stats.rule_pass')}
          </li>
          <li>
            <strong className="text-amber-700">
              {HALF_THRESHOLD}–{PASS_THRESHOLD - 1}
            </strong>
            {t('stats.rule_half')}
          </li>
          <li>
            <strong className="text-rose-700">0–{HALF_THRESHOLD - 1}</strong>
            {t('stats.rule_fail')}
          </li>
          <li className="pt-1 text-slate-500">{t('stats.rules_note')}</li>
        </ul>
      </div>

      {/* Per-category cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(stats.perCategory).map(([key, perLevel]) => (
          <CategoryCard
            key={key}
            name={key}
            label={datasets[key].label}
            icon={datasets[key].icon}
            perLevel={perLevel}
            onReset={onResetCategory}
            t={t}
          />
        ))}
      </div>

      {/* Reset all */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-1">
          {t('stats.reset_title')}
        </h3>
        <p className="text-sm text-slate-600 mb-3">{t('stats.reset_body')}</p>
        <button
          type="button"
          onClick={onResetAll}
          className="px-4 py-2 text-sm rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
        >
          {t('stats.reset_btn')}
        </button>
      </div>
    </div>
  );
}
