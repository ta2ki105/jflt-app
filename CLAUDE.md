# CLAUDE.md

Context for Claude Code sessions working on this repository.
Last updated: 2026-07-26.

## What this is

**JFLT Training** — a React web app that helps Italian Air Force / IFTS
students (Japanese, European, etc.) prepare for the JFLT (Joint Forces
Language Test) which follows the STANAG 6001 framework. Used in production
at <https://jflt-app.vercel.app/>. Source at
<https://github.com/ta2ki105/jflt-app>.

## Tech stack

- **React 18 + Vite 5** — single-page app, no SSR
- **Tailwind CSS 3** — only utility classes, no separate stylesheet
- **Google Cloud Text-to-Speech (en-GB-Neural2-A)** — user-supplied API key,
  stored in their browser only, never sent to our backend (there is no
  backend)
- **LocalStorage** for stats, settings, in-progress test, language choice
- **Node ≥18** for build / utility scripts (`scripts/*.mjs`, `*.ps1`)
- **Vercel** — auto-deploys every push to `master`

## Repo layout

```
jflt-app/
├── index.html                     entry HTML
├── package.json                   vite + react deps
├── vite.config.js                 minimal config
├── tailwind.config.js
├── postcss.config.js
├── README.md                      end-user-facing readme
├── CLAUDE.md                      this file
├── QUESTION_FLOW.md               full procedure for adding new questions
├── PROMPTS.md                     prompts to feed an external LLM to generate questions
├── scripts/                       Node + PowerShell utilities (see "Scripts" below)
└── src/
    ├── main.jsx                   wraps <App/> in <LanguageProvider/>
    ├── App.jsx                    tab router, stats hub, language toggle
    ├── App.css, index.css         minimal Tailwind base
    ├── data.js                    re-export barrel
    ├── reading-complete.js        Reading questions (4 levels)
    ├── listening-complete.js      Listening questions (4 levels)
    ├── vocab-data.js              Vocab (4 levels × 15 = 60)
    ├── grammar-data.js            Grammar (4 levels × 15 = 60)
    ├── scoring.js                 JFLT scoring rules, stats math
    ├── gradingMode.js             test-runner logic, history, progress save
    ├── writingScript.js           verbatim AI-coach prompt for Writing tab
    ├── changelog.js               entries + tag styles for Updates tab
    ├── i18n/
    │   ├── messages.js            EN + JA dictionary (~200 keys)
    │   ├── LanguageContext.jsx    React Context + Provider
    │   └── useI18n.js             { t, lang, setLang } hook
    └── components/
        ├── QuestionCard.jsx       free-practice question display + grading
        ├── PracticeWelcome.jsx    landing screen for the Practice tab
        ├── ReviewPanel.jsx        per-question review + re-attempt
        ├── GradingMode.jsx        JFLT-format test orchestrator
        ├── PracticeQuestionView.jsx  single question inside a test
        ├── PracticeResult.jsx     final SLP score + per-section breakdown
        ├── Statistics.jsx         lifetime stats
        ├── SettingsPanel.jsx      API key, test playback, setup guide
        ├── WritingPanel.jsx       AI-coach prompt + usage steps
        ├── UpdatesPanel.jsx       changelog
        └── AudioPlayer.jsx        Google TTS wrapper + standalone widget
```

## Tabs (in order shown to the user)

| Icon | Key | Component | Purpose |
|---|---|---|---|
| 📝 | `questions` | PracticeWelcome → QuestionCard | Free practice, lifetime stats |
| 📚 | `review` | ReviewPanel | Re-attempt previously-answered questions |
| 🎖️ | `grading` | GradingMode | JFLT-format 15Q×4-section adaptive test |
| ✍️ | `writing` | WritingPanel | Copy AI-coach prompt for external Gemini/Claude/ChatGPT |
| 📊 | `stats` | Statistics | Lifetime per-category/per-level stats + JFLT score |
| 📰 | `updates` | UpdatesPanel | Changelog |
| ⚙️ | `settings` | SettingsPanel | TTS API key + setup guide |

## Question data shape

Every question, across all four skills, is an object:

```js
{
  topic: "Short headline shown above the card",       // 10-40 chars
  passage: "Reading/Listening body text (optional)",   // omit for vocab/grammar
  question: "The actual prompt",
  options: ["A", "B", "C", "D"],                       // exactly 4
  answer: 0,                                           // 0..3 (index into options)
  ex: "Explanation shown after answering (mixed JP/EN)"
}
```

