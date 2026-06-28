// Past-exam reference listening questions.
//
// This file is dynamically imported AFTER password verification (see
// pastExamAuth.js). It is therefore not bundled into the main JS chunk
// and only fetched when a verified user lands on the past-exam panel.
//
// Each entry follows the same shape as listening-complete.js:
//
//   {
//     topic: "Short headline",
//     passage: "TTS script. May use MAN: / WOMAN: speaker markers for
//               two-speaker dialogue (parsed by AudioPlayer).",
//     question: "Stem of the question",
//     options: ["A", "B", "C", "D"],
//     answer: 0,           // 0-3 index into options
//     ex: "Explanation (mixed JP/EN)"
//   }
//
// For two-speaker dialogues, prefix each turn with `MAN: ` or `WOMAN: `:
//
//   passage: "WOMAN: Sunray, this is Zero. Sitrep at fourteen hundred.\nMAN: Roger Zero. All quiet on Route Blue."
//
// Paste new entries from your source material into the array below.

export const PAST_EXAM = [
  // {
  //   topic: "Sample brief",
  //   passage: "WOMAN: ... \nMAN: ...",
  //   question: "What ...?",
  //   options: ["...", "...", "...", "..."],
  //   answer: 0,
  //   ex: "..."
  // },
];
