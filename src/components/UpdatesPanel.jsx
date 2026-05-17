import { CHANGELOG_ENTRIES, TAG_STYLES } from '../changelog.js';
import { useI18n } from '../i18n/useI18n.js';

/**
 * Lightweight changelog / patch-notes view.
 * Entries live in src/changelog.js. Localised titles + descriptions live in
 * src/i18n/messages.js under `changelog.entries.<id>`.
 */
export default function UpdatesPanel() {
  const { t, lang } = useI18n();

  const formatDate = (isoDate) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (_) {
      return isoDate;
    }
  };

  return (
    <div className="space-y-5 fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          {t('changelog.title')}
        </h2>
        <p className="text-sm text-slate-600">{t('changelog.intro')}</p>
      </div>

      {CHANGELOG_ENTRIES.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-sm text-slate-500">
          {t('changelog.empty')}
        </div>
      ) : (
        <ol className="space-y-3">
          {CHANGELOG_ENTRIES.map((entry) => {
            const tagCls = TAG_STYLES[entry.tag] || TAG_STYLES.improvement;
            const tagLabel = t(`changelog.tags.${entry.tag}`);
            const title = t(`changelog.entries.${entry.id}.title`);
            const desc = t(`changelog.entries.${entry.id}.desc`);
            return (
              <li
                key={entry.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${tagCls}`}
                  >
                    {tagLabel}
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {desc}
                </p>
              </li>
            );
          })}
        </ol>
      )}

      <p className="text-[11px] text-slate-400 text-center">
        <a
          href="https://github.com/ta2ki105/jflt-app/commits/master"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600"
        >
          GitHub: full commit history ↗
        </a>
      </p>
    </div>
  );
}