Files export one dict keyed by level:

```js
export const READING = {
  1: [ ... 35 questions ... ],
  2: [ ... 55 questions ... ],
  3: [ ... 35 questions ... ],
  4: [ ... 15 questions ... ],
};
```

Current question inventory (Reading / Listening / Vocab / Grammar):

| Skill | L1 | L2 | L3 | L4 | Total |
|---|---:|---:|---:|---:|---:|
| Reading | 35 | 55 | 35 | 15 | **140** |
| Listening | 15 | 35 | 35 | 15 | **100** |
| Vocab | 15 | 15 | 15 | 15 | **60** |
| Grammar | 15 | 15 | 15 | 15 | **60** |

## Scoring (must match exactly — JFLT spec)

```
correct ≥ 10 / 15  → "pass"   (advance to next level)
correct in 7..9    → "half"   (previous level + "+")
correct in 0..6    → "fail"   (previous level, stop)
```

- The thresholds (`PASS_THRESHOLD = 10`, `HALF_THRESHOLD = 7`,
  `MAX_LEVEL = 4`) live in `src/scoring.js`.
- Final SLP label: `"${baseLevel}${suffix}"` e.g. `"2"`, `"2+"`, `"3"`, `"—"`.
- Overall JFLT across categories = **minimum** of the four section labels.

## Conventions to preserve

When generating or editing question content, conformance to these
non-negotiables has been litigated repeatedly. Don't regress them.

1. **L1 ≈ 50 / L2 ≈ 150 / L3 ≤ 150 / L4 ≤ 200 word passages.** L3 used
   to have 200-242-word outliers; we trimmed them. Practice tab still
   shows everything; the test sampler prefers shorter (see below).

2. **Answer letter distribution must be ~25% across A/B/C/D per file.**
   The original data was 67% B / 0% D — fixed via
   `scripts/balance-answers.mjs`. When adding new questions, round-robin
   the `answer` index across A/B/C/D.

3. **The correct option must not be uniquely the longest.** Pre-fix:
   44% overall, 80% in L4 — learners could guess by length. Pad shorter
   distractors with semantically appropriate qualifiers ("under combat
   conditions", "across overlapping operational areas", "in their file"
   etc.) until at least one distractor is ≥ correct length.

4. **L2/L3/L4 options must paraphrase, not copy.** If the passage says
   `"shift from reassurance to enhanced deterrence"`, the correct
   option should say something like
   `"move beyond demonstrating commitment toward a more credible deterrent stance"`.
   L1 may still keyword-match (simple fact retrieval).

5. **Distractors should be plausible misreadings**, not obviously
   wrong. Patterns: exaggeration of the correct answer, reversal of
   direction, attribution to the wrong party in the passage, a true
   fact from a different sentence than the one being asked about.

6. **Listening passages are TTS scripts.** Numbers and times spelled
   out (`"fourteen forty-five"`, `"oh-six-hundred"`, `"grid four-four-seven Echo"`).
   No raw digits in `passage`; raw digits are fine in `options`.

7. **The `ex` field may reference option letters** (`"option B paraphrases..."`,
   `"A is too broad"`). If you reshuffle options, you must remap
   these references — `balance-answers.mjs` does it automatically
   with placeholder substitution.

8. **`_qIndex` and `_level` are injected by `App.jsx`'s `flattenByLevel`.**
   Do not put them in the raw data. They flow into `recordAnswer` so
   the Review tab can identify questions uniquely.

## Stats / localStorage keys

- `jflt_stats_v2` — current shape (`{ perCategory, streak, bestStreak, answeredQuestions }`)
- `jflt_stats` — legacy v1, migrated on load
- `gcloud_api_key` — TTS API key
- `jflt_lang` — `"en"` or `"ja"`
- `grading_history_v1` — completed test runs (up to 30, most recent first)
- `grading_progress_v1` — in-flight test snapshot (auto-saved on tab change)

The streak counter is **reset to 0 on every app load** — feedback was
that "1" persisting from yesterday felt like a bug. `bestStreak` and
the per-category counts persist normally.

## Grading-mode mechanics

