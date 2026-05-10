export default function Statistics({ stats, onReset }) {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  const cards = [
    {
      label: '正解 / 全問',
      value: `${stats.correct} / ${stats.total}`,
      accent: 'from-blue-500 to-indigo-600',
      icon: '🎯',
    },
    {
      label: '正解率',
      value: `${accuracy}%`,
      accent: 'from-emerald-500 to-teal-600',
      icon: '📈',
    },
    {
      label: '連続正解',
      value: `${stats.streak}`,
      accent: 'from-amber-500 to-orange-600',
      icon: '🔥',
    },
    {
      label: '最高連続',
      value: `${stats.bestStreak || 0}`,
      accent: 'from-violet-500 to-purple-600',
      icon: '🏆',
    },
  ];

  return (
    <div className="space-y-5 fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((c) => (
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
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">正解率</span>
          <span className="text-sm tabular-nums text-slate-600">{accuracy}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
            style={{ width: `${accuracy}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          解いた問題数: {stats.total} 問
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-1">統計のリセット</h3>
        <p className="text-sm text-slate-600 mb-3">
          記録を削除して、最初から学習し直すことができます。
        </p>
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 text-sm rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
        >
          🗑️ 統計をリセット
        </button>
      </div>
    </div>
  );
}
