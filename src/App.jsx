import { useState, useEffect, useMemo, useCallback } from 'react';
import { READING, LISTENING, VOCAB, GRAMMAR } from './data.js';
import {
  emptyStats,
  migrateStats,
  recordAnswer,
} from './scoring.js';
import QuestionCard from './components/QuestionCard.jsx';
import Statistics from './components/Statistics.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
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
      (dataset[lv] || []).map((q) => ({ ...q, _level: lv }))
    );
  }
  return (dataset[level] || []).map((q) => ({ ...q, _level: level }));
}

const STATS_KEY = 'jflt_stats_v2';
const LEGACY_STATS_KEY = 'jflt_stats';
const API_KEY_STORAGE = 'gcloud_api_key';

export default function App() {
  const [currentTab, setCurrentTab] = useState('questions');
  const [category, setCategory] = useState('reading');
  const [level, setLevel] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState(emptyStats);
  const [apiKey, setApiKey] = useState('');

  // Load persisted state (with migration from legacy v1 stats)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      if (saved) {
        setStats(migrateStats(JSON.parse(saved)));
      } else {
        const legacy = localStorage.getItem(LEGACY_STATS_KEY);
        if (legacy) setStats(migrateStats(JSON.parse(legacy)));
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
    if (window.confirm('統計をリセットしますか？')) {
      persistStats(emptyStats());
    }
  };

  const handleResetCategory = (cat) => {
    if (!window.confirm(`${DATASETS[cat].label} の記録をリセットしますか？`)) return;
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

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              J
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                JFLT Training
                <span className="ml-1.5 text-xs font-normal text-slate-400 italic">
                  by Oshibe
                </span>
              </h1>
              <p className="text-xs text-slate-500 leading-tight">
                280 questions · NATO English
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {[
              { id: 'questions', label: '問題', icon: '📝' },
              { id: 'stats', label: '統計', icon: '📊' },
              { id: 'settings', label: '設定', icon: '⚙️' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setCurrentTab(t.id)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  currentTab === t.id
                    ? 'bg-white text-blue-700 shadow-sm font-medium'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="mr-1">{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {currentTab === 'questions' && (
          <div className="space-y-4 fade-in">
            {/* Category tabs */}
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(DATASETS).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-3 py-2.5 text-sm rounded-xl border transition-all ${
                    category === key
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-base">{info.icon}</div>
                  <div className="font-medium">{info.label}</div>
                </button>
              ))}
            </div>

            {/* Level filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-slate-500 mr-1">Level:</span>
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
                  {lv === 'all' ? 'ALL' : `L${lv}`}
                </button>
              ))}
              <div className="ml-auto text-sm text-slate-500">
                Q{totalQuestions === 0 ? 0 : safeIndex + 1} / {totalQuestions}
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
                このレベルには問題がありません。
              </div>
            )}
          </div>
        )}

        {currentTab === 'stats' && (
          <Statistics
            stats={stats}
            datasets={DATASETS}
            onResetAll={handleResetStats}
            onResetCategory={handleResetCategory}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsPanel apiKey={apiKey} onSave={handleSaveApiKey} />
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-slate-400">
        JFLT Training · React + Vite + Tailwind · Powered by Google Cloud TTS
      </footer>
    </div>
  );
}
