import { useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { playAudio } from './AudioPlayer.jsx';
import { VOICE_CATALOG, loadVoicePrefs, saveVoicePrefs } from '../voicePrefs.js';

const SAMPLE_TEXT =
  'This is a test of the Google Cloud Text to Speech voice. Stand by for further instructions.';

const TIER_BADGE = {
  neural2: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  wavenet: 'bg-slate-50 text-slate-600 border-slate-200',
  studio:  'bg-amber-50 text-amber-700 border-amber-200',
};

export default function SettingsPanel({ apiKey, onSave }) {
  const { t } = useI18n();
  const [draft, setDraft] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testMsg, setTestMsg] = useState('');

  const [voicePrefs, setVoicePrefs] = useState(loadVoicePrefs);
  const [previewing, setPreviewing] = useState('');

  const handleSave = () => {
    onSave(draft.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleClear = () => {
    setDraft('');
    onSave('');
  };

  const handleTest = async () => {
    setTestMsg('');
    if (!draft.trim()) {
      setTestMsg(t('settings.test_no_key'));
      return;
    }
    setTesting(true);
    try {
      await playAudio(SAMPLE_TEXT, draft.trim(), { noKey: t('audio.noKey') });
      setTestMsg(t('settings.test_ok'));
    } catch (e) {
      console.error(e);
      setTestMsg(t('settings.test_fail', { error: e.message || 'Unknown error' }));
    } finally {
      setTesting(false);
    }
  };

  const updatePref = (patch) => {
    const next = { ...voicePrefs, ...patch };
    setVoicePrefs(next);
    saveVoicePrefs(patch);
  };

  const previewVoice = async (voiceName) => {
    if (!apiKey) {
      setTestMsg(t('settings.test_no_key'));
      return;
    }
    setPreviewing(voiceName);
    try {
      await playAudio(SAMPLE_TEXT, apiKey, { noKey: t('audio.noKey') }, { voiceName });
    } catch (e) {
      console.error(e);
    } finally {
      setPreviewing('');
    }
  };

  const renderVoicePicker = (gender) => {
    const list = VOICE_CATALOG[gender];
    const selected = voicePrefs[gender];
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {gender === 'male' ? t('settings.voice_male') : t('settings.voice_female')}
        </label>
        <div className="flex gap-2">
          <select
            value={selected}
            onChange={(e) => updatePref({ [gender]: e.target.value })}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
          >
            {list.map((v) => (
              <option key={v.name} value={v.name}>
                {v.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => previewVoice(selected)}
            disabled={previewing === selected || !apiKey}
            className="px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 disabled:opacity-50"
          >
            {previewing === selected ? '⏳' : '🔊'} {t('settings.voice_preview')}
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {list.map((v) => (
            <span
              key={v.name}
              className={`text-xs px-2 py-0.5 rounded border ${TIER_BADGE[v.tier]} ${
                v.name === selected ? 'ring-2 ring-offset-1 ring-blue-300' : ''
              }`}
            >
              {v.label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          {t('settings.api_title')}
        </h2>
        <p className="text-sm text-slate-600 mb-4">{t('settings.api_body')}</p>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t('settings.api_label')}
        </label>
        <div className="flex gap-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('settings.placeholder')}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowKey((s) => !s)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            {showKey ? t('settings.hide') : t('settings.show')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {t('settings.save')}
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="px-4 py-2 text-sm rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50"
          >
            {testing ? t('settings.testing') : t('settings.test')}
          </button>
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-sm rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
            >
              {t('settings.clear')}
            </button>
          )}
        </div>

        {saved && (
          <div className="mt-3 text-sm text-emerald-700">{t('settings.saved_msg')}</div>
        )}
        {testMsg && (
          <div
            className={`mt-3 text-sm ${
              testMsg.startsWith('✅') ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {testMsg}
          </div>
        )}

        {apiKey && (
          <div className="mt-4 text-xs text-slate-500">
            {t('settings.current_key')}{' '}
            <span className="font-mono">{apiKey.slice(0, 6)}…{apiKey.slice(-4)}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            {t('settings.voice_title')}
          </h3>
          <p className="text-sm text-slate-600">{t('settings.voice_body')}</p>
        </div>

        {renderVoicePicker('male')}
        {renderVoicePicker('female')}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t('settings.voice_default_gender')}
          </label>
          <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden">
            <button
              type="button"
              onClick={() => updatePref({ defaultGender: 'male' })}
              className={`px-4 py-1.5 text-sm ${
                voicePrefs.defaultGender === 'male'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t('settings.voice_male_short')}
            </button>
            <button
              type="button"
              onClick={() => updatePref({ defaultGender: 'female' })}
              className={`px-4 py-1.5 text-sm border-l border-slate-300 ${
                voicePrefs.defaultGender === 'female'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t('settings.voice_female_short')}
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">{t('settings.voice_default_hint')}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          {t('settings.pricing_title')}
        </h3>
        <p className="text-sm text-slate-600 mb-3">{t('settings.pricing_body')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-3 py-2 font-medium">{t('settings.pricing_col_tier')}</th>
                <th className="text-left px-3 py-2 font-medium">{t('settings.pricing_col_free')}</th>
                <th className="text-left px-3 py-2 font-medium">{t('settings.pricing_col_rate')}</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-t border-slate-200">
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded border ${TIER_BADGE.neural2}`}>Neural2</span>
                </td>
                <td className="px-3 py-2">{t('settings.pricing_free_neural')}</td>
                <td className="px-3 py-2">{t('settings.pricing_rate_neural')}</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded border ${TIER_BADGE.wavenet}`}>WaveNet</span>
                </td>
                <td className="px-3 py-2">{t('settings.pricing_free_neural')}</td>
                <td className="px-3 py-2">{t('settings.pricing_rate_neural')}</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded border ${TIER_BADGE.studio}`}>Studio</span>
                </td>
                <td className="px-3 py-2">{t('settings.pricing_free_studio')}</td>
                <td className="px-3 py-2">{t('settings.pricing_rate_studio')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
          <div className="font-medium text-slate-800">{t('settings.pricing_example_title')}</div>
          <div>{t('settings.pricing_example_basis')}</div>
          <div>• {t('settings.pricing_example_neural')}</div>
          <div>• {t('settings.pricing_example_studio')}</div>
        </div>
        <p className="mt-3 text-xs text-slate-500">{t('settings.pricing_source')}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-3">
          {t('settings.guide_title')}
        </h3>
        <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
          <li>
            {t('settings.guide_step1_a')}
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline"
            >
              {t('settings.guide_step1_b')}
            </a>
            {t('settings.guide_step1_c')}
          </li>
          <li>{t('settings.guide_step2')}</li>
          <li>{t('settings.guide_step3')}</li>
          <li>{t('settings.guide_step4')}</li>
          <li>{t('settings.guide_step5')}</li>
          <li>{t('settings.guide_step6')}</li>
        </ol>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          {t('settings.warn_shared')}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          {t('settings.audio_title')}
        </h3>
        <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
          <li>{t('settings.audio_use')}</li>
          <li>{t('settings.audio_cost')}</li>
        </ul>
      </div>
    </div>
  );
}
