import { useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { verifyPassword } from '../pastExamAuth.js';

export default function PastExamGate({ onUnlock, onClose }) {
  const { t } = useI18n();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setChecking(true);
    try {
      const ok = await verifyPassword(password);
      if (ok) {
        onUnlock();
      } else {
        setError(t('pastExam.wrong_password'));
      }
    } catch (err) {
      setError(t('pastExam.wrong_password'));
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          🔒 {t('pastExam.gate_title')}
        </h2>
        <p className="text-sm text-slate-600 mb-4">{t('pastExam.gate_body')}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('pastExam.gate_placeholder')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          {error && (
            <div className="mt-2 text-sm text-rose-700">❌ {error}</div>
          )}
          <div className="flex gap-2 mt-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {t('pastExam.gate_cancel')}
            </button>
            <button
              type="submit"
              disabled={checking || !password}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {checking ? '⏳' : t('pastExam.gate_submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