- **Sampling**: `createSession()` in `gradingMode.js` calls
  `samplePreferShort()` which picks the 30 shortest questions per level
  (Reading/Listening only — Vocab/Grammar have no passage), then
  shuffles down to 15. Keeps tests within the 120-min Reading target
  while leaving long passages available in Practice tab.
- **Adaptive stopping**: after each section, `decideAdvance()` checks
  if correct ≥ 10. If not, the test ends and `finaliseScore()` computes
  the SLP from the partial result array.
- **Auto-save on tab change**: `GradingMode.jsx` maintains
  `liveStateRef` mirroring the latest state every render, and a
  mount-only effect that fires `persistCurrentProgress()` from the
  cleanup function AND from a `beforeunload` listener. The
  `grading_progress_v1` key holds everything needed to resume.
- **5-second countdown before Listening audio** in `PracticeQuestionView.jsx`.
  Audio state machine: `idle → waiting → loading → played` (or `failed`).
  Previous audio is `pause()` + `currentTime = 0` on question change to
  prevent overlap.

## i18n

- Self-rolled (no `react-i18next`) to keep the bundle slim.
- All UI text lives in `src/i18n/messages.js` under namespaced keys
  (`tabs.*`, `common.*`, `card.*`, `grading.*`, `welcome.*`, `review.*`,
  `stats.*`, `settings.*`, `writing.*`, `changelog.*`).
- Use `{ t } = useI18n()` then `t('namespace.key', { var: value })`.
- Initial language: `navigator.language.startsWith('ja') ? 'ja' : 'en'`,
  persisted to `localStorage`.
- When adding a feature with new strings, add **both** `en.*` and
  `ja.*` entries. Don't fall back to one language.
- Author names are static strings (not i18n) — "by Tatsuki" in header,
  "by Oshibe" in footer.

## Changelog discipline

