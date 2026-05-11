// JFLT Question Database — barrel file
// Combines question sets from each skill module:
//   READING / LISTENING : 80 questions each (L1=10, L2=35, L3=25, L4=10)
//   VOCAB / GRAMMAR     : 60 questions each (15 per level)
// Total: 280 questions
//
// To add or update questions, edit the underlying *-complete.js / *-data.js
// files. See QUESTION_FLOW.md at the project root for the full workflow.

export { READING } from './reading-complete.js';
export { LISTENING } from './listening-complete.js';
export { VOCAB } from './vocab-data.js';
export { GRAMMAR } from './grammar-data.js';
