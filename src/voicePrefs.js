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

// Pick a voice from `list` that differs from `primary`, so a second
// same-gender speaker in a dialogue (M2 / F2) is audibly distinct from
// the first (M1 / F1). Falls back to the primary if the catalog has
// only one voice for that gender.
function altVoice(primary, list) {
  const found = list.find((v) => v.name !== primary);
  return found ? found.name : primary;
}

// Resolve the voice name for a parsed dialogue turn or single-narrator
// passage. Called from AudioPlayer.
//
// Supported markers:
//   MAN / M1  → user's chosen male voice
//   M2        → a second, distinct male voice (for two-male dialogues)
//   WOMAN / F1→ user's chosen female voice
//   F2        → a second, distinct female voice
//   (none)    → default-gender voice
export function resolveVoice(marker, prefs) {
  const p = prefs || loadVoicePrefs();
  switch (marker) {
    case 'MAN':
    case 'M1':
      return p.male;
    case 'M2':
      return altVoice(p.male, VOICE_CATALOG.male);
    case 'WOMAN':
    case 'F1':
      return p.female;
    case 'F2':
      return altVoice(p.female, VOICE_CATALOG.female);
    default:
      return p.defaultGender === 'female' ? p.female : p.male;
  }
}
