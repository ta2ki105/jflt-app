// Voice catalog + user preference persistence for Google Cloud TTS.
// Used by AudioPlayer (playback) and SettingsPanel (UI picker).

const STORAGE_KEYS = {
  male: 'gcloud_voice_male',
  female: 'gcloud_voice_female',
  defaultGender: 'gcloud_voice_default_gender',
};

// Available en-GB voices, grouped by tier. Tier drives the pricing
// note shown in Settings. "premium" = Studio (≈10× the cost of Neural2).
export const VOICE_CATALOG = {
  male: [
    { name: 'en-GB-Neural2-B', tier: 'neural2', label: 'Neural2-B' },
    { name: 'en-GB-Neural2-D', tier: 'neural2', label: 'Neural2-D' },
    { name: 'en-GB-Wavenet-B', tier: 'wavenet', label: 'Wavenet-B' },
    { name: 'en-GB-Wavenet-D', tier: 'wavenet', label: 'Wavenet-D' },
    { name: 'en-GB-Studio-B',  tier: 'studio',  label: 'Studio-B (premium)' },
  ],
  female: [
    { name: 'en-GB-Neural2-A', tier: 'neural2', label: 'Neural2-A' },
    { name: 'en-GB-Neural2-C', tier: 'neural2', label: 'Neural2-C' },
    { name: 'en-GB-Neural2-F', tier: 'neural2', label: 'Neural2-F' },
    { name: 'en-GB-Wavenet-A', tier: 'wavenet', label: 'Wavenet-A' },
    { name: 'en-GB-Wavenet-C', tier: 'wavenet', label: 'Wavenet-C' },
    { name: 'en-GB-Wavenet-F', tier: 'wavenet', label: 'Wavenet-F' },
    { name: 'en-GB-Studio-C',  tier: 'studio',  label: 'Studio-C (premium)' },
  ],
};

const DEFAULTS = {
  male: 'en-GB-Neural2-B',
  female: 'en-GB-Neural2-A',
  defaultGender: 'male',
};

function readKey(key, fallback, allowed) {
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    if (allowed && !allowed.includes(v)) return fallback;
    return v;
  } catch (_) {
    return fallback;
  }
}

export function loadVoicePrefs() {
  const maleNames = VOICE_CATALOG.male.map((v) => v.name);
  const femaleNames = VOICE_CATALOG.female.map((v) => v.name);
  return {
    male: readKey(STORAGE_KEYS.male, DEFAULTS.male, maleNames),
    female: readKey(STORAGE_KEYS.female, DEFAULTS.female, femaleNames),
    defaultGender: readKey(STORAGE_KEYS.defaultGender, DEFAULTS.defaultGender, ['male', 'female']),
  };
}

export function saveVoicePrefs(partial) {
  try {
    if (partial.male) localStorage.setItem(STORAGE_KEYS.male, partial.male);
    if (partial.female) localStorage.setItem(STORAGE_KEYS.female, partial.female);
    if (partial.defaultGender) localStorage.setItem(STORAGE_KEYS.defaultGender, partial.defaultGender);
  } catch (_) { /* ignore quota errors */ }
}

// Resolve the voice name for a parsed dialogue turn or single-narrator
// passage. Called from AudioPlayer.
export function resolveVoice(marker, prefs) {
  const p = prefs || loadVoicePrefs();
  if (marker === 'MAN') return p.male;
  if (marker === 'WOMAN') return p.female;
  return p.defaultGender === 'female' ? p.female : p.male;
}
