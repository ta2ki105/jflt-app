import {
  calculateScore,
  categoryTotals,
  PASS_THRESHOLD,
  HALF_THRESHOLD,
  MAX_LEVEL,
} from '../scoring.js';

const SCORE_COLORS = {
  0: 'from-slate-400 to-slate-500',
  1: 'from-emerald-500 to-teal-600',
  2: 'from-sky-500 to-blue-600',
  3: 'from-violet-500 to-indigo-600',
  4: 'from-rose-500 to-fuchsia-600',
};

const STATUS_LABEL = {
  pass: { text: '合格', cls: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  half: { text: '+', cls: 'bg-amber-100 text-amber-800 border-amber-300' },
  fail: { text: '未到達', cls: 'bg-rose-100 text-rose-700 border-rose-300' },
  untested: { text: '未挑戦', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
};

function CategoryCard({ name, label, icon, perLevel, onReset }) {
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
            {totals.correct} / {totals.total} 正解 ({accuracy}%)
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase text-slate-400 tracking-wide">JFLT</div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums leading-none">
            {score.label}
          </div>
        </div>
      </div>

      {/* Per-level breakdown */}
      <div className="px-5 py-3 space-y-2">
        {score.breakdown.map((b) => {
          const status = STATUS_LABEL[b.status];
          const remaining = Math.max(0, PASS_THRESHOLD - b.correct);
          const widthPct = Math.min(
            100,
            Math.round((b.correct / PASS_THRESHOLD) * 100)
          );
          return (
            <div key={b.level} className="text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 w-7">L{b.level}</span>
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
                  {b.correct} / {b.total}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-md border ${status.cls}`}
                >
                  {status.text}
                </span>
              </div>
              {b.status !== 'pass' && b.total > 0 && (
                <div className="text-[11px] text-slate-400 ml-9 mt-0.5">
                  あと {remaining} 問正解で合格 (基準 {PASS_THRESHOLD} / +付 {HALF_THRESHOLD})
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
          このセクションをリセット
        </button>
      </div>
    </div>
  );
}

export default function Statistics({ stats, datasets, onResetAll, onResetCategory }) {
  // Aggregate top-line metrics
  let totalCorrect = 0;
  let totalAttempted = 0;
  for (const c of Object.keys(stats.perCategory)) {
    const t = categoryTotals(stats.perCategory[c]);
    totalCorrect += t.correct;
    totalAttempted += t.total;
  }
  const overallAccuracy =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Overall score: minimum across the four sections (the JFLT pass requires
  // hitting the level in every section)
  const sectionScores = Object.entries(stats.perCategory).map(([k, pl]) => ({
    key: k,
    score: calculateScore(pl),
  }));
  // Encode level for comparison: "2+" → 2.5, "3" → 3
  const numeric = (s) => {
    if (s.label === '—') return -1;
    return s.baseLevel + (s.suffix === '+' ? 0.5 : 0);
  };
  const minScore = sectionScores.reduce(
    (acc, s) => (numeric(s.score) < numeric(acc.score) ? s : acc),
    sectionScores[0]
  );
  const overallLabel =
    sectionScores.every((s) => s.score.label === '—')
      ? '—'
      : minScore.score.label;

  const summaryCards = [
    {
      label: '総合 JFLT',
      value: overallLabel,
      sub: '4セクションの最低値',
      accent: SCORE_COLORS[minScore.score.baseLevel] || SCORE_COLORS[0],
      icon: '🎖️',
    },
    {
      label: '正解 / 全問',
      value: `${totalCorrect} / ${totalAttempted}`,
      sub: `正解率 ${overallAccuracy}%`,
      accent: 'from-blue-500 to-indigo-600',
      icon: '🎯',
    },
    {
      label: '連続正解',
      value: `${stats.streak}`,
      sub: `最高 ${stats.bestStreak || 0}`,
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
        <h3 className="font-semibold text-slate-900 mb-2">📐 採点基準</h3>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>
            <strong className="text-emerald-700">10問以上正解</strong>
            ：そのレベルの評価が付与され、上位レベルへ進む
          </li>
          <li>
            <strong className="text-amber-700">7〜9問正解</strong>
            ：前のレベルに「+」が付く（例: L2で7-9問→<code className="font-mono">1+</code>）
          </li>
          <li>
            <strong className="text-rose-700">0〜6問正解</strong>
            ：前のレベルが付与される（例: L2で6問以下→<code className="font-mono">1</code>）
          </li>
          <li className="pt-1 text-slate-500">
            総合 JFLT は 4セクションの最低値です（全セクションで一定レベルを満たす必要あり）。
          </li>
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
          />
        ))}
      </div>

      {/* Reset all */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-1">統計のリセット</h3>
        <p className="text-sm text-slate-600 mb-3">
          全セクションの記録を削除して、最初から学習し直すことができます。
        </p>
        <button
          type="button"
          onClick={onResetAll}
          className="px-4 py-2 text-sm rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
        >
          🗑️ 全統計をリセット
        </button>
      </div>
    </div>
  );
}
