import { useState, useMemo } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { TOPIC_VOCAB } from '../topic-vocab-data.js';
import { loadMarks, saveMarks, markKey, countMarkedForTopic } from '../topicVocabMarks.js';
import TopicVocabQuiz from './TopicVocabQuiz.jsx';
import TopicVocabFlashcards from './TopicVocabFlashcards.jsx';

/**
 * Standalone trainer for the specialized topic-vocab packs (treaties, NATO
 * deployment, extradition, Jesús pack). Reached via a button on the Vocab
 * practice screen; manages its own topic → mode → practice flow internally
 * so it doesn't interfere with the regular flattenByLevel() question stream.
 */
const ALL_TOPICS_ID = '__all__';

export default function TopicVocabHub({ onExit, apiKey }) {
  const { t, lang } = useI18n();
  const [topicId, setTopicId] = useState(null);
  const [mode, setMode] = useState(null); // 'quiz' | 'flashcard'
  const [markedOnly, setMarkedOnly] = useState(false);
  const [marks, setMarks] = useState(() => loadMarks());

  const toggleMark = (tId, term) => {
    setMarks((prev) => {
      const key = markKey(tId, term);
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      saveMarks(next);
      return next;
    });
  };

  // Pseudo-topic that pools every pack's words into one shuffled set, so a
  // round can span all topics instead of being locked to a single one. Each
  // word keeps a `_topicId` pointer back to its real pack so marks and the
  // "marked only" filter still key off the pack the word actually belongs to.
  const allTopicsPack = useMemo(
    () => ({
      id: ALL_TOPICS_ID,
      icon: '🔀',
      labelEn: 'All Topics (Shuffle)',
      labelJa: '全トピック（シャッフル）',
      words: TOPIC_VOCAB.flatMap((tp) =>
        tp.words.map((w) => ({ ...w, _topicId: tp.id }))
      ),
    }),
    []
  );

  const topic =
    topicId === ALL_TOPICS_ID
      ? allTopicsPack
      : TOPIC_VOCAB.find((x) => x.id === topicId) || null;

  const wordTopicId = (word) => word._topicId || topic.id;

  // Keep the same object reference when not filtering, so the quiz/
  // flashcard round doesn't reshuffle just because `marks` changed
  // elsewhere (e.g. marking a word mid-round in the unfiltered view).
  const effectiveTopic = useMemo(() => {
    if (!topic || !markedOnly) return topic;
    return {
      ...topic,
      words: topic.words.filter((w) => marks[markKey(wordTopicId(w), w.term)]),
    };
  }, [topic, markedOnly, marks]);

  if (!topic) {
    return (
      <div className="space-y-4 fade-in">
        <HeaderBar t={t} onExit={onExit} title={t('topicVocab.hub_title')} />
        <p className="text-sm text-slate-600">{t('topicVocab.hub_body')}</p>
        <button
          type="button"
          onClick={() => {
            setTopicId(ALL_TOPICS_ID);
            setMarkedOnly(false);
          }}
          className="w-full text-left bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all text-white"
        >
          <div className="text-2xl mb-2">🔀</div>
          <div className="font-semibold">{t('topicVocab.all_topics_title')}</div>
          <div className="text-xs text-indigo-100 mt-0.5">{t('topicVocab.all_topics_subtitle')}</div>
          <div className="text-xs text-indigo-100 mt-2 font-medium">
            {t('topicVocab.word_count', { count: allTopicsPack.words.length })}
          </div>
        </button>
        <div className="grid gap-3 sm:grid-cols-3">
          {TOPIC_VOCAB.map((tp) => {
            const markedCount = countMarkedForTopic(marks, tp.id);
            return (
              <button
                key={tp.id}
                type="button"
                onClick={() => {
                  setTopicId(tp.id);
                  setMarkedOnly(false);
                }}
                className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">{tp.icon}</div>
                <div className="font-semibold text-slate-900">
                  {lang === 'ja' ? tp.labelJa : tp.labelEn}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ja' ? tp.labelEn : tp.labelJa}
                </div>
                <div className="text-xs text-indigo-600 mt-2 font-medium">
                  {t('topicVocab.word_count', { count: tp.words.length })}
                </div>
                {markedCount > 0 && (
                  <div className="text-xs text-amber-600 mt-1 font-medium">
                    🚩 {t('topicVocab.marked_count', { count: markedCount })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!mode) {
    const markedCount =
      topic.id === ALL_TOPICS_ID
        ? TOPIC_VOCAB.reduce((sum, tp) => sum + countMarkedForTopic(marks, tp.id), 0)
        : countMarkedForTopic(marks, topic.id);
    return (
      <div className="space-y-4 fade-in">
        <HeaderBar
          t={t}
          onExit={onExit}
          onBack={() => setTopicId(null)}
          title={lang === 'ja' ? topic.labelJa : topic.labelEn}
        />
        <label
          className={`flex items-center gap-2 px-4 py-3 text-sm rounded-xl border ${
            markedCount === 0
              ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
              : 'border-amber-200 bg-amber-50 text-amber-800 cursor-pointer'
          }`}
        >
          <input
            type="checkbox"
            checked={markedOnly}
            disabled={markedCount === 0}
            onChange={(e) => setMarkedOnly(e.target.checked)}
            className="accent-amber-600"
          />
          🚩 {t('topicVocab.marked_only_toggle', { count: markedCount })}
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode('quiz')}
            className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">🔤</div>
            <div className="font-semibold text-slate-900">
              {t('topicVocab.mode_quiz_title')}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {t('topicVocab.mode_quiz_body')}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setMode('flashcard')}
            className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-semibold text-slate-900">
              {t('topicVocab.mode_flash_title')}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {t('topicVocab.mode_flash_body')}
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 fade-in">
      <HeaderBar
        t={t}
        onExit={onExit}
        onBack={() => setMode(null)}
        title={`${lang === 'ja' ? topic.labelJa : topic.labelEn} · ${
          mode === 'quiz' ? t('topicVocab.mode_quiz_title') : t('topicVocab.mode_flash_title')
        }`}
      />
      {effectiveTopic.words.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          {t('topicVocab.marked_empty')}
        </div>
      ) : mode === 'quiz' ? (
        <TopicVocabQuiz
          topic={effectiveTopic}
          apiKey={apiKey}
          marks={marks}
          onToggleMark={(term, wordTopicIdOverride) =>
            toggleMark(wordTopicIdOverride || topic.id, term)
          }
        />
      ) : (
        <TopicVocabFlashcards
          topic={effectiveTopic}
          apiKey={apiKey}
          marks={marks}
          onToggleMark={(term, wordTopicIdOverride) =>
            toggleMark(wordTopicIdOverride || topic.id, term)
          }
        />
      )}
    </div>
  );
}

function HeaderBar({ t, onExit, onBack, title }) {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-none px-2 py-1 text-sm rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100"
          >
            ←
          </button>
        )}
        <div className="font-semibold text-indigo-900 truncate">{title}</div>
      </div>
      <button
        type="button"
        onClick={onExit}
        className="flex-none px-3 py-1.5 text-sm rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100"
      >
        {t('topicVocab.exit_button')}
      </button>
    </div>
  );
}
