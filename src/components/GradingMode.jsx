import { useState, useCallback, useMemo } from 'react';
import {
  createSession,
  tallySection,
  decideAdvance,
  buildHistoryEntry,
  appendHistory,
  loadHistory,
  clearHistory,
} from '../gradingMode.js';
import { MAX_LEVEL } from '../scoring.js';
import { useI18n } from '../i18n/useI18n.js';
import PracticeQuestionView from './PracticeQuestionView.jsx';
import PracticeResult from './PracticeResult.jsx';

const PHASE = {
  SETUP: 'setup',
  TESTING: 'testing',
  RESULT: 'result',
};

// Section has 15 questions (per official JFLT spec)
const QUESTIONS_PER_SECTION = 15;

export default function GradingMode({ datasets, apiKey }) {
  const { t, lang } = useI18n();
  const [phase, setPhase] = useState(PHASE.SETUP);
  const [skill, setSkill] = useState('reading');
  const [session, setSession] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [sectionAnswers, setSectionAnswers] = useState([]);
  const [answeredSections, setAnsweredSections] = useState([]);
  const [historyTick, setHistoryTick] = useState(0);

  const history = useMemo(() => loadHistory(), [historyTick]);

  const startTest = useCallback(() => {
    const s = createSession(skill, datasets[skill].data);
    setSession(s);
    setCurrentLevel(1);
    setCurrentIdx(0);
    setCurrentSelected(null);
    setSectionAnswers([]);
    setAnsweredSections([]);
    setPhase(PHASE.TESTING);
  }, [skill, datasets]);

  const handleClearHistory = () => {
    if (!window.confirm(t('grading.confirm_clear_history'))) return;
    clearHistory();
    setHistoryTick((tick) => tick + 1);
  };

  const currentSection = session?.sections[currentLevel - 1] || [];
  const currentQuestion = currentSection[currentIdx];

  const handleSelect = useCallback((idx) => {
    setCurrentSelected(idx);
  }, []);

  const handleNext = useCallback(() => {
    if (currentSelected == null || !currentQuestion) return;

    const nextAnswers = [
      ...sectionAnswers,
      { question: currentQuestion, selected: currentSelected },
    ];

    const isLastInSection = currentIdx + 1 >= currentSection.length;
    if (!isLastInSection) {
      setSectionAnswers(nextAnswers);
      setCurrentIdx((i) => i + 1);
      setCurrentSelected(null);
      return;
    }

    const result = tallySection(nextAnswers);
    const completedSection = {
      level: currentLevel,
      answers: nextAnswers,
      result,
    };
    const allSections = [...answeredSections, completedSection];
    setAnsweredSections(allSections);

    if (currentLevel < MAX_LEVEL && decideAdvance(currentLevel, result)) {
      setCurrentLevel((lv) => lv + 1);
      setCurrentIdx(0);
      setSectionAnswers([]);
      setCurrentSelected(null);
    } else {
      const entry = buildHistoryEntry({
        skill: session.skill,
        startedAt: session.startedAt,
        answeredSections: allSections,
      });
      appendHistory(entry);
      setHistoryTick((tick) => tick + 1);
      setPhase(PHASE.RESULT);
    }
  }, [
    currentSelected,
    currentQuestion,
    sectionAnswers,
    currentIdx,
    currentSection.length,
    currentLevel,
    answeredSections,
    session,
  ]);

  const handleAbort = () => {
    if (!window.confirm(t('grading.confirm_abort'))) return;
    setPhase(PHASE.SETUP);
    setSession(null);
  };

  const handleRestart = () => {
    setPhase(PHASE.SETUP);
    setSession(null);
  };

  if (phase === PHASE.SETUP) {
    return (
      <div className="space-y-4 fade-in">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('grading.title')}
          </h2>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            {t('grading.intro_p1')}
            <strong className="text-slate-900">
              {t('grading.intro_p2', {
                questionsPerSection: QUESTIONS_PER_SECTION,
                sections: MAX_LEVEL,
              })}
            </strong>
            {t('grading.intro_p3')}
            <strong>{t('grading.intro_p4')}</strong>
            {t('grading.intro_p5')}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 mb-4">
            <strong>{t('grading.note_label')}</strong>
            <ul className="mt-1 space-y-0.5 list-disc list-inside">
              <li>{t('grading.note_no_back')}</li>
              <li>
                {t('grading.note_audio_once_a')}
                <strong>{t('grading.note_audio_once_b')}</strong>
                {t('grading.note_audio_once_c')}
              </li>
              <li>{t('grading.note_reading_visible')}</li>
              <li>{t('grading.note_history')}</li>
            </ul>
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('grading.select_skill')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {Object.entries(datasets).map(([key, info]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSkill(key)}
                className={`px-3 py-2.5 text-sm rounded-xl border transition-all ${
                  skill === key
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="text-base">{info.icon}</div>
                <div className="font-medium">{info.label}</div>
              </button>
            ))}
          </div>

          {skill === 'listening' && !apiKey && (
            <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2 mb-3">
              {t('grading.api_warn')}
            </div>
          )}

          <button
            type="button"
            onClick={startTest}
            className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm"
          >
            {t('grading.start')}
          </button>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">
              {t('grading.history_title')}
            </h3>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs text-rose-700 hover:underline"
              >
                {t('grading.history_clear')}
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-slate-500">{t('grading.history_empty')}</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {history.map((h) => {
                const date = new Date(h.startedAt);
                const locale = lang === 'ja' ? 'ja-JP' : 'en-GB';
                const dateStr = date.toLocaleString(locale, {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const skillInfo = datasets[h.skill];
                return (
                  <li
                    key={h.id}
                    className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg text-sm"
                  >
                    <span className="text-base">{skillInfo?.icon || '📝'}</span>
                    <span className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900">
                        {skillInfo?.label || h.skill}
                      </div>
                      <div className="text-xs text-slate-500">{dateStr}</div>
                    </span>
                    <span className="text-2xl font-bold text-blue-700 tabular-nums">
                      {h.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }

  if (phase === PHASE.TESTING) {
    if (!currentQuestion) {
      return (
        <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
          {t('grading.load_failed')}
          <button
            type="button"
            onClick={handleAbort}
            className="block mx-auto mt-4 px-4 py-2 text-sm rounded-lg bg-slate-100 text-slate-700"
          >
            {t('grading.go_back')}
          </button>
        </div>
      );
    }
    return (
      <div className="space-y-3 fade-in">
        {/* Progress strip */}
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-2 flex items-center gap-3 text-xs">
          <span className="font-semibold text-slate-700">
            {t('grading.section_label', { current: currentLevel, total: MAX_LEVEL })}
          </span>
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${((currentIdx + 1) / currentSection.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-slate-600 tabular-nums">
            {t('grading.progress_count', {
              current: currentIdx + 1,
              total: currentSection.length,
            })}
          </span>
          <button
            type="button"
            onClick={handleAbort}
            className="text-xs text-slate-500 hover:text-rose-700 ml-2"
          >
            {t('grading.abort')}
          </button>
        </div>

        <PracticeQuestionView
          question={currentQuestion}
          questionIndex={currentIdx}
          totalInSection={currentSection.length}
          level={currentLevel}
          skill={session.skill}
          apiKey={apiKey}
          selected={currentSelected}
          onSelect={handleSelect}
          onNext={handleNext}
          isLast={currentIdx + 1 >= currentSection.length}
        />
      </div>
    );
  }

  if (phase === PHASE.RESULT) {
    const lastSkill = session?.skill || skill;
    return (
      <PracticeResult
        skillLabel={datasets[lastSkill].label}
        skillIcon={datasets[lastSkill].icon}
        answeredSections={answeredSections}
        durationSec={Math.round((Date.now() - session.startedAt) / 1000)}
        onRestart={startTest}
        onExit={handleRestart}
      />
    );
  }

  return null;
}
