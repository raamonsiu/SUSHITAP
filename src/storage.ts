import AsyncStorage from '@react-native-async-storage/async-storage';
import { resolveSystemLang } from './locale';
import type { Lang, Prefs, Session } from './types';

const KEYS = {
  count: 'sushiCount',
  prefs: 'sushiPrefs',
  sessions: 'sushiSessions',
  start: 'sushiStart',
} as const;

export type LoadedState = {
  count: number;
  prefs: Prefs;
  sessions: Session[];
  currentStart: number;
};

/**
 * Reads all persisted app state from AsyncStorage in one go.
 * Pre: none. Post: if no session start timestamp was stored yet, one is
 * created and persisted so every subsequent call finds a valid value.
 * @returns the counter, language/flavor preferences, saved sessions, and the
 * start time of the session currently in progress, all with safe defaults.
 */
export async function loadState(): Promise<LoadedState> {
  const [countRaw, prefsRaw, sessionsRaw, startRaw] = await Promise.all([
    AsyncStorage.getItem(KEYS.count),
    AsyncStorage.getItem(KEYS.prefs),
    AsyncStorage.getItem(KEYS.sessions),
    AsyncStorage.getItem(KEYS.start),
  ]);

  const count = parseInt(countRaw ?? '', 10);
  // `lang` is the pre-A.1 shape (a single fixed language, no system/manual mode).
  const storedPrefs: Partial<Prefs> & { lang?: Lang } = prefsRaw ? JSON.parse(prefsRaw) : {};
  const sessions: Session[] = sessionsRaw ? JSON.parse(sessionsRaw) : [];

  let currentStart = parseInt(startRaw ?? '', 10);
  if (isNaN(currentStart)) {
    currentStart = Date.now();
    await AsyncStorage.setItem(KEYS.start, String(currentStart));
  }

  const prefs: Prefs = storedPrefs.langMode
    ? { langMode: storedPrefs.langMode, manualLang: storedPrefs.manualLang ?? resolveSystemLang(), flavor: storedPrefs.flavor ?? 'salmon' }
    : storedPrefs.lang
      ? { langMode: 'manual', manualLang: storedPrefs.lang, flavor: storedPrefs.flavor ?? 'salmon' }
      : { langMode: 'system', manualLang: resolveSystemLang(), flavor: storedPrefs.flavor ?? 'salmon' };

  return {
    count: isNaN(count) ? 0 : count,
    prefs,
    sessions,
    currentStart,
  };
}

/** Persists the current session's tally. @param count pieces eaten so far. */
export function saveCount(count: number) {
  return AsyncStorage.setItem(KEYS.count, String(count));
}

/** Persists the user's language and sushi flavor choice. @param prefs the preferences to store. */
export function savePrefs(prefs: Prefs) {
  return AsyncStorage.setItem(KEYS.prefs, JSON.stringify(prefs));
}

/** Persists the full session history. @param sessions all archived sessions, newest first. */
export function saveSessions(sessions: Session[]) {
  return AsyncStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

/** Persists when the current (in-progress) session started. @param start a `Date.now()` timestamp. */
export function saveStart(start: number) {
  return AsyncStorage.setItem(KEYS.start, String(start));
}
