import { useState } from 'react';
import { finaliseScore } from '../gradingMode.js';
import { PASS_THRESHOLD, HALF_THRESHOLD } from '../scoring.js';
import { useI18n } from '../i18n/useI18n.js';

const SCORE_COLORS = {
  0: 'from-slate-400 to-slate-500',
  1: 'from-emerald-500 to-teal-600',
  2: 'from-sky-500 to-blue-600',
  3: 'from-violet-500 to-indigo-600',
  4: 'from-rose-500 to-fuchsia-600',
};

const STATUS_CLS = {
  pass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  half: 'bg-amber-100 text-amber-800 border-amber-300',
  fail: 'bg-rose-100 text-rose-700 border-rose-300',
  untested: 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function PracticeResult({
  skillLabel,
  skillIcon,
  answeredSections,
  durationSec,
  onRestart,
  onExit,
}) {
  const { t } = useI18n();
  const [reviewSection, setReviewSection] = useState(null);

  const sectionResults = [null, null, null, null];
  for (const sec of answeredSections) {
    sectionResults[sec.level - 1] = sec.result;
  }
  const score = finaliseScore(sectionResults);
  const accent = SCORE_COLORS[score.baseLevel] || SCORE_COLORS[0];

  const m = Math.floor(durationSec / 60);
  const s = (durationSec % 60).toString().padStart(2, '0');
  const durationStr = t('pr.duration_format', { m, s });

  return (
    <div className="space-y-5 fade-in">
      {/* SLP score banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className={`bg-gradient-to-br ${accent} text-white px-6 py-8 text-center`}>
          <div className="text-sm uppercase tracking-wider opacity-90">{t('pr.slp_title')}</div>
          <div className="text-7xl font-bold tabular-nums leading-none mt-2">
            {score.label}
          </div>
          <div className="mt-3 text-sm opacity-90">
            {skillIcon} {skillLabel} · {t('pr.duration', { duration: durationStr })}
          </div>
        </div>

        {/* Per-section breakdown */}
        <div className="px-5 py-4 space-y-2">
          {score.breakdown.map((b) => {
            const statusCls = STATUS_CLS[b.status];
            const statusText = t(`pr.status.${b.status}`);
            const widthPct = Math.min(
              100,
              Math.round((b.correct / Math.max(b.total || PASS_THRESHOLD, 1)) * 100)
            );
            const sec = answeredSections.find((s2) => s2.level === b.level);
            return (
              <div key={b.level} className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500 w-7">L{b.level}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        b.status === 'pass'
                          ? 'bg-emerald-500'
                          : b.status === 'half'
                          ? 'bg-amber-400'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-xs text-slate-600 w-14 text-right">
                    {b.correct} / {b.total}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md border ${statusCls}`}>
                    {statusText}
                  </span>
                  {sec && (
                    <button
                      type="button"
                      onClick={() => setReviewSection(sec)}
                      className="text-[11px] text-blue-700 hover:underline"
                    >
                      {t('pr.review')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score interpretation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm">
        <h3 className="font-semibold text-slate-900 mb-2">{t('pr.rules_title')}</h3>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>
            <strong className="text-emerald-700">≥ {PASS_THRESHOLD}</strong>
             — {t('pr.rule_pass_a')}
          </li>
          <li>
            <strong className="text-amber-700">
              {HALF_THRESHOLD}–{PASS_THRESHOLD - 1}
            </strong>
             — {t('pr.rule_half_a')}
          </li>
          <li>
            <strong className="text-rose-700">0–{HALF_THRESHOLD - 1}</strong>
             — {t('pr.rule_fail_a')}
          </li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {t('pr.restart')}
        </button>
        <button
          type="button"
          onClick={onExit}
          className="flex-1 px-4 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          {t('pr.exit')}
        </button>
      </div>

      {reviewSection && (
        <ReviewSection
          section={reviewSection}
          onClose={() => setReviewSection(null)}
          t={t}
        />
      )}
    </div>
  );
}

function ReviewSection({ section, onClose, t }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">
          {t('pr.section_review_title', {
            level: section.level,
            correct: section.result.correct,
            total: section.result.total,
          })}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-slate-500 hover:text-slate-900"
        >
          {t('common.close')}
        </button>
      </div>
      <ol className="space-y-3">
        {section.answers.map((a, i) => {
          const isCorrect = a.selected === a.question.answer;
          return (
            <li key={i} className="border-t border-slate-100 pt-3">
              <div className="flex items-start gap-2">
                <span
                  className={`flex-none w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                    isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                >
                  {isCorrect ? '✓' : '✕'}
                </span>
                <div className="flex-1 text-sm">
                  <div className="text-slate-900 font-medium">
                    Q{i + 1}. {a.question.question}
                  </div>
                  {a.question.passage && (
                    <details className="mt-1">
                      <summary className="text-xs text-blue-700 cursor-pointer">
                        {t('pr.show_passage')}
                      </summary>
                      <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 whitespace-pre-wrap">
                        {a.question.passage}
                      </div>
                    </details>
                  )}
                  <ul className="mt-2 space-y-1">
                    {a.question.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${
                          idx === a.question.answer
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : idx === a.selected
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'text-slate-600'
                        }`}
                      >
                        {['A', 'B', 'C', 'D'][idx]}. {opt}
                        {idx === a.question.answer && ` ${t('pr.correct_mark')}`}
                        {idx === a.selected &&
                          idx !== a.question.answer &&
                          ` ${t('pr.your_answer')}`}
                      </li>
                    ))}
                  </ul>
                  {a.question.ex && (
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      💡 {a.question.ex}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
