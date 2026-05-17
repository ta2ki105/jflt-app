import { useState } from 'react';
import { WRITING_COACH_SCRIPT } from '../writingScript.js';
import { useI18n } from '../i18n/useI18n.js';

const TASK_KEYS = ['email', 'report', 'essay'];
const TASK_ICONS = { email: '✉️', report: '📋', essay: '📝' };
const AI_KEYS = [
  { id: 'gemini', url: 'https://gemini.google.com/' },
  { id: 'claude', url: 'https://claude.ai/' },
  { id: 'chatgpt', url: 'https://chat.openai.com/' },
];
const STEP_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6'];

export default function WritingPanel() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WRITING_COACH_SCRIPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Clipboard write failed', e);
      alert(t('writing.copy_failed'));
    }
  };

  const tips = t('writing.tips');
  const tipsArray = Array.isArray(tips) ? tips : [];

  return (
    <div className="space-y-5 fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          {t('writing.header_title')}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {t('writing.header_body')}
        </p>
      </div>

      {/* Task type overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">
          {t('writing.tasks_title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TASK_KEYS.map((key) => (
            <div
              key={key}
              className="border border-slate-200 rounded-xl p-3 bg-slate-50/40"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{TASK_ICONS[key]}</span>
                <div>
                  <div className="font-bold text-slate-900">
                    {t(`writing.tasks.${key}.label`)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {t(`writing.tasks.${key}.formality`)} ·{' '}
                    {t(`writing.tasks.${key}.words`)}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                {t(`writing.tasks.${key}.description`)}
              </p>
              <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-1.5">
                <span className="font-semibold">{t('writing.structure_label')}</span>{' '}
                {t(`writing.tasks.${key}.structure`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step instructions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">
          {t('writing.steps_title')}
        </h3>
        <ol className="space-y-2">
          {STEP_KEYS.map((sk, i) => (
            <li key={sk} className="flex items-start gap-3">
              <span className="flex-none w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">
                  {t(`writing.steps.${sk}_t`)}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {t(`writing.steps.${sk}_b`)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Supported AIs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">{t('writing.ai_title')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AI_KEYS.map((ai) => (
            <a
              key={ai.id}
              href={ai.url}
              target="_blank"
              rel="noreferrer"
              className="block border border-slate-200 rounded-xl p-3 hover:border-blue-400 hover:bg-blue-50/40 transition-colors"
            >
              <div className="font-semibold text-blue-700 text-sm">
                {t(`writing.ai.${ai.id}.name`)} ↗
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t(`writing.ai.${ai.id}.note`)}
              </div>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-3">{t('writing.ai_note')}</p>
      </div>

      {/* Script copy block */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <h3 className="font-semibold text-slate-900">{t('writing.script_title')}</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowScript((s) => !s)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {showScript ? t('writing.script_hide') : t('writing.script_show')}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? t('writing.script_copied') : t('writing.script_copy')}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {t('writing.script_intro')}
        </p>

        {showScript ? (
          <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-800 overflow-auto max-h-96 whitespace-pre-wrap leading-relaxed">
            {WRITING_COACH_SCRIPT}
          </pre>
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center text-xs text-slate-500">
            {t('writing.script_collapsed', {
              len: Math.round(WRITING_COACH_SCRIPT.length / 100) / 10,
            })}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-3">{t('writing.tips_title')}</h3>
        <ul className="space-y-1.5">
          {tipsArray.map((tip, i) => (
            <li
              key={i}
              className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed"
            >
              <span className="text-amber-500 flex-none">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-[11px] text-slate-400 text-center">
        {t('writing.script_managed_at')}{' '}
        <code className="font-mono">src/writingScript.js</code>
      </div>
    </div>
  );
}
