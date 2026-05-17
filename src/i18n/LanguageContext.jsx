import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { MESSAGES, DEFAULT_LANG, detectInitialLanguage } from './messages.js';

export const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

const STORAGE_KEY = 'jflt_lang';

/**
 * Resolve a dotted key path against the messages dict.
 * "common.next" → MESSAGES[lang].common.next
 */
function lookup(messages, key) {
  if (!key || typeof key !== 'string') return key;
  const parts = key.split('.');
  let cur = messages;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) {
      cur = cur[p];
    } else {
      return null;
    }
  }
  return cur;
}

/**
 * Interpolate {token} placeholders with vars values.
 */
function interpolate(template, vars) {
  if (!vars || typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

  const setLang = useCallback((next) => {
    if (next !== 'en' && next !== 'ja') return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // ignore
    }
  }, []);

  // Update <html lang="..."> for accessibility/SEO
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      const value = lookup(MESSAGES[lang], key);
      if (value == null) {
        // Fallback: try the other language
        const fallback = lookup(MESSAGES[DEFAULT_LANG], key);
        if (fallback != null) return interpolate(fallback, vars);
        // Last resort: return the key itself so the dev can spot missing entries
        if (typeof console !== 'undefined') {
          console.warn(`[i18n] missing key: ${key}`);
        }
        return key;
      }
      if (typeof value === 'string') return interpolate(value, vars);
      // Arrays / objects: return as-is (caller handles them)
      return value;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
