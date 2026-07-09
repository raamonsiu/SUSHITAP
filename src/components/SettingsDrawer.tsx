import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DEV_LINKS, RADII, SHADOWS, APP_VERSION } from '../theme';
import { FLAVOR_LABELS, LANG_NATIVE_NAMES, STRINGS } from '../i18n';
import { SUPPORTED_LANGS } from '../locale';
import { useAppTheme } from '../ThemeContext';
import type { Flavor, Lang, LangMode, ThemeMode } from '../types';
import SuggestionModal from './SuggestionModal';

type Props = {
  open: boolean;
  onClose: () => void;
  accent: string;
  lang: Lang;
  langMode: LangMode;
  manualLang: Lang;
  themeMode: ThemeMode;
  flavor: Flavor;
  onSetLangMode: (mode: LangMode) => void;
  onSetManualLang: (lang: Lang) => void;
  onSetThemeMode: (mode: ThemeMode) => void;
  onSetFlavor: (flavor: Flavor) => void;
};

/**
 * A single rounded choice button used for the language, language-mode, and
 * flavor pickers. `fill` makes it share a row equally; otherwise it sizes to
 * its label, for use in a wrapping grid (the manual language picker).
 * `variant: 'outline'` marks it active without the solid fill, used for the
 * "Otro" pill once a manual language has been picked and its grid is collapsed.
 */
function Pill({
  label,
  active,
  accent,
  onPress,
  fill = true,
  variant = 'solid',
}: {
  label: string;
  active: boolean;
  accent: string;
  onPress: () => void;
  fill?: boolean;
  variant?: 'solid' | 'outline';
}) {
  const { neutral } = useAppTheme();
  const isSolidActive = active && variant === 'solid';
  const isOutlineActive = active && variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pill,
        fill ? styles.pillFill : styles.pillAuto,
        isOutlineActive
          ? [styles.pillOutline, { borderColor: accent }]
          : { backgroundColor: isSolidActive ? accent : neutral.pillInactiveBg },
        isSolidActive && SHADOWS.activePill,
      ]}
    >
      <Text
        style={[
          styles.pillText,
          { color: isSolidActive ? '#fff' : isOutlineActive ? accent : neutral.mutedTextSoft },
        ]}
      >
        {label}
      </Text>
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

/** Buy Me A Coffee brand glyph, filled with the current theme accent. */
function BuyMeACoffeeIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24" fill={color}>
      <Path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z" />
    </Svg>
  );
}

/**
 * Content of the left drawer: language and sushi flavor pickers (choosing a
 * flavor also drives the app-wide color theme), plus the developer footer.
 */
