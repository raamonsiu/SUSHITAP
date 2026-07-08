import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Prefs, Session } from './types';

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

export async function loadState(): Promise<LoadedState> {
  const [countRaw, prefsRaw, sessionsRaw, startRaw] = await Promise.all([
    AsyncStorage.getItem(KEYS.count),
    AsyncStorage.getItem(KEYS.prefs),
    AsyncStorage.getItem(KEYS.sessions),
    AsyncStorage.getItem(KEYS.start),
  ]);

  const count = parseInt(countRaw ?? '', 10);
  const prefs: Partial<Prefs> = prefsRaw ? JSON.parse(prefsRaw) : {};
  const sessions: Session[] = sessionsRaw ? JSON.parse(sessionsRaw) : [];

  let currentStart = parseInt(startRaw ?? '', 10);
  if (isNaN(currentStart)) {
    currentStart = Date.now();
    await AsyncStorage.setItem(KEYS.start, String(currentStart));
  }

  return {
    count: isNaN(count) ? 0 : count,
    prefs: { lang: prefs.lang ?? 'es', flavor: prefs.flavor ?? 'salmon' },
    sessions,
    currentStart,
  };
}

export function saveCount(count: number) {
  return AsyncStorage.setItem(KEYS.count, String(count));
}

export function savePrefs(prefs: Prefs) {
  return AsyncStorage.setItem(KEYS.prefs, JSON.stringify(prefs));
}

export function saveSessions(sessions: Session[]) {
  return AsyncStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

export function saveStart(start: number) {
  return AsyncStorage.setItem(KEYS.start, String(start));
}
