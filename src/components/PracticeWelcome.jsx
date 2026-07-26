import { useI18n } from '../i18n/useI18n.js';

/**
 * Landing screen for the free-practice tab. Shown until the user actively
 * picks a skill + level and clicks Start. Keeps the app from auto-displaying
 * a question on first load.
 */
export default function PracticeWelcome({
  datasets,
  category,
  setCategory,
  level,
  setLevel,
  onStart,
  goToGradingTab,
  onOpenTopicVocab,
  onOpenTopicListening,
}) {
  const { t } = useI18n();

  // Question count per skill at each level (informational)
  const countAt = (dsKey, lv) => {
    const ds = datasets[dsKey].data;
    if (lv === 'all') {
      return [1, 2, 3, 4].reduce((sum, l) => sum + (ds[l]?.length || 0), 0);
    }
    return ds[lv]?.length || 0;
  };

  const LEVEL_OPTIONS = [
    { id: 'all', label: t('welcome.level_all') },
    { id: 1, label: t('welcome.level_one', { level: 1 }) },
    { id: 2, label: t('welcome.level_one', { level: 2 }) },
    { id: 3, label: t('welcome.level_one', { level: 3 }) },
    { id: 4, label: t('welcome.level_one', { level: 4 }) },
  ];

  return (
    <div className="space-y-5 fade-in">
      {onOpenTopicVocab && (
        <button
          type="button"
          onClick={onOpenTopicVocab}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <span className="text-3xl flex-none">🪖</span>
          <span className="text-left flex-1 min-w-0">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wide">
              {t('topicVocab.entry_badge')}
            </span>
            <span className="block font-semibold text-[15px] mt-1 truncate">
              {t('topicVocab.entry_button')}
            </span>
            <span className="block text-xs text-indigo-100 mt-0.5">
              {t('topicVocab.entry_subtitle')}
            </span>
          </span>
          <span className="text-2xl flex-none">→</span>
        </button>
      )}

      {onOpenTopicListening && (
        <button
          type="button"
          onClick={onOpenTopicListening}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition-colors"
        >
          <span className="text-2xl flex-none">🎧</span>
          <span className="text-left flex-1 min-w-0">
            <span className="block font-semibold text-sm truncate">
              {t('topicListening.entry_button')}
            </span>
            <span className="block text-xs text-emerald-700 mt-0.5">
              {t('topicListening.entry_subtitle')}
            </span>
          </span>
          <span className="text-lg flex-none text-emerald-400">→</span>
        </button>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          {t('welcome.title')}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-5">
          {t('welcome.body')}
        </p>

        {/* Skill picker */}
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {t('welcome.pick_skill')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {Object.entries(datasets).map(([key, info]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`px-3 py-3 text-sm rounded-xl border transition-all ${
                category === key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="text-xl">{info.icon}</div>
              <div className="font-medium mt-1">{info.label}</div>
              <div
                className={`text-[10px] mt-0.5 ${
                  category === key ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {t('welcome.level_count', { count: countAt(key, 'all') })}
              </div>
            </button>
          ))}
        </div>

        {/* Level picker */}
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {t('welcome.pick_level')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
          {LEVEL_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLevel(opt.id)}
              className={`px-2 py-2 text-sm rounded-lg border transition-colors ${
                level === opt.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              <div className="font-medium">{opt.label}</div>
              <div
                className={`text-[10px] mt-0.5 ${
                  level === opt.id ? 'text-slate-300' : 'text-slate-400'
                }`}
              >
                {t('welcome.level_count', { count: countAt(category, opt.id) })}
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm"
        >
          {t('welcome.start')}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 text-center">
        💡 {t('welcome.hint_grading_a')}{' '}
        <button
          type="button"
          onClick={goToGradingTab}
          className="underline font-semibold hover:text-blue-700"
        >
          {t('welcome.hint_grading_b')}
        </button>
      </div>
    </div>
  );
}
