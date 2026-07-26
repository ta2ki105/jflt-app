// JFLT Training - update / patch notes
// ----------------------------------------------------------------------------
// Each entry's id maps to a translation key:
//   changelog.entries.<id>.title  /  changelog.entries.<id>.desc
// in src/i18n/messages.js (EN + JA).
//
// When you ship a new feature, add ONE entry at the top of this list,
// then add the matching translation pair to messages.js.
// Keep descriptions short — one or two sentences.
// ----------------------------------------------------------------------------

/**
 * Tag categories used for the colour-coded chip on each entry.
 *   feature      — new functionality
 *   improvement  — non-trivial enhancement of existing feature
 *   fix          — bug fix
 *   style        — visual / layout change only
 */
export const TAG_STYLES = {
  feature: 'bg-blue-100 text-blue-800 border-blue-200',
  improvement: 'bg-violet-100 text-violet-800 border-violet-200',
  fix: 'bg-amber-100 text-amber-800 border-amber-200',
  style: 'bg-rose-100 text-rose-700 border-rose-200',
};

export const CHANGELOG_ENTRIES = [
  // Newest first
  { id: 'topic_vocab_listening_coverage_2026_07', date: '2026-07-26', tag: 'improvement' },
  { id: 'topic_vocab_listening_2026_07', date: '2026-07-26', tag: 'feature' },
  { id: 'flashcard_overlap_fix_2026_07', date: '2026-07-26', tag: 'fix' },
  { id: 'topic_vocab_2026_07', date: '2026-07-24', tag: 'feature' },
  { id: 'past_exam_gate_2026_06', date: '2026-06-15', tag: 'feature' },
  { id: 'vocab_audio_2026_06', date: '2026-06-15', tag: 'feature' },
  { id: 'api_key_guide_2026_06', date: '2026-06-15', tag: 'improvement' },
  { id: 'vocab_diplomacy_added_2026_06', date: '2026-06-15', tag: 'improvement' },
  { id: 'vocab_jp_gloss_2026_06', date: '2026-06-15', tag: 'improvement' },
  { id: 'voice_picker_2026_06', date: '2026-06-15', tag: 'feature' },
  { id: 'listening_voice_swap_2026_06', date: '2026-06-15', tag: 'improvement' },
  { id: 'listening_dialogue_2026_06', date: '2026-06-15', tag: 'feature' },
  { id: 'header_desktop_fix_2026_06', date: '2026-06-15', tag: 'style' },
  { id: 'favicon_added_2026_06', date: '2026-06-15', tag: 'style' },
  { id: 'practice_random_order_2026_06', date: '2026-06-15', tag: 'improvement' },
  { id: 'vocab_grammar_balanced_2026_06', date: '2026-06-11', tag: 'fix' },
  { id: 'vocab_expanded_2026_06', date: '2026-06-09', tag: 'improvement' },
  { id: 'listening_l3_expanded', date: '2026-05-17', tag: 'improvement' },
  { id: 'reading_length_bias', date: '2026-05-17', tag: 'fix' },
  { id: 'reading_l3_trimmed', date: '2026-05-17', tag: 'improvement' },
  { id: 'listening_l3_paraphrased', date: '2026-05-17', tag: 'improvement' },
  { id: 'review_listening_audio', date: '2026-05-17', tag: 'feature' },
  { id: 'grading_autosave_unmount', date: '2026-05-17', tag: 'fix' },
  { id: 'history_breakdown', date: '2026-05-17', tag: 'feature' },
  { id: 'listening_audio_stop', date: '2026-05-17', tag: 'fix' },
  { id: 'grading_timer_pause', date: '2026-05-17', tag: 'feature' },
  { id: 'grading_short_passages', date: '2026-05-17', tag: 'improvement' },
  { id: 'answer_distribution', date: '2026-05-17', tag: 'fix' },
  { id: 'listening_countdown', date: '2026-05-17', tag: 'improvement' },
  { id: 'review_tab', date: '2026-05-17', tag: 'feature' },
  { id: 'updates_tab', date: '2026-05-17', tag: 'feature' },
  { id: 'mobile_header', date: '2026-05-17', tag: 'style' },
  { id: 'welcome_screen', date: '2026-05-17', tag: 'improvement' },
  { id: 'session_streak_fix', date: '2026-05-17', tag: 'fix' },
  { id: 'bilingual_ui', date: '2026-05-17', tag: 'feature' },
  { id: 'writing_tab', date: '2026-05-17', tag: 'feature' },
  { id: 'grading_mode', date: '2026-05-13', tag: 'feature' },
  { id: 'l4_questions', date: '2026-05-13', tag: 'improvement' },
  { id: 'expanded_questions', date: '2026-05-12', tag: 'improvement' },
  { id: 'initial_release', date: '2026-05-10', tag: 'feature' },
];
