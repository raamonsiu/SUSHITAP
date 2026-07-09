import type { Flavor } from './types';

/** The resolved color scheme actually in effect (a ThemeMode of 'system' resolves to one of these). */
export type Scheme = 'light' | 'dark';

export type FlavorTheme = {
  accent: string;
  accentSoft: string;
  softBg: string;
  bg: [string, string, string];
  blobs: [string, string, string];
  top: string;
  topHi: string;
  stripe: string;
};

export const FLAVORS: Record<Flavor, FlavorTheme> = {
  salmon: {
    accent: '#F0805A',
    accentSoft: '#FFD9C4',
    softBg: '#FFF0E8',
    bg: ['#FFF6EE', '#FFEAF0', '#FDE3F1'],
    blobs: ['#CFEEE0', '#E4DAFB', '#CDE8FB'],
    top: '#FF9166',
    topHi: '#FFC3A3',
    stripe: '#FFE0CE',
  },
  tuna: {
    accent: '#E15C6E',
    accentSoft: '#F7C8D0',
    softBg: '#FDECEF',
    bg: ['#FFF4F5', '#FCE2E8', '#F8D6E0'],
    blobs: ['#FBD9CF', '#E9DAFB', '#CFE9FB'],
    top: '#E76A7A',
    topHi: '#F3A2AC',
    stripe: '#FFD3DA',
  },
  egg: {
    accent: '#D99A18',
    accentSoft: '#FBE6A8',
    softBg: '#FDF5E1',
    bg: ['#FFFBEF', '#FEF3D6', '#FBEBBF'],
    blobs: ['#CFEEE0', '#FBD9CF', '#CDE8FB'],
    top: '#FFCF5C',
    topHi: '#FFE3A0',
    stripe: '#FFF0C7',
  },
};

/**
 * Dark variants of each flavor theme. Accents and the sushi's own colors are
 * kept identical to light mode (they pop nicely on dark); backgrounds, blobs
 * and soft fills shift to warm dark browns tinted by the flavor.
 */
export const FLAVORS_DARK: Record<Flavor, FlavorTheme> = {
  salmon: {
    accent: '#F0805A',
    accentSoft: '#5A3A2C',
    softBg: '#3A2A24',
    bg: ['#2E211E', '#332028', '#37202E'],
    blobs: ['#2C4A40', '#3A3054', '#2A4258'],
    top: '#FF9166',
    topHi: '#FFC3A3',
    stripe: '#FFE0CE',
  },
  tuna: {
    accent: '#E15C6E',
    accentSoft: '#59303A',
    softBg: '#3A242A',
    bg: ['#301F24', '#351E2A', '#3A1E30'],
    blobs: ['#4A332C', '#3A3054', '#2A4258'],
    top: '#E76A7A',
    topHi: '#F3A2AC',
    stripe: '#FFD3DA',
  },
  egg: {
    accent: '#D99A18',
    accentSoft: '#4E401F',
    softBg: '#3A3222',
    bg: ['#2E2818', '#332B18', '#38301B'],
    blobs: ['#2C4A40', '#4A332C', '#2A4258'],
    top: '#FFCF5C',
    topHi: '#FFE3A0',
    stripe: '#FFF0C7',
  },
};

export const NEUTRAL = {
  textBrown: '#5A4A42',
  mutedTextStrong: '#B79A8C',
  mutedTextMedium: '#A98A7A',
  mutedTextSoft: '#9A8A80',
  mutedTextFaint: '#C6B4A9',
  mutedTextFaintest: '#B0A096',
  drawerBg: '#FFFCFA',
  drawerHandle: 'rgba(154,138,128,0.35)',
  closeBtnBg: '#F4ECE7',
  pillInactiveBg: '#F3ECE7',
  linkText: '#7A6A60',
  sessionRowBg: '#F7F1EC',
  divider: '#F0E6DF',
  disabledBg: '#EDE4DE',
  disabledText: '#C2B4AA',
  rice: '#FFFDF9',
  eyes: '#43302B',
  cheeks: '#FF9BB0',
  overlay: 'rgba(60,40,35,0.34)',
  topButtonBg: 'rgba(255,255,255,0.85)',
  floaterHalo: 'rgba(255,255,255,0.7)',
};

export type NeutralPalette = typeof NEUTRAL;

/** Dark counterpart of NEUTRAL — same keys, warm dark browns and cream text. */
export const NEUTRAL_DARK: NeutralPalette = {
  textBrown: '#F0E4DC',
  mutedTextStrong: '#C7AB9C',
  mutedTextMedium: '#B89C8C',
  mutedTextSoft: '#A68C7E',
  mutedTextFaint: '#8B7869',
  mutedTextFaintest: '#7E6C60',
  drawerBg: '#2B2220',
  drawerHandle: 'rgba(210,190,178,0.30)',
  closeBtnBg: '#3D322D',
  pillInactiveBg: '#3D322D',
  linkText: '#CDB6A8',
  sessionRowBg: '#372D28',
  divider: '#443830',
  disabledBg: '#3A302B',
  disabledText: '#6E5D53',
  rice: '#FFFDF9',
  eyes: '#43302B',
  cheeks: '#FF9BB0',
  overlay: 'rgba(0,0,0,0.55)',
  topButtonBg: 'rgba(58,46,42,0.85)',
  floaterHalo: 'rgba(0,0,0,0.35)',
};

/** Colors used for the swipe-to-delete affordance on history sessions. */
export const DANGER = {
  text: '#C75450',
  soft: '#FBE4E2',
};

export type DangerPalette = typeof DANGER;

export const DANGER_DARK: DangerPalette = {
  text: '#E58F8A',
  soft: '#4A2B28',
};

export const RADII = {
  topButton: 18,
  pill: 15,
  card: 20,
  drawer: 30,
  circle: 9999,
};

export const SHADOWS = {
  topButton: {
    shadowColor: 'rgba(120,90,80,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  drawer: {
    shadowColor: 'rgba(90,60,55,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 12,
  },
  activePill: {
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;

/** Named font-family sets so typography can swap per language. */
export type FontSet = {
  regular: string;
  medium: string;
  semiBold: string;
  bold: string;
};

/** Fredoka — the app's main typeface (latin scripts). */
export const FONTS_LATIN: FontSet = {
  regular: 'Fredoka_400Regular',
  medium: 'Fredoka_500Medium',
  semiBold: 'Fredoka_600SemiBold',
  bold: 'Fredoka_700Bold',
};

/**
 * M PLUS Rounded 1c — rounded typeface with full Japanese coverage, visually
 * close to Fredoka. It has no 600 weight, so semiBold maps to 700 and bold
 * bumps to 800 to keep the hierarchy.
 */
export const FONTS_JA: FontSet = {
  regular: 'MPLUSRounded1c_400Regular',
  medium: 'MPLUSRounded1c_500Medium',
  semiBold: 'MPLUSRounded1c_700Bold',
  bold: 'MPLUSRounded1c_800ExtraBold',
};

export const DEV_LINKS = {
  githubUrl: 'https://github.com/raamonsiu',
  linkedinUrl: 'https://www.linkedin.com/in/ramon-lópez-cros',
  buyMeACoffeeUrl: 'https://buymeacoffee.com/d1ito',
  suggestionsEmail: 'ramonjunior04@gmail.com',
};

export const APP_VERSION = '1.0.907';
