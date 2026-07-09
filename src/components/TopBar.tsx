import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { RADII, SHADOWS } from '../theme';
import { useAppTheme } from '../ThemeContext';

type Props = {
  accent: string;
  onOpenMenu: () => void;
  onOpenHistory: () => void;
};

const BUTTON_SIZE = 60;

/** Top row with the menu (settings) and history buttons, pinned below the status bar. */
export default function TopBar({ accent, onOpenMenu, onOpenHistory }: Props) {
  const insets = useSafeAreaInsets();
  const { neutral } = useAppTheme();
  const buttonBg = { backgroundColor: neutral.topButtonBg };

  return (
    <View style={[styles.row, { paddingTop: insets.top + 16 }]}>
      <Pressable
        onPress={onOpenMenu}
        accessibilityLabel="Menú"
        hitSlop={8}
        style={({ pressed }) => [styles.button, buttonBg, SHADOWS.topButton, pressed && styles.pressed]}
      >
        <View style={[styles.bar, { backgroundColor: accent }]} />
        <View style={[styles.bar, { backgroundColor: accent }]} />
        <View style={[styles.bar, { backgroundColor: accent }]} />
      </Pressable>

      <Pressable
        onPress={onOpenHistory}
        accessibilityLabel="Historial"
        hitSlop={8}
        style={({ pressed }) => [styles.button, buttonBg, SHADOWS.topButton, pressed && styles.pressed]}
      >
        <Svg
          width={29}
          height={29}
          viewBox="0 0 24 24"
          fill="none"
          stroke={accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M3 3v5h5" />
          <Path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
          <Path d="M12 7v5l3 2" />
        </Svg>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: RADII.topButton + 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pressed: {
    transform: [{ scale: 0.94 }],
  },
  bar: {
    width: 24,
    height: 4,
    borderRadius: 3,
  },
});
