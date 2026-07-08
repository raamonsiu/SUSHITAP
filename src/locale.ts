import { getLocales } from 'expo-localization';
import type { Lang } from './types';

export const SUPPORTED_LANGS: Lang[] = ['es', 'en', 'ca', 'fr', 'it', 'de', 'ja'];

const FALLBACK_LANG: Lang = 'en';

/**
 * Resolves the device's system language to one of our supported languages.
 * Pre: none. Post: none (pure read of the device's locale settings).
 * @returns the device's language if supported, otherwise `FALLBACK_LANG`.
 */
export function resolveSystemLang(): Lang {
  const deviceLanguageCode = getLocales()[0]?.languageCode;
  return SUPPORTED_LANGS.find((lang) => lang === deviceLanguageCode) ?? FALLBACK_LANG;
}
