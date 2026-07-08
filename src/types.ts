export type Lang = 'es' | 'en';

export type Flavor = 'salmon' | 'tuna' | 'egg';

export type Session = {
  id: number;
  start: number;
  end: number;
  total: number;
};

export type Prefs = {
  lang: Lang;
  flavor: Flavor;
};
