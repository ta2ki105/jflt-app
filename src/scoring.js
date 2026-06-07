// JFLT scoring rules
// ----------------------------------------------------------------------------
// For each level the learner attempts:
//   correct >= 10        → "pass"  (that level is awarded; progress to next)
//   correct in 7..9      → "half"  (previous level achieved, plus "+")
//   correct in 0..6      → "fail"  (previous level achieved, no plus)
//
// Algorithm (per category):
//   1. Walk levels 1 → 4. As long as the level passes, advance baseLevel.
//   2. The first non-pass level produces an optional "+" suffix
//      (only if it scored "half").
//   3. Final score = `${baseLevel}${suffix}` , e.g. "2", "2+", "3", "3+", "4".
//   4. If level 1 itself fails / half / has no data, the result is "0" / "0+" / "—".
//
// `perLevel` shape: { 1: {correct, total}, 2: {...}, 3: {...}, 4: {...} }

export const PASS_THRESHOLD = 10;
export const HALF_THRESHOLD = 7;
export const MAX_LEVEL = 4;

export function levelStatus(correct) {
  if (correct >= PASS_THRESHOLD) return 'pass';
  if (correct >= HALF_THRESHOLD) return 'half';
  return 'fail';
}

/**
 * Calculate JFLT score from per-level results.
 * Returns { label, baseLevel, suffix, breakdown }.
 */
export function calculateScore(perLevel) {
  let baseLevel = 0;
  let suffix = '';
  const breakdown = [];

  for (let lv = 1; lv <= MAX_LEVEL; lv++) {
    const data = perLevel[lv] || { correct: 0, total: 0 };
    const status = data.total === 0 ? 'untested' : levelStatus(data.correct);
    breakdown.push({ level: lv, ...data, status });

    if (status === 'pass') {
      baseLevel = lv;
      suffix = '';
      continue;
    }
    // First non-pass level decides the plus
    if (status === 'half') suffix = '+';
    // For 'fail' or 'untested' nothing changes
    break;
  }

  let label;
  if (baseLevel === 0 && suffix === '') {
    // Either nothing attempted yet, or L1 failed outright
    const l1 = perLevel[1] || { total: 0 };
    label = l1.total === 0 ? '—' : '0';
  } else {
    label = `${baseLevel}${suffix}`;
  }

  return { label, baseLevel, suffix, breakdown };
}

/**
 * Aggregate totals across all levels of a category.
 */
export function categoryTotals(perLevel) {
  let correct = 0;
  let total = 0;
  for (let lv = 1; lv <= MAX_LEVEL; lv++) {
    const d = perLevel[lv];
    if (!d) continue;
    correct += d.correct || 0;
    total += d.total || 0;
  }
  return { correct, total };
}

/**
 * Empty per-level shape factory.
 */
export function emptyPerLevel() {
  return {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
  };
}

export const CATEGORIES = ['reading', 'listening', 'vocab', 'grammar'];

/**
 * Adaptive grading-mode scoring.
 *
 * The official JFLT format runs sections sequentially L1 → L4 (15 questions
 * each). If a section scores fail (≤6) the test ends right there, and only
 * the previously-passed levels (plus optional "+") count.
 *
 * Input: `sectionResults` is an array indexed 0..3 corresponding to L1..L4.
 *        Each entry is either { correct, total, completed: true } if the
 *        section was attempted, or null/undefined if the test stopped earlier.
 *
 * Returns the same `{ label, baseLevel, suffix, breakdown }` shape as
 * calculateScore so the UI can render it identically.
 */
export function calculateAdaptiveScore(sectionResults) {
  const perLevel = emptyPerLevel();
  for (let lv = 1; lv <= MAX_LEVEL; lv++) {
    const r = sectionResults[lv - 1];
    if (r && typeof r.correct === 'number') {
      perLevel[lv] = { correct: r.correct, total: r.total || 0 };
    }
  }
  return calculateScore(perLevel);
}

/**
 * Decide whether the grading test should continue to the next section after
 * the just-completed section's result.
 */
export function shouldContinueAdaptive(currentLevel, correctInSection) {
  if (currentLevel >= MAX_LEVEL) return false;
  // pass → continue; half / fail → stop
  return levelStatus(correctInSection) === 'pass';
}