export default function SettingsDrawer({
  open,
  onClose,
  accent,
  lang,
  langMode,
  manualLang,
  themeMode,
  flavor,
  onSetLangMode,
  onSetManualLang,
  onSetThemeMode,
  onSetFlavor,
}: Props) {
  const strings = STRINGS[lang];
  const { neutral } = useAppTheme();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [manualPickerOpen, setManualPickerOpen] = useState(false);

  const handlePressSystem = () => {
    onSetLangMode('system');
    setManualPickerOpen(false);
  };
  const handlePressOther = () => {
    if (langMode === 'manual') {
      setManualPickerOpen((wasOpen) => !wasOpen);
    } else {
      onSetLangMode('manual');
      setManualPickerOpen(true);
    }
  };
  const handlePickManualLang = (langCode: Lang) => {
    onSetManualLang(langCode);
    setManualPickerOpen(false);
  };

  return (
    <View style={styles.content} pointerEvents={open ? 'auto' : 'none'}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: neutral.textBrown }]}>{strings.settings}</Text>
        <Pressable
          onPress={onClose}
          accessibilityLabel="Cerrar"
          style={[styles.closeBtn, { backgroundColor: neutral.closeBtnBg }]}
        >
          <Text style={[styles.closeText, { color: neutral.mutedTextSoft }]}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.language}</Text>
        <View style={styles.pillRow}>
          <Pill label={strings.langModeSystem} active={langMode === 'system'} accent={accent} onPress={handlePressSystem} />
          <Pill
            label={strings.langModeOther}
            active={langMode === 'manual'}
            accent={accent}
            variant={langMode === 'manual' && !manualPickerOpen ? 'outline' : 'solid'}
            onPress={handlePressOther}
          />
        </View>
        {langMode === 'manual' && manualPickerOpen ? (
          <View style={styles.languageGrid}>
            {SUPPORTED_LANGS.map((langCode) => (
              <Pill
                key={langCode}
                label={LANG_NATIVE_NAMES[langCode]}
                active={manualLang === langCode}
                accent={accent}
                fill={false}
                onPress={() => handlePickManualLang(langCode)}
              />
            ))}
          </View>
        ) : (
          <Text style={[styles.languageHint, { color: neutral.mutedTextSoft }]}>
            → {LANG_NATIVE_NAMES[langMode === 'system' ? lang : manualLang]}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.theme}</Text>
        <View style={styles.pillRow}>
          {(['system', 'light', 'dark'] as ThemeMode[]).map((themeModeOption) => (
            <Pill
              key={themeModeOption}
              label={
                themeModeOption === 'system'
                  ? strings.langModeSystem
                  : themeModeOption === 'light'
                    ? strings.themeLight
                    : strings.themeDark
              }
              active={themeMode === themeModeOption}
              accent={accent}
              onPress={() => onSetThemeMode(themeModeOption)}
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

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.suggestions}</Text>
        <Pressable
          style={[styles.fullWidthChip, { backgroundColor: neutral.pillInactiveBg }]}
          onPress={() => setSuggestionModalOpen(true)}
        >
          <Text style={[styles.linkText, { color: neutral.linkText }]}>{strings.suggestionsCta}</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.footerText, { color: neutral.mutedTextStrong }]}>{strings.footer}</Text>
          <Text style={[styles.versionText, { color: neutral.mutedTextFaint }]}>
            {strings.version} {APP_VERSION}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: neutral.divider }]} />
        <View style={{ gap: 11 }}>
          <Text style={[styles.sectionLabel, { color: accent }]}>{strings.about}</Text>
          <View style={styles.pillRow}>
            <Pressable
              style={[styles.linkChip, { backgroundColor: neutral.pillInactiveBg }]}
              onPress={() => Linking.openURL(DEV_LINKS.githubUrl)}
            >
              <GithubIcon color={accent} />
              <Text style={[styles.linkText, { color: neutral.linkText }]}>GitHub</Text>
            </Pressable>
            <Pressable
              style={[styles.linkChip, { backgroundColor: neutral.pillInactiveBg }]}
              onPress={() => Linking.openURL(DEV_LINKS.linkedinUrl)}
            >
              <LinkedinIcon color={accent} />
              <Text style={[styles.linkText, { color: neutral.linkText }]}>LinkedIn</Text>
            </Pressable>
          </View>
          <Pressable
            style={[styles.fullWidthChip, { backgroundColor: neutral.pillInactiveBg }]}
            onPress={() => Linking.openURL(DEV_LINKS.buyMeACoffeeUrl)}
          >
            <BuyMeACoffeeIcon color={accent} />
            <Text style={[styles.linkText, { color: neutral.linkText }]}>Buy me a coffee</Text>
          </Pressable>
        </View>
      </View>

      <SuggestionModal
        visible={suggestionModalOpen}
        onClose={() => setSuggestionModalOpen(false)}
        accent={accent}
        lang={lang}
      />
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
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
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
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: RADII.pill,
    alignItems: 'center',
  },
  pillFill: {
    flex: 1,
  },
  pillAuto: {
    paddingHorizontal: 14,
  },
  pillOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  pillText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 14,
  },
  languageHint: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 13,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footer: {
    marginTop: 'auto',
    gap: 16,
  },
  footerText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
  },
  versionText: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 12,
    marginTop: 3,
  },
  divider: {
    height: 1,
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
  },
  fullWidthChip: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: RADII.pill,
  },
  linkText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 14,
  },
});
