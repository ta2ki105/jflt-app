// gradingMode.js
// JFLT-style adaptive test execution logic.
//
// One "session" of the grading mode walks through up to 4 sections (L1..L4),
// each containing 15 random questions drawn without replacement from the
// matching skill+level pool. After each section completes, the test decides
// whether to advance (pass: ≥10 correct), stop with "+" (half: 7..9), or
// stop without (fail: ≤6).
//
// History is persisted under `grading_history_v1` in localStorage.

import { MAX_LEVEL, shouldContinueAdaptive, calculateAdaptiveScore } from './scoring.js';

export const SECTION_SIZE = 15;
export const HISTORY_KEY = 'grading_history_v1';
export const HISTORY_LIMIT = 30; // keep most recent N runs

/**
 * Fisher-Yates shuffle (immutable).
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a fresh test session for the given skill.
 * `dataset` is the per-level question pool (e.g. READING).
 *
 * Returns:
 *   {
 *     skill: 'reading' | ...,
 *     sections: Array<Array<question>>,  // length 4, each up to SECTION_SIZE
 *     startedAt: number,
 *   }
 *
 * If a level has fewer than SECTION_SIZE questions, all available are used
 * (this should not happen with the current dataset but guards against it).
 */
export function createSession(skill, dataset) {
  const sections = [];
  for (let lv = 1; lv <= MAX_LEVEL; lv++) {
    const pool = dataset[lv] || [];
    const picked = shuffle(pool).slice(0, SECTION_SIZE).map((q) => ({
      ...q,
      _level: lv,
    }));
    sections.push(picked);
  }
  return {
    skill,
    sections,
    startedAt: Date.now(),
  };
}

/**
 * Compute the section result from an array of {question, selected} answers.
 */
export function tallySection(answers) {
  let correct = 0;
  for (const a of answers) {
    if (a && a.selected === a.question.answer) correct++;
  }
  return { correct, total: answers.length, completed: true };
}

/**
 * Decide if the test should advance to the next section.
 */
export function decideAdvance(currentLevel, sectionResult) {
  return shouldContinueAdaptive(currentLevel, sectionResult.correct);
}

/**
 * Compute the final SLP score from a list of (possibly partial) section results.
 */
export function finaliseScore(sectionResults) {
  return calculateAdaptiveScore(sectionResults);
}

// ---------------------------------------------------------------------------
// History persistence
// ---------------------------------------------------------------------------

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to load grading history', e);
    return [];
  }
}

export function appendHistory(entry) {
  const list = loadHistory();
  list.unshift(entry);
  const trimmed = list.slice(0, HISTORY_LIMIT);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Failed to save grading history', e);
  }
  return trimmed;
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.warn('Failed to clear grading history', e);
  }
}

/**
 * Build a history entry from a completed session.
 *
 * `answeredSections` is an array (length up to 4) of:
 *   { level, answers: Array<{question, selected}>, result: {correct,total,completed} }
 * Plus the test may have stopped early, in which case later entries are absent.
 */
export function buildHistoryEntry({ skill, startedAt, answeredSections }) {
  const sectionResults = [];
  for (let lv = 1; lv <= MAX_LEVEL; lv++) {
    const sec = answeredSections.find((s) => s.level === lv);
    sectionResults.push(sec ? sec.result : null);
  }
  const score = finaliseScore(sectionResults);
  const finishedAt = Date.now();
  return {
    id: `${skill}-${startedAt}`,
    skill,
    startedAt,
    finishedAt,
    durationSec: Math.round((finishedAt - startedAt) / 1000),
    label: score.label,
    baseLevel: score.baseLevel,
    suffix: score.suffix,
    sections: answeredSections.map((s) => ({
      level: s.level,
      correct: s.result.correct,
      total: s.result.total,
    })),
  };
}
