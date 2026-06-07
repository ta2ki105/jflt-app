import { useState, useEffect, useMemo, useCallback } from 'react';
import { READING, LISTENING, VOCAB, GRAMMAR } from './data.js';
import {
  emptyStats,
  migrateStats,
  recordAnswer,
  recordReattempt,
} from './scoring.js';
import { useI18n } from './i18n/useI18n.js';
import QuestionCard from './components/QuestionCard.jsx';
import PracticeWelcome from './components/PracticeWelcome.jsx';
import ReviewPanel from './components/ReviewPanel.jsx';
import Statistics from './components/Statistics.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import GradingMode from './components/GradingMode.jsx';
import WritingPanel from './components/WritingPanel.jsx';
import UpdatesPanel from './components/UpdatesPanel.jsx';
import './App.css';

const DATASETS = {
  reading: { label: 'Reading', icon: '📖', data: READING, hasAudio: true },
  listening: { label: 'Listening', icon: '🎧', data: LISTENING, hasAudio: true },
  vocab: { label: 'Vocab', icon: '🔤', data: VOCAB, hasAudio: false },
  grammar: { label: 'Grammar', icon: '✏️', data: GRAMMAR, hasAudio: false },
};

const LEVELS = ['all', 1, 2, 3, 4];

function flattenByLevel(dataset, level) {
  if (level === 'all') {
    return [1, 2, 3, 4].flatMap((lv) =>
      (dataset[lv] || []).map((q, idx) => ({ ...q, _level: lv, _qIndex: idx }))
    );
  }
  return (dataset[level] || []).map((q, idx) => ({
    ...q,
    _level: level,
    _qIndex: idx,
  }));
}

const STATS_KEY = 'jflt_stats_v2';
const LEGACY_STATS_KEY = 'jflt_stats';
const API_KEY_STORAGE = 'gcloud_api_key';

