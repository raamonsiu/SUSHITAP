import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RADII, SHADOWS } from '../theme';
import { useAppTheme } from '../ThemeContext';
import { STRINGS, formatSessionDate } from '../i18n';
import type { Lang, Session } from '../types';

type Props = {
  open: boolean;
  onClose: () => void;
  accent: string;
  softBg: string;
  lang: Lang;
  count: number;
  sessions: Session[];
  onFinalize: () => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: number) => void;
};

/** How far left a session row must be dragged before it commits to deleting itself. */
const SWIPE_DELETE_THRESHOLD = -90;
/** How far the row is allowed to travel while the finger is still down. */
const SWIPE_MAX_DRAG = -140;
/** How long the "swipe to delete" hint stays fully visible before it starts hiding. */
const SWIPE_HINT_MS = 2600;
/** Durations for the hint flap sliding out from behind the row and back in. */
const HINT_SLIDE_OUT_MS = 260;
const HINT_SLIDE_BACK_MS = 320;
/** How far the hint flap tucks up behind the row, covering its rounded corners. */
const HINT_FLAP_OVERLAP = 16;
/** Extra list spacing reserved below a row while its hint flap peeks out. */
const HINT_FLAP_RESERVED_SPACE = 36;
/** How far the flap travels when sliding out from behind the row (its visible height). */
const HINT_FLAP_TRAVEL = HINT_FLAP_RESERVED_SPACE;

/** Small trash-can glyph, reused for the static icon and the swipe reveal. */
function TrashIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 6h18" />
      <Path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <Path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <Path d="M10 11v6" />
      <Path d="M14 11v6" />
    </Svg>
  );
}

/**
 * One row in the past-sessions list. Tapping the trash icon shows a "swipe
 * left to delete" flap below the row; dragging the row itself left reveals a
 * red trash icon behind it and, past a big enough swipe, deletes it with a
 * haptic tick.
 */
function SessionRow({
  session,
  accent,
  lang,
  onDelete,
}: {
  session: Session;
  accent: string;
  lang: Lang;
  onDelete: (sessionId: number) => void;
}) {
  const strings = STRINGS[lang];
  const { neutral, danger } = useAppTheme();
  const [hintMounted, setHintMounted] = useState(false);
  // 0 = flap fully hidden behind the row, 1 = flap slid out and peeking below it.
  const hintProgress = useSharedValue(0);
  const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const translateX = useSharedValue(0);
  const committed = useSharedValue(false);
  // 1 = row at full height; animated to 0 after a delete swipe so the rows
  // below close the gap smoothly instead of jumping.
  const collapseProgress = useSharedValue(1);
  const measuredHeight = useSharedValue(0);
  const isDeleting = useRef(false);

  useEffect(
    () => () => {
      if (hintTimeout.current) clearTimeout(hintTimeout.current);
    },
    []
  );

  const showSwipeHint = () => {
    if (hintTimeout.current) clearTimeout(hintTimeout.current);
    setHintMounted(true);
    hintProgress.value = withTiming(1, { duration: HINT_SLIDE_OUT_MS });
    hintTimeout.current = setTimeout(() => {
      hintProgress.value = withTiming(0, { duration: HINT_SLIDE_BACK_MS }, (finished) => {
        if (finished) runOnJS(setHintMounted)(false);
      });
    }, SWIPE_HINT_MS);
  };

  /** Tucks the hint flap back in early (e.g. when the user starts swiping the row). */
  const hideSwipeHint = () => {
    if (hintTimeout.current) {
      clearTimeout(hintTimeout.current);
      hintTimeout.current = null;
    }
    hintProgress.value = withTiming(0, { duration: HINT_SLIDE_BACK_MS }, (finished) => {
      if (finished) runOnJS(setHintMounted)(false);
    });
  };

  const triggerDeleteHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const markDeleting = () => {
    isDeleting.current = true;
  };

  const removeRow = () => {
    onDelete(session.id);
  };

  const pan = Gesture.Pan()
    .activeOffsetX(-10)
    .failOffsetY([-12, 12])
    .onStart(() => {
      // The flap below doesn't slide with the row, so tuck it away as soon
      // as a swipe begins to keep the delete animation clean.
      runOnJS(hideSwipeHint)();
    })
    .onUpdate((dragUpdateEvent) => {
      if (committed.value) return;
      const nextTranslateX = Math.max(Math.min(dragUpdateEvent.translationX, 0), SWIPE_MAX_DRAG);
      translateX.value = nextTranslateX;
      if (nextTranslateX <= SWIPE_DELETE_THRESHOLD) {
        committed.value = true;
        runOnJS(triggerDeleteHaptics)();
        runOnJS(markDeleting)();
        translateX.value = withTiming(SWIPE_MAX_DRAG * 3, { duration: 220 }, (slideFinished) => {
          if (!slideFinished) return;
          // Collapse the row's height so the list below closes the gap smoothly.
          collapseProgress.value = withTiming(0, { duration: 200 }, (collapseFinished) => {
            if (collapseFinished) runOnJS(removeRow)();
          });
        });
      }
    })
    .onEnd(() => {
      if (!committed.value) {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [0, SWIPE_DELETE_THRESHOLD],
      [neutral.sessionRowBg, danger.soft]
    ),
  }));

  const trashRevealStyle = useAnimatedStyle(() => {
    const progress = interpolate(translateX.value, [0, SWIPE_DELETE_THRESHOLD], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: progress,
      transform: [{ scale: 0.7 + progress * 0.5 }],
    };
  });

  // Slides the flap out from its fully-tucked position behind the row (like
  // a sheet of paper pulled out of a folder) and back in when hiding.
  const hintFlapStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(hintProgress.value, [0, 1], [-HINT_FLAP_TRAVEL, 0]) }],
  }));

  // Grows/shrinks in sync with the flap slide so the rows below move
  // organically instead of jumping when the space is reserved/released.
  const hintSpacerStyle = useAnimatedStyle(() => ({
    height: interpolate(hintProgress.value, [0, 1], [0, HINT_FLAP_RESERVED_SPACE]),
  }));

  // No-op until a delete commits, then squashes the whole wrapper to 0 height.
  const collapseStyle = useAnimatedStyle(() => ({
    maxHeight: collapseProgress.value === 1 ? 500 : measuredHeight.value * collapseProgress.value,
    opacity: collapseProgress.value,
    overflow: 'hidden',
  }));

  return (
    <Animated.View
      style={[styles.rowWrapper, collapseStyle]}
      onLayout={(layoutEvent) => {
        if (!isDeleting.current) measuredHeight.value = layoutEvent.nativeEvent.layout.height;
      }}
    >
      <View style={styles.rowArea}>
        {hintMounted && (
          <Animated.View style={[styles.hintFlap, { backgroundColor: danger.soft }, hintFlapStyle]}>
            <Text style={[styles.hintFlapText, { color: danger.text }]}>{strings.swipeToDelete}</Text>
          </Animated.View>
        )}

        <View style={styles.swipeContainer}>
          <View style={[styles.swipeBackground, { backgroundColor: danger.soft }]}>
            <Animated.View style={trashRevealStyle}>
              <TrashIcon color={danger.text} size={22} />
            </Animated.View>
          </View>

          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.row, rowStyle]}>
              <Text style={[styles.rowWhen, { color: neutral.linkText }]}>{formatSessionDate(session.start, lang)}</Text>
              <View style={styles.rowRight}>
                <View style={styles.rowTotalGroup}>
                  <Text style={[styles.rowTotal, { color: accent }]}>{session.total}</Text>
                  <Text style={[styles.rowUnit, { color: neutral.mutedTextFaintest }]}>{strings.piecesShort}</Text>
                </View>
                <Pressable
                  onPress={showSwipeHint}
                  accessibilityLabel={strings.deleteSession}
                  hitSlop={8}
                  style={styles.deleteBtn}
                >
                  <TrashIcon color={neutral.mutedTextFaintest} size={20} />
                </Pressable>
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </View>

      {hintMounted && <Animated.View style={hintSpacerStyle} />}
    </Animated.View>
  );
}

