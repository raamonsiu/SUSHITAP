import { createContext, useContext } from 'react';
import {
  DANGER,
  DANGER_DARK,
  FLAVORS,
  FLAVORS_DARK,
  NEUTRAL,
  NEUTRAL_DARK,
  type DangerPalette,
  type FlavorTheme,
  type NeutralPalette,
  type Scheme,
} from './theme';
import type { Flavor } from './types';

/** Everything a component needs to paint itself for the active flavor + scheme. */
export type AppTheme = {
  scheme: Scheme;
  flavor: FlavorTheme;
  neutral: NeutralPalette;
  danger: DangerPalette;
};

/**
 * Resolves the full theme for a flavor under a light/dark scheme.
 * @param flavor the sushi piece the user picked (also drives the palette).
 * @param scheme the resolved color scheme ('system' must already be resolved).
 */
export function buildAppTheme(flavor: Flavor, scheme: Scheme): AppTheme {
  return {
    scheme,
    flavor: (scheme === 'dark' ? FLAVORS_DARK : FLAVORS)[flavor],
    neutral: scheme === 'dark' ? NEUTRAL_DARK : NEUTRAL,
    danger: scheme === 'dark' ? DANGER_DARK : DANGER,
  };
}

const ThemeContext = createContext<AppTheme>(buildAppTheme('salmon', 'light'));

export const ThemeProvider = ThemeContext.Provider;

/** Current app theme (flavor colors + neutral/danger palettes + scheme). */
export function useAppTheme(): AppTheme {
  return useContext(ThemeContext);
}
