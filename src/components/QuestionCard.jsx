import AudioPlayer from './AudioPlayer.jsx';

const LEVEL_BADGE = {
  1: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  2: 'bg-sky-100 text-sky-700 border-sky-200',
  3: 'bg-violet-100 text-violet-700 border-violet-200',
  4: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function QuestionCard({
  question,
  category,
  hasAudio,
  selectedAnswer,
  answered,
  onSelect,
  onNext,
  onPrev,
  apiKey,
}) {
  const correctIndex = question.answer;
  const isCorrect = answered && selectedAnswer === correctIndex;

  // Determine which text to read aloud
  // Listening: read the passage (the audio script)
  // Reading: also allow listening to the passage
  const speakable = question.passage || '';

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden fade-in">
      {/* Top bar: level + topic */}
      <div className="px-5 pt-5 pb-3 flex flex-wrap items-center gap-2">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
            LEVEL_BADGE[question._level] || 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          Level {question._level}
        </span>
        {question.topic && (
          <span className="text-xs text-slate-500 truncate">{question.topic}</span>
        )}
        {hasAudio && speakable && (
          <div className="ml-auto">
            <AudioPlayer
              text={speakable}
              apiKey={apiKey}
              label={category === 'listening' ? '音声を再生' : '読み上げ'}
            />
          </div>
        )}
      </div>

      {/* Passage */}
      {question.passage && (
        <div className="px-5 pb-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[15px] leading-relaxed text-slate-800 whitespace-pre-wrap">
            {category === 'listening' && !answered ? (
              <span className="text-slate-400 italic">
                🔊 上の「音声を再生」ボタンで聴き取ってください。（採点後にスクリプトが表示されます）
              </span>
            ) : (
              question.passage
            )}
          </div>
        </div>
      )}

      {/* Question */}
      <div className="px-5 pb-3">
        <p className="text-[15px] font-medium text-slate-900">{question.question}</p>
      </div>

      {/* Options */}
      <ul className="px-5 pb-4 space-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          const isAnswerCorrect = idx === correctIndex;

          let cls =
            'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40';
          if (answered) {
            if (isAnswerCorrect) {
              cls = 'border-emerald-400 bg-emerald-50';
            } else if (isSelected) {
              cls = 'border-rose-400 bg-rose-50';
            } else {
              cls = 'border-slate-200 bg-white opacity-70';
            }
          } else if (isSelected) {
            cls = 'border-blue-400 bg-blue-50';
          }

          return (
            <li key={idx}>
              <button
                type="button"
                disabled={answered}
                onClick={() => onSelect(idx)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 border rounded-xl transition-colors ${cls} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`flex-none w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border ${
                    answered && isAnswerCorrect
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : answered && isSelected
                      ? 'bg-rose-500 text-white border-rose-500'
                      : isSelected
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  {answered && isAnswerCorrect
                    ? '✓'
                    : answered && isSelected
                    ? '✕'
                    : optionLabels[idx]}
                </span>
                <span className="text-[15px] leading-snug text-slate-800 pt-1">
                  {opt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Result + explanation */}
      {answered && (
        <div className="px-5 pb-5 fade-in">
          <div
            className={`rounded-xl p-4 border ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
              <span className="font-semibold text-slate-900">
                {isCorrect
                  ? '正解！'
                  : `不正解 — 正解は ${optionLabels[correctIndex]}`}
              </span>
            </div>
            {question.ex && (
              <p className="text-sm text-slate-700 leading-relaxed">{question.ex}</p>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-slate-400"
        >
          ← 前へ
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {answered ? '次へ →' : 'スキップ →'}
        </button>
      </div>
    </article>
  );
}