/**
 * Content of the right drawer: the in-progress session card (finalize/start
 * new session actions) plus the scrollable list of past sessions.
 */
export default function HistoryDrawer({
  open,
  onClose,
  accent,
  softBg,
  lang,
  count,
  sessions,
  onFinalize,
  onNewSession,
  onDeleteSession,
}: Props) {
  const strings = STRINGS[lang];
  const { neutral } = useAppTheme();
  const canFinalize = count > 0;

  return (
    <View style={styles.content} pointerEvents={open ? 'auto' : 'none'}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: neutral.textBrown }]}>{strings.history}</Text>
        <Pressable
          onPress={onClose}
          accessibilityLabel="Cerrar"
          style={[styles.closeBtn, { backgroundColor: neutral.closeBtnBg }]}
        >
          <Text style={[styles.closeText, { color: neutral.mutedTextSoft }]}>✕</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: softBg }]}>
        <View style={styles.cardRow}>
          <Text style={[styles.cardLabel, { color: neutral.mutedTextSoft }]}>{strings.current}</Text>
          <Text style={[styles.cardCount, { color: accent }]}>{count}</Text>
        </View>

        <Pressable
          onPress={onFinalize}
          disabled={!canFinalize}
          style={[
            styles.finalizeBtn,
            canFinalize
              ? { backgroundColor: accent, ...SHADOWS.activePill }
              : { backgroundColor: neutral.disabledBg },
          ]}
        >
          <Text style={[styles.finalizeText, { color: canFinalize ? '#fff' : neutral.disabledText }]}>
            {strings.finalize}
          </Text>
        </Pressable>

        <Pressable onPress={onNewSession} style={[styles.newBtn, { borderColor: accent }]}>
          <Text style={[styles.newText, { color: accent }]}>{strings.newSession}</Text>
        </Pressable>
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.sessionsTitle}</Text>
        {sessions.length > 0 ? (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }}>
            {sessions.map((session) => (
              <SessionRow key={session.id} session={session} accent={accent} lang={lang} onDelete={onDeleteSession} />
            ))}
          </ScrollView>
        ) : (
          <Text style={[styles.empty, { color: neutral.mutedTextFaint }]}>{strings.empty}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 22,
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
  card: {
    borderRadius: RADII.card,
    padding: 18,
    gap: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
  },
  cardCount: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 32,
    lineHeight: 32,
  },
  finalizeBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: RADII.pill,
    alignItems: 'center',
  },
  finalizeText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
  newBtn: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: RADII.pill,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  newText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
  listSection: {
    flex: 1,
    minHeight: 0,
    gap: 12,
  },
  sectionLabel: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  rowWrapper: {
    position: 'relative',
  },
  rowArea: {
    position: 'relative',
  },
  swipeContainer: {
    position: 'relative',
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  swipeBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: RADII.pill,
  },
  rowWhen: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowTotalGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rowTotal: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 19,
  },
  rowUnit: {
    fontSize: 11,
  },
  deleteBtn: {
    padding: 4,
  },
  hintFlap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    marginTop: -HINT_FLAP_OVERLAP,
    borderRadius: RADII.pill,
    paddingTop: HINT_FLAP_OVERLAP + 8,
    paddingBottom: 9,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  hintFlapText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
  },
  empty: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 24,
  },
});
