import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DEV_LINKS, NEUTRAL, RADII, SHADOWS, APP_VERSION } from '../theme';
import { FLAVOR_LABELS, LANG_LABELS, STRINGS } from '../i18n';
import type { Flavor, Lang } from '../types';

type Props = {
  open: boolean;
  onClose: () => void;
  accent: string;
  lang: Lang;
  flavor: Flavor;
  onSetLang: (lang: Lang) => void;
  onSetFlavor: (flavor: Flavor) => void;
};

/** A single rounded choice button used for the language and flavor rows. */
function Pill({ label, active, accent, onPress }: { label: string; active: boolean; accent: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        { backgroundColor: active ? accent : NEUTRAL.pillInactiveBg },
        active && SHADOWS.activePill,
      ]}
    >
      <Text style={[styles.pillText, { color: active ? '#fff' : NEUTRAL.labelMuted3 }]}>{label}</Text>
    </Pressable>
  );
}

/** GitHub brand glyph, filled with the current theme accent. */
function GithubIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.56 22.29 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z" />
    </Svg>
  );
}

/** LinkedIn brand glyph, filled with the current theme accent. */
function LinkedinIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24" fill={color}>
      <Path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </Svg>
  );
}

/**
 * Content of the left drawer: language and sushi flavor pickers (choosing a
 * flavor also drives the app-wide color theme), plus the developer footer.
 */
export default function SettingsDrawer({ open, onClose, accent, lang, flavor, onSetLang, onSetFlavor }: Props) {
  const strings = STRINGS[lang];

  return (
    <View style={styles.content} pointerEvents={open ? 'auto' : 'none'}>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.settings}</Text>
        <Pressable onPress={onClose} accessibilityLabel="Cerrar" style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.language}</Text>
        <View style={styles.pillRow}>
          {(['es', 'en'] as Lang[]).map((langCode) => (
            <Pill
              key={langCode}
              label={LANG_LABELS[lang][langCode]}
              active={lang === langCode}
              accent={accent}
              onPress={() => onSetLang(langCode)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.piece}</Text>
        <View style={styles.pillRow}>
          {(['salmon', 'tuna', 'egg'] as Flavor[]).map((flavorCode) => (
            <Pill
              key={flavorCode}
              label={FLAVOR_LABELS[lang][flavorCode]}
              active={flavor === flavorCode}
              accent={accent}
              onPress={() => onSetFlavor(flavorCode)}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.footerText}>{strings.footer}</Text>
          <Text style={styles.versionText}>
            {strings.version} {APP_VERSION}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={{ gap: 11 }}>
          <Text style={[styles.sectionLabel, { color: accent }]}>{strings.about}</Text>
          <View style={styles.pillRow}>
            <Pressable style={styles.linkChip} onPress={() => Linking.openURL(DEV_LINKS.githubUrl)}>
              <GithubIcon color={accent} />
              <Text style={styles.linkText}>GitHub</Text>
            </Pressable>
            <Pressable style={styles.linkChip} onPress={() => Linking.openURL(DEV_LINKS.linkedinUrl)}>
              <LinkedinIcon color={accent} />
              <Text style={styles.linkText}>LinkedIn</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 24,
    color: NEUTRAL.textBrown,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NEUTRAL.closeBtnBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: NEUTRAL.labelMuted3,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: RADII.pill,
    alignItems: 'center',
  },
  pillText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 14,
  },
  footer: {
    marginTop: 'auto',
    gap: 16,
  },
  footerText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
    color: NEUTRAL.labelMuted1,
  },
  versionText: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 12,
    color: NEUTRAL.labelMuted4,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: NEUTRAL.divider,
  },
  linkChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: RADII.pill,
    backgroundColor: NEUTRAL.pillInactiveBg,
  },
  linkText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 14,
    color: NEUTRAL.linkText,
  },
});