export default function App() {
  const { t, lang, setLang } = useI18n();

  const [currentTab, setCurrentTab] = useState('questions');
  const [category, setCategory] = useState('reading');
  const [level, setLevel] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState(emptyStats);
  const [apiKey, setApiKey] = useState('');
  // Gate: Practice tab shows a welcome screen until the user clicks "Start".
  // Avoids auto-displaying Reading L1 the moment the app loads.
  const [practiceStarted, setPracticeStarted] = useState(false);

  // Load persisted state (with migration from legacy v1 stats).
  // Note: streak is intentionally reset to 0 on each app open so the
  // "current streak" display starts fresh per session. Lifetime stats
  // (per-category correct/total counts) and bestStreak are preserved.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      let loaded = null;
      if (saved) {
        loaded = migrateStats(JSON.parse(saved));
      } else {
        const legacy = localStorage.getItem(LEGACY_STATS_KEY);
        if (legacy) loaded = migrateStats(JSON.parse(legacy));
      }
      if (loaded) {
        loaded.streak = 0;
        setStats(loaded);
      }
    } catch (e) {
      console.warn('Failed to load stats', e);
    }
    const savedKey = localStorage.getItem(API_KEY_STORAGE);
    if (savedKey) setApiKey(savedKey);
  }, []);

  // Reset position when category/level changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
  }, [category, level]);

  const questions = useMemo(
    () => flattenByLevel(DATASETS[category].data, level),
    [category, level]
  );

  const totalQuestions = questions.length;
  const safeIndex =
    totalQuestions === 0 ? 0 : Math.min(currentIndex, totalQuestions - 1);
  const currentQuestion = questions[safeIndex];

  const persistStats = useCallback((newStats) => {
    setStats(newStats);
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    } catch (e) {
      console.warn('Failed to save stats', e);
    }
  }, []);

  const handleSelect = useCallback(
    (idx) => {
      if (answered || !currentQuestion) return;
      setSelectedAnswer(idx);
      setAnswered(true);

      const isCorrect = idx === currentQuestion.answer;
      const next = recordAnswer(
        stats,
        category,
        currentQuestion._level,
        currentQuestion._qIndex,
        isCorrect
      );
      persistStats(next);
    },
    [answered, currentQuestion, stats, persistStats, category]
  );

  const goNext = useCallback(() => {
    setSelectedAnswer(null);
    setAnswered(false);
    setCurrentIndex((i) =>
      totalQuestions === 0 ? 0 : (i + 1) % totalQuestions
    );
  }, [totalQuestions]);

  const goPrev = useCallback(() => {
    setSelectedAnswer(null);
    setAnswered(false);
    setCurrentIndex((i) =>
      totalQuestions === 0 ? 0 : (i - 1 + totalQuestions) % totalQuestions
    );
  }, [totalQuestions]);

  const handleResetStats = () => {
    if (window.confirm(t('alerts.confirm_reset_stats'))) {
      persistStats(emptyStats());
    }
  };

  const handleResetCategory = (cat) => {
    if (
      !window.confirm(
        t('alerts.confirm_reset_category', { label: DATASETS[cat].label })
      )
    )
      return;
    const next = {
      ...stats,
      perCategory: {
        ...stats.perCategory,
        [cat]: {
          1: { correct: 0, total: 0 },
          2: { correct: 0, total: 0 },
          3: { correct: 0, total: 0 },
          4: { correct: 0, total: 0 },
        },
      },
    };
    persistStats(next);
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) localStorage.setItem(API_KEY_STORAGE, key);
    else localStorage.removeItem(API_KEY_STORAGE);
  };

  const datasetMeta = DATASETS[category];

  const TABS = [
    { id: 'questions', label: t('tabs.questions'), icon: '📝' },
    { id: 'review', label: t('tabs.review'), icon: '📚' },
    { id: 'grading', label: t('tabs.grading'), icon: '🎖️' },
    { id: 'writing', label: t('tabs.writing'), icon: '✍️' },
    { id: 'stats', label: t('tabs.stats'), icon: '📊' },
    { id: 'updates', label: t('tabs.updates'), icon: '📰' },
    { id: 'settings', label: t('tabs.settings'), icon: '⚙️' },
  ];

  const handleReattempt = useCallback(
    (cat, lv, qIdx, isCorrect) => {
      persistStats(recordReattempt(stats, cat, lv, qIdx, isCorrect));
    },
    [stats, persistStats]
  );

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm flex-none">
              J
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-900 leading-tight truncate">
                {t('header.brand')}
                <span className="ml-1.5 text-[10px] font-normal text-slate-300 italic tracking-wide">
                  by Tatsuki
                </span>
              </h1>
              <p className="text-xs text-slate-500 leading-tight truncate">
                {t('header.tagline')}
              </p>
            </div>
          </div>
          {/* Language toggle (row 1 on mobile, end of row on desktop) */}
          <div
            className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold sm:order-3"
            role="group"
            aria-label={t('header.langSwitch')}
          >
            <button
              type="button"
              onClick={() => setLang('ja')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'ja'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-pressed={lang === 'ja'}
            >
              {t('header.langJA')}
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'en'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-pressed={lang === 'en'}
            >
              {t('header.langEN')}
            </button>
          </div>
          {/* Tabs (wraps to row 2 on mobile, middle of row on desktop) */}
          <div className="w-full sm:w-auto sm:order-2">
            <nav className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-full">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${
                    currentTab === tab.id
                      ? 'bg-white text-blue-700 shadow-sm font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {currentTab === 'questions' && !practiceStarted && (
          <PracticeWelcome
            datasets={DATASETS}
            category={category}
            setCategory={setCategory}
            level={level}
            setLevel={setLevel}
            onStart={() => setPracticeStarted(true)}
            goToGradingTab={() => setCurrentTab('grading')}
          />
        )}

        {currentTab === 'questions' && practiceStarted && (
          <div className="space-y-4 fade-in">
            {/* Compact selectors + change button */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-slate-700">
                {datasetMeta.icon} {datasetMeta.label}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-sm text-slate-600">
                {level === 'all' ? t('levels.all') : `L${level}`}
              </span>
              <button
                type="button"
                onClick={() => setPracticeStarted(false)}
                className="ml-auto px-3 py-1 text-xs rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                {t('welcome.change')}
              </button>
            </div>

            {/* Level quick-filter (within current category) */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-slate-500 mr-1">
                {t('levels.label')}
              </span>
              {LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    level === lv
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {lv === 'all' ? t('levels.all') : `L${lv}`}
                </button>
              ))}
              <div className="ml-auto text-sm text-slate-500">
                {t('levels.progress', {
                  current: totalQuestions === 0 ? 0 : safeIndex + 1,
                  total: totalQuestions,
                })}
              </div>
            </div>

            {/* Question card */}
            {currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                category={category}
                hasAudio={datasetMeta.hasAudio}
                selectedAnswer={selectedAnswer}
                answered={answered}
                onSelect={handleSelect}
                onNext={goNext}
                onPrev={goPrev}
                apiKey={apiKey}
              />
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
                {t('levels.noQuestions')}
              </div>
            )}
          </div>
        )}

        {currentTab === 'review' && (
          <ReviewPanel
            datasets={DATASETS}
            stats={stats}
            onReattempt={handleReattempt}
          />
        )}

        {currentTab === 'grading' && (
          <GradingMode datasets={DATASETS} apiKey={apiKey} />
        )}

        {currentTab === 'writing' && <WritingPanel />}

        {currentTab === 'stats' && (
          <Statistics
            stats={stats}
            datasets={DATASETS}
            onResetAll={handleResetStats}
            onResetCategory={handleResetCategory}
          />
        )}

        {currentTab === 'updates' && <UpdatesPanel />}

        {currentTab === 'settings' && (
          <SettingsPanel apiKey={apiKey} onSave={handleSaveApiKey} />
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-slate-400">{t('header.footer')}</p>
        <p className="mt-1 text-[10px] text-slate-300 italic tracking-wide">
          {t('header.author')}
        </p>
      </footer>
    </div>
  );
}
