import { useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { TOPIC_VOCAB } from '../topic-vocab-data.js';
import TopicVocabQuiz from './TopicVocabQuiz.jsx';
import TopicVocabFlashcards from './TopicVocabFlashcards.jsx';

/**
 * Standalone trainer for the specialized topic-vocab packs (treaties, NATO
 * deployment, extradition). Reached via a button on the Vocab practice
 * screen; manages its own topic → mode → practice flow internally so it
 * doesn't interfere with the regular flattenByLevel() question stream.
 */
export default function TopicVocabHub({ onExit }) {
  const { t, lang } = useI18n();
  const [topicId, setTopicId] = useState(null);
  const [mode, setMode] = useState(null); // 'quiz' | 'flashcard'

  const topic = TOPIC_VOCAB.find((x) => x.id === topicId) || null;

  if (!topic) {
    return (
      <div className="space-y-4 fade-in">
        <HeaderBar t={t} onExit={onExit} title={t('topicVocab.hub_title')} />
        <p className="text-sm text-slate-600">{t('topicVocab.hub_body')}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TOPIC_VOCAB.map((tp) => (
            <button
              key={tp.id}
              type="button"
              onClick={() => setTopicId(tp.id)}
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
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!mode) {
    return (
      <div className="space-y-4 fade-in">
        <HeaderBar
          t={t}
          onExit={onExit}
          onBack={() => setTopicId(null)}
          title={lang === 'ja' ? topic.labelJa : topic.labelEn}
        />
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
      {mode === 'quiz' ? (
        <TopicVocabQuiz topic={topic} />
      ) : (
        <TopicVocabFlashcards topic={topic} />
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
