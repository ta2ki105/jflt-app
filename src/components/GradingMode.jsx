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
import PracticeQuestionView from './PracticeQuestionView.jsx';
import PracticeResult from './PracticeResult.jsx';

const PHASE = {
  SETUP: 'setup',
  TESTING: 'testing',
  RESULT: 'result',
};

export default function GradingMode({ datasets, apiKey }) {
  const [phase, setPhase] = useState(PHASE.SETUP);
  const [skill, setSkill] = useState('reading');
  const [session, setSession] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1); // 1..4
  const [currentIdx, setCurrentIdx] = useState(0); // index within section
  const [currentSelected, setCurrentSelected] = useState(null);
  const [sectionAnswers, setSectionAnswers] = useState([]); // for current section
  const [answeredSections, setAnsweredSections] = useState([]); // completed sections
  const [historyTick, setHistoryTick] = useState(0); // re-render trigger after history change

  const history = useMemo(() => loadHistory(), [historyTick]);

  // ---- Setup phase ----
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
    if (!window.confirm('採点履歴をすべて削除しますか？')) return;
    clearHistory();
    setHistoryTick((t) => t + 1);
  };

  // ---- Testing phase ----
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

    // Section complete
    const result = tallySection(nextAnswers);
    const completedSection = {
      level: currentLevel,
      answers: nextAnswers,
      result,
    };
    const allSections = [...answeredSections, completedSection];
    setAnsweredSections(allSections);

    if (currentLevel < MAX_LEVEL && decideAdvance(currentLevel, result)) {
      // Advance to next level
      setCurrentLevel((lv) => lv + 1);
      setCurrentIdx(0);
      setSectionAnswers([]);
      setCurrentSelected(null);
    } else {
      // Test ends
      const entry = buildHistoryEntry({
        skill: session.skill,
        startedAt: session.startedAt,
        answeredSections: allSections,
      });
      appendHistory(entry);
      setHistoryTick((t) => t + 1);
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
    if (!window.confirm('テストを中断します。記録は保存されません。')) return;
    setPhase(PHASE.SETUP);
    setSession(null);
  };

  const handleRestart = () => {
    setPhase(PHASE.SETUP);
    setSession(null);
  };

  // ---- Render ----

  if (phase === PHASE.SETUP) {
    return (
      <div className="space-y-4 fade-in">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            🎖️ 採点モード — JFLT 公式形式
          </h2>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            実際の JFLT と同じ形式で実力を測定します。
            <strong className="text-slate-900">15問×4セクション</strong>
            を Level 1 から順に出題し、6問以下の正答でテスト終了。
            最終的に <strong>SLP スコア (例: 2+)</strong> を算出します。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 mb-4">
            <strong>注意:</strong>
            <ul className="mt-1 space-y-0.5 list-disc list-inside">
              <li>採点モード中は前の問題に戻れません</li>
              <li>Listening は音声が <strong>1 度だけ自動再生</strong> されます</li>
              <li>Reading の本文はテスト中に表示されます (公式形式と同じ)</li>
              <li>結果はテスト終了時に表示・履歴保存されます</li>
            </ul>
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            受験スキルを選択
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
              ⚠️ Listening は API キー未設定でも受験可能ですが、音声は再生されません。
              先に「設定」タブで Google Cloud TTS の API キーを登録することを推奨します。
            </div>
          )}

          <button
            type="button"
            onClick={startTest}
            className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm"
          >
            ▶️ 採点モードを開始
          </button>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">📜 受験履歴</h3>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs text-rose-700 hover:underline"
              >
                履歴を削除
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-slate-500">まだ受験履歴がありません。</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {history.map((h) => {
                const date = new Date(h.startedAt);
                const dateStr = date.toLocaleString('ja-JP', {
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
          問題の読み込みに失敗しました。トップに戻ってください。
          <button
            type="button"
            onClick={handleAbort}
            className="block mx-auto mt-4 px-4 py-2 text-sm rounded-lg bg-slate-100 text-slate-700"
          >
            戻る
          </button>
        </div>
      );
    }
    return (
      <div className="space-y-3 fade-in">
        {/* Progress strip */}
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-2 flex items-center gap-3 text-xs">
          <span className="font-semibold text-slate-700">
            Section {currentLevel} / {MAX_LEVEL}
          </span>
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${((currentIdx + 1) / currentSection.length) * 100}%` }}
            />
          </div>
          <span className="text-slate-600 tabular-nums">
            {currentIdx + 1} / {currentSection.length}
          </span>
          <button
            type="button"
            onClick={handleAbort}
            className="text-xs text-slate-500 hover:text-rose-700 ml-2"
          >
            中断
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
