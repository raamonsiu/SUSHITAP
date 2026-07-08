import type { Flavor } from './types';

export const FLAVORS: Record<
  Flavor,
  {
    accent: string;
    accentSoft: string;
    softBg: string;
    bg: [string, string, string];
    blobs: [string, string, string];
    top: string;
    topHi: string;
    stripe: string;
  }
> = {
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

export const NEUTRAL = {
  textBrown: '#5A4A42',
  labelMuted1: '#B79A8C',
  labelMuted2: '#A98A7A',
  labelMuted3: '#9A8A80',
  labelMuted4: '#C6B4A9',
  labelMuted5: '#B0A096',
  drawerBg: '#FFFCFA',
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

export const DEV_LINKS = {
  githubUrl: 'https://github.com/raamonsiu',
  linkedinUrl: 'https://www.linkedin.com/in/ramon-lópez-cros',
};

export const APP_VERSION = '0.1.0';
