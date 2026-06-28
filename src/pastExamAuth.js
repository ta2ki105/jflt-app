// Past-exam unlock gate.
//
// SECURITY NOTE: This is OBSCURITY, not real security. The hash and the
// data chunk both live in the static bundle — anyone with browser
// DevTools can extract them. Suitable only for keeping content hidden
// from casual users in the same friend group.
//
// To change the password:
//   1. Compute the new hash:
//      node -e "const c=require('crypto');console.log(c.createHash('sha256').update('NEW_PASSWORD').digest('hex'))"
//   2. Replace UNLOCK_HASH below with the output.
//
// Default password: "jflt2026" (change this before sharing!)
export const UNLOCK_HASH =
  '6c769e58ba9068b9e4863dd3a03e77dffd20765e3fce1ea647b3003c0b547561';

const FLAG_KEY = 'past_exam_unlocked_v1';
const CLICK_THRESHOLD = 5;

export async function hashPassword(plain) {
  const buf = new TextEncoder().encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(plain) {
  const h = await hashPassword(plain);
  return h === UNLOCK_HASH;
}

export function isUnlocked() {
  try {
    return localStorage.getItem(FLAG_KEY) === '1';
  } catch (_) {
    return false;
  }
}

export function setUnlocked(yes) {
  try {
    if (yes) localStorage.setItem(FLAG_KEY, '1');
    else localStorage.removeItem(FLAG_KEY);
  } catch (_) { /* ignore quota errors */ }
}

export const TRIGGER_CLICKS = CLICK_THRESHOLD;

// Lazy-loaded so the past-exam data is not part of the main bundle.
export async function loadPastExamData() {
  const mod = await import('./past-exam-data.js');
  return mod.PAST_EXAM;
}