`src/changelog.js` holds an array of `{ id, date, tag }` (newest
first). Each entry needs a matching translation pair in
`messages.js` under `changelog.entries.<id>.title` / `.desc` in **both**
languages. Tags: `feature` / `improvement` / `fix` / `style` (colour
defined in `TAG_STYLES`). Author-vanity changes (e.g. moving "by
Oshibe") are not user-facing news — leave them out of the changelog.

## Scripts

| Path | Purpose |
|---|---|
| `scripts/balance-answers.mjs` | Round-robin redistribute `answer` indices across A/B/C/D per level. Also remaps option-letter references in `ex` ("option B" → "option A", "C reverses" → "D reverses", etc.). Run after large content drops. |
| `scripts/dedup.ps1` | PowerShell helpers: `Get-Topics`, `Show-TopicHistogram`, `Find-DuplicateTopics`, `Find-DuplicateOptions`, `Find-CrossFileQuestions`, `Invoke-DedupAudit`, `Copy-TopicsToClipboard`. Used both before generating questions (paste existing topics to avoid clashes) and after merging (verify no dupes). |
| `scripts/merge-questions.ps1` | Bracket-aware merger that splices new question arrays into existing files without breaking the JS structure. |

When a user pastes a new questions file from an external chat, the
standard pipeline is: drop file into `src/` → strip stray commas (often
needed) → `Invoke-DedupAudit` → `balance-answers.mjs` → manual review
of any warnings → commit. The full version is in `QUESTION_FLOW.md`.

## Build, test, deploy

- `npm run dev` — local Vite server at <http://localhost:5173>.
- `npm run build` — production build to `dist/`. Currently 55 modules,
  ~580 kB JS (gzip ~184 kB). The chunk-size warning is informational.
- No automated tests yet. Verification is:
  1. `npm run build` passes
  2. `node` one-liners (often inline in commits) measure
     answer-distribution / passage-length / option-length stats
  3. Manual smoke test on `npm run dev`
- Deployment: `git push origin master` → Vercel picks up automatically.
- **`.gitignore` excludes `.docx` / `.pdf` / `.bak`** — confidential
  research material the user shared (a STANAG-internal Word file) has
  been deleted and that pattern protects against future accidents.

## STANAG 6001 reference documents

Official, publicly downloadable sources — found and verified 2026-07-26 via
BILC (Bureau for International Language Co-ordination), the NATO body that
owns STANAG 6001 testing:

- **STANAG 6001 Edition 5** (the promulgation agreement itself, NATO
  non-classified): <https://natobilc.org/wp-content/uploads/2024/11/6001EFed05.pdf>
- **ATrainP-5, Edition A** (the actual level-descriptor tables — Listening/
  Speaking/Reading/Writing, Levels 0-5 including "+" levels — referenced
  *as* the standard by STANAG 6001 itself): <https://natobilc.org/wp-content/uploads/2024/11/ATrainP-5-EDA-V2-E.pdf>
- Overview & plain-language explainer: [STANAG 6001 Overview, Feb 2019](https://natobilc.org/wp-content/uploads/2024/11/STANAG-6001-Overview-Feb-2019.pdf),
  [STANAG 6001 for Non-Specialists](https://natobilc.org/wp-content/uploads/2024/11/STANAG-for-Non-Specialists_Modified_June2013-doc-3.pdf)
- Testing procedure guidance: [BILC Best Practices in STANAG 6001 Testing, July 2024](https://natobilc.org/wp-content/uploads/2024/11/Best-Practices-in-STANAG-6001-Testing-July-2024.pdf)
- Landing page with the full document list: <https://natobilc.org/stanag-6001/>

**Confirmed by reading ATrainP-5 directly:** the document defines skill-level
*descriptors* (what a Level 3 listener/reader/speaker/writer can do) but
contains **no numeric word-count or test-duration specifications** for any
level. So the L1≈50/L2≈150/L3≤150/L4≤200-word passage-length convention
and the 120-minute Reading duration used in this repo are **not derived
from STANAG 6001/ATrainP-5** — they come from the user's own training
material, as already noted below. If word-count/duration sourcing is ever
needed, look to national testing-body specs (e.g. BILC's Best Practices
document above, or a specific nation's published STANAG 6001 test
specification) rather than the STANAG itself.

## Things to avoid

- **Don't store full question objects in `grading_history_v1`** —
  blows out localStorage. Only the summary (correct/total per section)
  is saved.
- **Don't shuffle options without remapping `ex`** — the
  `balance-answers.mjs` script handles this correctly; ad-hoc edits
  often break the explanation references.
- **Don't fall back to English without warning** — `useI18n.t()`
  warns to the console when a key is missing in the requested
  language; if you see those warnings in dev, fix the missing key
  rather than tolerating the fallback.
- **Don't trim L4 Reading passages further** — they're already at the
  L4-spec length; users want long-passage endurance practice
  available in Practice tab. The grading sampler is what protects
  test pacing, not data deletion.
- **Don't push to `master` while a test is being run by a teammate** —
  Vercel redeploys instantly and may interrupt their session.
- **Don't reference STANAG word-count specifics as fact** — confirmed
  by reading the official ATrainP-5 descriptor document (see "STANAG
  6001 reference documents" above) that STANAG 6001 specifies *no*
  word counts or durations at all, only skill descriptors. The
  L1/L2/L3/L4 length convention and the 120-min Reading duration used
  in this repo come from the user's own training material, not STANAG.

## Recent major decisions (for context)

- **Question generation is human-supervised, not auto** — the user
  ships new question batches generated externally and we audit them
  in. `PROMPTS.md` is the formal interface to whatever LLM is used.
- **Practice ≠ Test sampling** — practice shows everything; test
  prefers short passages. Keeps both endurance training and on-pace
  measurement available without splitting the dataset.
- **English UI ships by default for non-JA browsers** — added because
  the app is distributed to Italian/European peers as well as
  Japanese students. The toggle remains for switching.
- **History rows are expandable** — users wanted to see _where_ they
  stalled in a past test, not just the SLP. Renders per-section
  L1-L4 progress bars.
- **Per-question Review tab** — same dataset that drives stats also
  drives a Review tab where every answered question can be revisited
  and re-attempted; re-attempts update the per-question record without
  inflating lifetime totals.

## When you (future Claude) join this project

1. Read this file end-to-end before touching code.
2. If the user is asking for content changes (new questions, paraphrase
   tweaks, length fixes), use the existing scripts and protocols —
   don't reinvent them.
3. If the user is asking for UI changes, check `i18n/messages.js` first
   for an existing key.
4. Always run `npm run build` before committing.
5. Every commit should ship: the actual change + matching changelog
   entry (`changelog.js` + both EN/JA strings in `messages.js`) + an
   informative commit message in the established format ("feat:",
   "fix:", "content:", "docs:", "style:").
6. Push to `master` to deploy. There's no staging environment.
