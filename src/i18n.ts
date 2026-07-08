import type { Flavor, Lang } from './types';

export const STRINGS: Record<Lang, Record<string, string>> = {
  es: {
    eaten: 'Hoy has comido',
    pieces: 'piezas de sushi',
    tap: 'toca el sushi para sumar',
    settings: 'Ajustes',
    language: 'Idioma',
    piece: 'Pieza de sushi',
    footer: '¡Buen provecho!',
    about: 'Sobre el desarrollador',
    version: 'Versión',
    history: 'Historial',
    current: 'Sesión actual',
    finalize: 'Finalizar sesión actual',
    newSession: 'Empezar nueva sesión',
    sessionsTitle: 'Sesiones anteriores',
    piecesShort: 'pzas',
    empty: 'Aún no hay sesiones guardadas',
    suggestions: 'Sugerencias',
    suggestionsCta: 'Enviar una sugerencia',
    suggestionsHint: 'Escribe tu idea y se abrirá tu app de correo para enviárnosla.',
    suggestionsPlaceholder: 'Escribe aquí tu sugerencia...',
    send: 'Enviar',
    cancel: 'Cancelar',
  },
  en: {
    eaten: 'Today you ate',
    pieces: 'pieces of sushi',
    tap: 'tap the sushi to add',
    settings: 'Settings',
    language: 'Language',
    piece: 'Sushi piece',
    footer: 'Enjoy your meal!',
    about: 'About the developer',
    version: 'Version',
    history: 'History',
    current: 'Current session',
    finalize: 'End current session',
    newSession: 'Start new session',
    sessionsTitle: 'Past sessions',
    piecesShort: 'pcs',
    empty: 'No saved sessions yet',
    suggestions: 'Suggestions',
    suggestionsCta: 'Send a suggestion',
    suggestionsHint: 'Write your idea and your mail app will open to send it to us.',
    suggestionsPlaceholder: 'Write your suggestion here...',
    send: 'Send',
    cancel: 'Cancel',
  },
};

export const LANG_LABELS: Record<Lang, Record<Lang, string>> = {
  es: { es: 'Español', en: 'English' },
  en: { es: 'Español', en: 'English' },
};

export const FLAVOR_LABELS: Record<Lang, Record<Flavor, string>> = {
  es: { salmon: 'Salmón', tuna: 'Atún', egg: 'Tamago' },
  en: { salmon: 'Salmon', tuna: 'Tuna', egg: 'Egg' },
};

export const LOCALE: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
};

/**
 * Formats a session's start time for display in the history list.
 * @param timestamp a `Date.now()`-style epoch milliseconds value.
 * @param lang the active UI language, used to pick the locale.
 * @returns a short localized string (e.g. "8 jul, 19:30"), or an empty
 * string if `timestamp` cannot be formatted.
 */
export function formatSessionDate(timestamp: number, lang: Lang): string {
  try {
    return new Date(timestamp).toLocaleString(LOCALE[lang], {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}
