import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  createSession,
  tallySection,
  decideAdvance,
  buildHistoryEntry,
  appendHistory,
  loadHistory,
  clearHistory,
  saveProgress,
  loadProgress,
  clearProgress,
  TIME_LIMIT_MINUTES,
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

function formatClock(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

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

  // Timer state. `pausedElapsedSec` accumulates time across runs (paused
  // intervals are not counted). `tickStartedAt` is the wall-clock time when
  // the current testing tick began.
  const [pausedElapsedSec, setPausedElapsedSec] = useState(0);
  const tickStartedAtRef = useRef(null);
  const [nowTick, setNowTick] = useState(0); // forces re-render every second

  // Saved progress (for showing "resume" prompt in setup view)
  const [savedProgress, setSavedProgress] = useState(null);

  // Which history entry is currently expanded for detail view
  const [openHistoryId, setOpenHistoryId] = useState(null);

  const history = useMemo(() => loadHistory(), [historyTick]);

  // Check for saved progress on mount + whenever we return to setup
  useEffect(() => {
    if (phase === PHASE.SETUP) {
      setSavedProgress(loadProgress());
    }
  }, [phase]);

  // Tick interval — only runs in TESTING phase
  useEffect(() => {
    if (phase !== PHASE.TESTING) return;
    const id = setInterval(() => setNowTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Keep a ref of the latest test state so the unmount handler (which fires
  // when the user navigates to another tab during a test) can save current
  // progress without depending on the closure captured at mount time.
  const liveStateRef = useRef({});
  liveStateRef.current = {
    phase,
    session,
    currentLevel,
    currentIdx,
    currentSelected,
    sectionAnswers,
    answeredSections,
    pausedElapsedSec,
    tickStartedAt: tickStartedAtRef.current,
  };

  // Helper: snapshot current test state and persist it. Used by both the
  // explicit pause button and the auto-save-on-unmount effect below.
  const persistCurrentProgress = useCallback((reason = 'unmount') => {
    const s = liveStateRef.current;
    if (s.phase !== PHASE.TESTING || !s.session) return;
    const elapsed =
      s.pausedElapsedSec +
      (s.tickStartedAt != null
        ? (Date.now() - s.tickStartedAt) / 1000
        : 0);
    saveProgress({
      skill: s.session.skill,
      session: s.session,
      currentLevel: s.currentLevel,
      currentIdx: s.currentIdx,
      currentSelected: s.currentSelected,
      sectionAnswers: s.sectionAnswers,
      answeredSections: s.answeredSections,
      elapsedSec: Math.round(elapsed),
      savedAt: Date.now(),
      reason,
    });
  }, []);

  // Auto-save on:
  //   * component unmount (user switches to another tab → GradingMode unmounts)
  //   * browser tab close / refresh (beforeunload)
  // This prevents the in-flight test from silently disappearing.
  useEffect(() => {
    const onBeforeUnload = () => persistCurrentProgress('beforeunload');
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      persistCurrentProgress('unmount');
    };
  }, [persistCurrentProgress]);

  const currentElapsedSec = useMemo(() => {
    if (phase !== PHASE.TESTING || tickStartedAtRef.current == null) {
      return pausedElapsedSec;
    }
    // nowTick is read only to trigger re-render; real value uses Date.now()
    void nowTick;
    return pausedElapsedSec + (Date.now() - tickStartedAtRef.current) / 1000;
  }, [phase, pausedElapsedSec, nowTick]);

  const startTest = useCallback(() => {
    const s = createSession(skill, datasets[skill].data);
    setSession(s);
    setCurrentLevel(1);
    setCurrentIdx(0);
    setCurrentSelected(null);
    setSectionAnswers([]);
    setAnsweredSections([]);
    setPausedElapsedSec(0);
    tickStartedAtRef.current = Date.now();
    // A new test invalidates any saved progress.
    clearProgress();
    setSavedProgress(null);
    setPhase(PHASE.TESTING);
  }, [skill, datasets]);

  // Restore from saved progress
  const resumeTest = useCallback(() => {
    if (!savedProgress) return;
    setSkill(savedProgress.skill);
    setSession(savedProgress.session);
    setCurrentLevel(savedProgress.currentLevel);
    setCurrentIdx(savedProgress.currentIdx);
    setCurrentSelected(savedProgress.currentSelected ?? null);
    setSectionAnswers(savedProgress.sectionAnswers || []);
    setAnsweredSections(savedProgress.answeredSections || []);
    setPausedElapsedSec(savedProgress.elapsedSec || 0);
    tickStartedAtRef.current = Date.now();
    setPhase(PHASE.TESTING);
  }, [savedProgress]);

  const discardSaved = useCallback(() => {
    if (!window.confirm(t('grading.confirm_discard'))) return;
    clearProgress();
    setSavedProgress(null);
  }, [t]);

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
      clearProgress(); // test completed
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

  // Pause + save progress (returns to setup, can be resumed later)
  const handlePause = useCallback(() => {
    if (!session) return;
    if (!window.confirm(t('grading.confirm_pause'))) return;
    const elapsed =
      pausedElapsedSec +
      (tickStartedAtRef.current != null
        ? (Date.now() - tickStartedAtRef.current) / 1000
        : 0);
    saveProgress({
      skill: session.skill,
      session,
      currentLevel,
      currentIdx,
      currentSelected,
      sectionAnswers,
      answeredSections,
      elapsedSec: Math.round(elapsed),
      savedAt: Date.now(),
    });
    tickStartedAtRef.current = null;
    setPhase(PHASE.SETUP);
  }, [
    session,
    currentLevel,
    currentIdx,
    currentSelected,
    sectionAnswers,
    answeredSections,
    pausedElapsedSec,
    t,
  ]);

  // Abort without saving (discards progress)
  const handleAbort = useCallback(() => {
    if (!window.confirm(t('grading.confirm_abort'))) return;
    clearProgress();
    setSavedProgress(null);
    tickStartedAtRef.current = null;
    setPhase(PHASE.SETUP);
    setSession(null);
  }, [t]);

  const handleRestart = () => {
    tickStartedAtRef.current = null;
    setPhase(PHASE.SETUP);
    setSession(null);
  };

  if (phase === PHASE.SETUP) {
    return (
      <div className="space-y-4 fade-in">
        {/* Resume saved progress prompt */}
        {savedProgress && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-none">⏸️</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 mb-1">
                  {t('grading.resume_title')}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {t('grading.resume_body', {
                    skill:
                      datasets[savedProgress.skill]?.label || savedProgress.skill,
                    section: savedProgress.currentLevel,
                    question: savedProgress.currentIdx + 1,
                    elapsed: formatClock(savedProgress.elapsedSec || 0),
                    date: new Date(savedProgress.savedAt).toLocaleString(
                      lang === 'ja' ? 'ja-JP' : 'en-GB',
                      {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    ),
                  })}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={resumeTest}
                    className="px-4 py-2 text-sm rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700"
                  >
                    {t('grading.resume_btn')}
                  </button>
                  <button
                    type="button"
                    onClick={discardSaved}
                    className="px-4 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    {t('grading.discard_btn')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
              <li>{t('grading.note_pause')}</li>
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
                <div
                  className={`text-[10px] mt-0.5 ${
                    skill === key ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {t('grading.time_target', {
                    min: TIME_LIMIT_MINUTES[key] ?? 30,
                  })}
                </div>
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
            <ul className="space-y-2 max-h-[28rem] overflow-y-auto">
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
                const expanded = openHistoryId === h.id;
                // Build per-level row data. entry.sections may be missing
                // levels that weren't reached — fill them with untested.
                const perLevel = [];
                for (let lv = 1; lv <= MAX_LEVEL; lv++) {
                  const s = (h.sections || []).find((x) => x.level === lv);
                  perLevel.push({
                    level: lv,
                    correct: s?.correct ?? 0,
                    total: s?.total ?? 0,
                    status: !s
                      ? 'untested'
                      : s.correct >= 10
                      ? 'pass'
                      : s.correct >= 7
                      ? 'half'
                      : 'fail',
                  });
                }
                const totalCorrect = perLevel.reduce((a, b) => a + b.correct, 0);
                const totalAttempted = perLevel.reduce((a, b) => a + b.total, 0);
                const durM = Math.floor((h.durationSec || 0) / 60);
                const durS = Math.round((h.durationSec || 0) % 60);
                return (
                  <li
                    key={h.id}
                    className="border border-slate-100 rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenHistoryId(expanded ? null : h.id)}
                      className="w-full text-left flex items-center gap-3 p-2 hover:bg-slate-50/60"
                    >
                      <span className="text-base">{skillInfo?.icon || '📝'}</span>
                      <span className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 text-sm">
                          {skillInfo?.label || h.skill}
                        </div>
                        <div className="text-xs text-slate-500">
                          {dateStr} ・ {totalCorrect}/{totalAttempted}
                        </div>
                      </span>
                      <span className="text-2xl font-bold text-blue-700 tabular-nums">
                        {h.label}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        {expanded ? '▲' : '▼'}
                      </span>
                    </button>

                    {expanded && (
                      <div className="px-3 pb-3 pt-1 bg-slate-50/40 fade-in space-y-2">
                        {perLevel.map((row) => {
                          const widthPct =
                            row.total > 0
                              ? Math.round((row.correct / 15) * 100)
                              : 0;
                          const barCls =
                            row.status === 'pass'
                              ? 'bg-emerald-500'
                              : row.status === 'half'
                              ? 'bg-amber-400'
                              : row.status === 'fail'
                              ? 'bg-rose-400'
                              : 'bg-slate-200';
                          const badgeCls =
                            row.status === 'pass'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : row.status === 'half'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : row.status === 'fail'
                              ? 'bg-rose-100 text-rose-700 border-rose-300'
                              : 'bg-slate-100 text-slate-500 border-slate-200';
                          return (
                            <div
                              key={row.level}
                              className="flex items-center gap-2 text-xs"
                            >
                              <span className="font-mono text-slate-500 w-7">
                                L{row.level}
                              </span>
                              <div className="flex-1 h-2 bg-white border border-slate-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${barCls}`}
                                  style={{ width: `${widthPct}%` }}
                                />
                              </div>
                              <span className="tabular-nums text-slate-700 w-12 text-right">
                                {row.correct}/{row.total || 15}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded border ${badgeCls}`}
                              >
                                {t(`pr.status.${row.status}`)}
                              </span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                          <span>
                            ⏱ {durM}:{String(durS).padStart(2, '0')}
                          </span>
                          <span>
                            {t('grading.history_total_correct', {
                              correct: totalCorrect,
                              total: totalAttempted,
                            })}
                          </span>
                        </div>
                      </div>
                    )}
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

    const limitMin = TIME_LIMIT_MINUTES[session.skill] ?? 30;
    const limitSec = limitMin * 60;
    const elapsedSec = Math.floor(currentElapsedSec);
    const pct = limitSec > 0 ? (elapsedSec / limitSec) * 100 : 0;
    let timerCls = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (pct >= 100) timerCls = 'text-rose-700 bg-rose-50 border-rose-200';
    else if (pct >= 80) timerCls = 'text-amber-700 bg-amber-50 border-amber-200';

    return (
      <div className="space-y-3 fade-in">
        {/* Timer bar */}
        <div
          className={`rounded-xl border px-4 py-2 flex items-center gap-3 text-xs ${timerCls}`}
        >
          <span className="text-base">⏱️</span>
          <span className="font-semibold tabular-nums">
            {formatClock(elapsedSec)}
          </span>
          <span className="text-slate-500">/</span>
          <span className="tabular-nums">{limitMin}:00</span>
          <div className="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                pct >= 100
                  ? 'bg-rose-500'
                  : pct >= 80
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-wide opacity-70">
            {t('grading.timer_label')}
          </span>
        </div>

        {/* Progress strip */}
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-2 flex items-center gap-3 text-xs">
          <span className="font-semibold text-slate-700">
            {t('grading.section_label', {
              current: currentLevel,
              total: MAX_LEVEL,
            })}
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
            onClick={handlePause}
            className="text-xs text-blue-700 hover:underline ml-2"
          >
            {t('grading.pause')}
          </button>
          <button
            type="button"
            onClick={handleAbort}
            className="text-xs text-slate-500 hover:text-rose-700"
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
        durationSec={Math.round(currentElapsedSec)}
        onRestart={startTest}
        onExit={handleRestart}
      />
    );
  }

  return null;
}
