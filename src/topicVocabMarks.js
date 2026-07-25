// "Don't remember this word" marks for the topic-vocab trainer
// (treaties/NATO/extradition/Jesús packs). Persisted to localStorage,
// keyed by "<topicId>::<term>" so the same term in different topics is
// tracked independently. Used by TopicVocabHub/Quiz/Flashcards to show
// a mark toggle and to filter a "marked only" practice round.

const STORAGE_KEY = 'topic_vocab_marks_v1';

export function markKey(topicId, term) {
  return `${topicId}::${term}`;
}

export function loadMarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

export function saveMarks(marks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
  } catch (_) {
    // ignore quota errors
  }
}

export function countMarkedForTopic(marks, topicId) {
  const prefix = `${topicId}::`;
  return Object.keys(marks).reduce(
    (n, k) => (marks[k] && k.startsWith(prefix) ? n + 1 : n),
    0
  );
}