export function emptyStats() {
  const perCategory = {};
  for (const c of CATEGORIES) perCategory[c] = emptyPerLevel();
  return {
    perCategory,
    streak: 0,
    bestStreak: 0,
    // Per-question latest result, used by the Review tab.
    // Shape: { reading: { 1: { 0: { isCorrect, attempts, lastAt }, ... } } }
    answeredQuestions: {},
  };
}

/**
 * Returns a brand-new stats object after recording a single answer.
 *
 * `qIndex` (optional) identifies the question within its level so the
 * Review tab can show ○ / × per question and offer re-attempts. When
 * omitted, only the per-level aggregate is updated (back-compat).
 */
export function recordAnswer(stats, category, level, qIndex, isCorrect) {
  // Back-compat: allow the older 4-arg signature
  //   recordAnswer(stats, category, level, isCorrect)
  if (typeof qIndex === 'boolean' && typeof isCorrect === 'undefined') {
    isCorrect = qIndex;
    qIndex = undefined;
  }

  const prevAQ = stats.answeredQuestions || {};
  const prevCat = prevAQ[category] || {};
  const prevLevel = prevCat[level] || {};
  const prevRecord = qIndex != null ? prevLevel[qIndex] : null;

  const nextRecord =
    qIndex != null
      ? {
          isCorrect: !!isCorrect,
          attempts: (prevRecord?.attempts || 0) + 1,
          lastAt: Date.now(),
        }
      : null;

  const nextAQ =
    qIndex != null
      ? {
          ...prevAQ,
          [category]: {
            ...prevCat,
            [level]: {
              ...prevLevel,
              [qIndex]: nextRecord,
            },
          },
        }
      : prevAQ;

  const next = {
    ...stats,
    perCategory: {
      ...stats.perCategory,
      [category]: {
        ...stats.perCategory[category],
        [level]: {
          correct:
            (stats.perCategory[category]?.[level]?.correct || 0) +
            (isCorrect ? 1 : 0),
          total: (stats.perCategory[category]?.[level]?.total || 0) + 1,
        },
      },
    },
    streak: isCorrect ? stats.streak + 1 : 0,
    answeredQuestions: nextAQ,
  };
  next.bestStreak = Math.max(stats.bestStreak || 0, next.streak);
  return next;
}

/**
 * Re-attempt from the Review tab: updates only the per-question record
 * (does NOT touch perCategory totals or streak). Keeps the original
 * `attempts` counter incrementing.
 */
export function recordReattempt(stats, category, level, qIndex, isCorrect) {
  const prevAQ = stats.answeredQuestions || {};
  const prevCat = prevAQ[category] || {};
  const prevLevel = prevCat[level] || {};
  const prevRecord = prevLevel[qIndex] || { attempts: 0 };

  return {
    ...stats,
    answeredQuestions: {
      ...prevAQ,
      [category]: {
        ...prevCat,
        [level]: {
          ...prevLevel,
          [qIndex]: {
            isCorrect: !!isCorrect,
            attempts: (prevRecord.attempts || 0) + 1,
            lastAt: Date.now(),
          },
        },
      },
    },
  };
}

/**
 * Migrate older shape (correct/total/streak/bestStreak) into the new
 * per-category structure. Older counts are discarded since they cannot
 * be split per level — but streak/bestStreak survive.
 */
export function migrateStats(raw) {
  if (!raw || typeof raw !== 'object') return emptyStats();
  if (raw.perCategory) {
    // Already new shape — fill in any missing keys.
    const merged = emptyStats();
    for (const c of CATEGORIES) {
      const src = raw.perCategory[c];
      if (!src) continue;
      for (let lv = 1; lv <= MAX_LEVEL; lv++) {
        merged.perCategory[c][lv] = {
          correct: src[lv]?.correct || 0,
          total: src[lv]?.total || 0,
        };
      }
    }
    merged.streak = raw.streak || 0;
    merged.bestStreak = raw.bestStreak || raw.streak || 0;
    merged.answeredQuestions =
      raw.answeredQuestions && typeof raw.answeredQuestions === 'object'
        ? raw.answeredQuestions
        : {};
    return merged;
  }
  const blank = emptyStats();
  blank.streak = raw.streak || 0;
  blank.bestStreak = raw.bestStreak || raw.streak || 0;
  return blank;
}
