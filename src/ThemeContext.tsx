import { createContext, useContext } from 'react';
import {
  DANGER,
  DANGER_DARK,
  FLAVORS,
  FLAVORS_DARK,
  FONTS_JA,
  FONTS_LATIN,
  NEUTRAL,
  NEUTRAL_DARK,
  type DangerPalette,
  type FlavorTheme,
  type FontSet,
  type NeutralPalette,
  type Scheme,
} from './theme';
import type { Flavor, Lang } from './types';

/** Everything a component needs to paint itself for the active flavor + scheme + language. */
export type AppTheme = {
  scheme: Scheme;
  flavor: FlavorTheme;
  neutral: NeutralPalette;
  danger: DangerPalette;
  fonts: FontSet;
};

/**
 * Resolves the full theme for a flavor under a light/dark scheme.
 * @param flavor the sushi piece the user picked (also drives the palette).
 * @param scheme the resolved color scheme ('system' must already be resolved).
 * @param lang the active UI language — Japanese swaps Fredoka for a rounded
 * typeface with full JP glyph coverage.
 */
export function buildAppTheme(flavor: Flavor, scheme: Scheme, lang: Lang): AppTheme {
  return {
    scheme,
    flavor: (scheme === 'dark' ? FLAVORS_DARK : FLAVORS)[flavor],
    neutral: scheme === 'dark' ? NEUTRAL_DARK : NEUTRAL,
    danger: scheme === 'dark' ? DANGER_DARK : DANGER,
    fonts: lang === 'ja' ? FONTS_JA : FONTS_LATIN,
  };
}

const ThemeContext = createContext<AppTheme>(buildAppTheme('salmon', 'light', 'es'));

export const ThemeProvider = ThemeContext.Provider;

/** Current app theme (flavor colors + neutral/danger palettes + fonts + scheme). */
export function useAppTheme(): AppTheme {
  return useContext(ThemeContext);
}
