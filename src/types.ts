export type Lang = 'es' | 'en' | 'ca' | 'fr' | 'it' | 'de' | 'ja';

/** Whether the active language follows the device's system language, or a language the user picked by hand. */
export type LangMode = 'system' | 'manual';

/** Light/dark preference: follow the device, or force one scheme. */
export type ThemeMode = 'system' | 'light' | 'dark';

export type Flavor = 'salmon' | 'tuna' | 'egg';

export type Session = {
  id: number;
  start: number;
  end: number;
  total: number;
};

export type Prefs = {
  langMode: LangMode;
  manualLang: Lang;
  themeMode: ThemeMode;
  flavor: Flavor;
};
