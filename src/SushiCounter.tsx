import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import Background from './components/Background';
import Blobs from './components/Blobs';
import Drawer from './components/Drawer';
import FloatingPlusOne from './components/FloatingPlusOne';
import HistoryDrawer from './components/HistoryDrawer';
import SettingsDrawer from './components/SettingsDrawer';
import Sushi from './components/Sushi';
import TopBar from './components/TopBar';
import { STRINGS } from './i18n';
import { loadState, saveCount, savePrefs, saveSessions, saveStart } from './storage';
import { FLAVORS, NEUTRAL } from './theme';
import type { Flavor, Lang, Session } from './types';

/**
 * Main and only screen of the app. Owns all state (counter, prefs, sessions,
 * drawer visibility) and renders the home view plus the two side drawers.
 */
export default function SushiCounter() {
  const [count, setCount] = useState(0);
  const [lang, setLang] = useState<Lang>('es');
  const [flavor, setFlavor] = useState<Flavor>('salmon');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentStart, setCurrentStart] = useState<number>(Date.now());
  const [menuOpen, setMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [floaters, setFloaters] = useState<{ id: number }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState().then((loadedState) => {
      setCount(loadedState.count);
      setLang(loadedState.prefs.lang);
      setFlavor(loadedState.prefs.flavor);
      setSessions(loadedState.sessions);
      setCurrentStart(loadedState.currentStart);
      setLoaded(true);
    });
  }, []);

  const strings = STRINGS[lang];
  const theme = FLAVORS[flavor];

  /**
   * Handles a tap on the sushi. Increments the counter, persists it, and
   * spawns a floating "+1" indicator that removes itself after 900ms.
   * Pre: none. Post: `count` is incremented by 1 and saved to disk.
   */
  const eat = () => {
    const floaterId = Date.now() + Math.random();
    setCount((previousCount) => {
      const nextCount = previousCount + 1;
      saveCount(nextCount);
      return nextCount;
    });
    setFloaters((previousFloaters) => [...previousFloaters, { id: floaterId }]);
    setTimeout(() => {
      setFloaters((previousFloaters) => previousFloaters.filter((floater) => floater.id !== floaterId));
    }, 900);
  };

  const openMenu = () => {
    setMenuOpen(true);
    setHistoryOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);
  const openHistory = () => {
    setHistoryOpen(true);
    setMenuOpen(false);
  };
  const closeHistory = () => setHistoryOpen(false);
  const closeAll = () => {
    setMenuOpen(false);
    setHistoryOpen(false);
  };

  /**
   * Ends the current session. If it has any pieces, archives it to history.
   * Always starts a fresh session timer, even when the count was already 0.
   * Pre: none (button that triggers this is disabled when count === 0).
   * Post: `count` is 0, `sessions` may gain a new entry, `currentStart` is now.
   */
  const finalize = () => {
    setCount((currentCount) => {
      if (currentCount > 0) {
        setSessions((previousSessions) => {
          const archivedSession: Session = {
            id: Date.now(),
            start: currentStart,
            end: Date.now(),
            total: currentCount,
          };
          const updatedSessions = [archivedSession, ...previousSessions];
          saveSessions(updatedSessions);
          return updatedSessions;
        });
      }
      const newSessionStart = Date.now();
      saveCount(0);
      saveStart(newSessionStart);
      setCurrentStart(newSessionStart);
      return 0;
    });
  };

  /**
   * Starts a new session from the history drawer. If the current session has
   * pieces, archives it first (same as `finalize`); otherwise just closes the
   * drawer, since there is nothing to reset.
   */
  const newSession = () => {
    setCount((currentCount) => {
      if (currentCount > 0) {
        setSessions((previousSessions) => {
          const archivedSession: Session = {
            id: Date.now(),
            start: currentStart,
            end: Date.now(),
            total: currentCount,
          };
          const updatedSessions = [archivedSession, ...previousSessions];
          saveSessions(updatedSessions);
          return updatedSessions;
        });
        const newSessionStart = Date.now();
        saveCount(0);
        saveStart(newSessionStart);
        setCurrentStart(newSessionStart);
        setHistoryOpen(false);
        return 0;
      }
      setHistoryOpen(false);
      return currentCount;
    });
  };

  const onSetLang = (nextLang: Lang) => {
    setLang(nextLang);
    savePrefs({ lang: nextLang, flavor });
  };
  const onSetFlavor = (nextFlavor: Flavor) => {
    setFlavor(nextFlavor);
    savePrefs({ lang, flavor: nextFlavor });
  };

  if (!loaded) return <View style={[styles.root, { backgroundColor: theme.softBg }]} />;

  return (
    <View style={styles.root}>
      <Background colors={theme.bg} />
      <Blobs colors={theme.blobs} />

      <TopBar accent={theme.accent} onOpenMenu={openMenu} onOpenHistory={openHistory} />

      <View style={styles.middle}>
        <Text style={[styles.eatenLabel, { color: NEUTRAL.mutedTextStrong }]}>{strings.eaten}</Text>

        <CounterNumber count={count} accent={theme.accent} />
        <Text style={[styles.piecesLabel, { color: NEUTRAL.mutedTextMedium }]}>{strings.pieces}</Text>

        <View style={styles.sushiBlock}>
          <View style={styles.sushiWrap}>
            {floaters.map((floater) => (
              <FloatingPlusOne key={floater.id} accent={theme.accent} />
            ))}
            <SushiButton onPress={eat} top={theme.top} topHi={theme.topHi} stripe={theme.stripe} />
          </View>
          <Text style={[styles.hint, { color: NEUTRAL.mutedTextStrong }]}>{strings.tap}</Text>
        </View>
      </View>

      <Pressable
        style={[StyleSheet.absoluteFill, styles.overlay]}
        pointerEvents={menuOpen || historyOpen ? 'auto' : 'none'}
        onPress={closeAll}
      >
        <OverlayFade visible={menuOpen || historyOpen} />
      </Pressable>

      <Drawer side="left" open={menuOpen} onClose={closeMenu} widthBase={300} widthPercent={0.84}>
        <SettingsDrawer
          open={menuOpen}
          onClose={closeMenu}
          accent={theme.accent}
          lang={lang}
          flavor={flavor}
          onSetLang={onSetLang}
          onSetFlavor={onSetFlavor}
        />
      </Drawer>

      <Drawer side="right" open={historyOpen} onClose={closeHistory} widthBase={320} widthPercent={0.86}>
        <HistoryDrawer
          open={historyOpen}
          onClose={closeHistory}
          accent={theme.accent}
          softBg={theme.softBg}
          lang={lang}
          count={count}
          sessions={sessions}
          onFinalize={finalize}
          onNewSession={newSession}
        />
      </Drawer>
    </View>
  );
}

/**
 * Full-screen dark scrim behind an open drawer. Fades in/out with `visible`
 * and closes any open drawer when tapped (handled by the parent Pressable).
 */
function OverlayFade({ visible }: { visible: boolean }) {
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 280, easing: Easing.ease });
  }, [visible, opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: NEUTRAL.overlay }, style]} />;
}

/**
 * Renders the big counter number and replays a "pop" bounce animation every
 * time `count` changes after the initial mount.
 */
function CounterNumber({ count, accent }: { count: number; accent: string }) {
  const scale = useSharedValue(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const bounceEasing = Easing.bezier(0.34, 1.56, 0.64, 1);
    scale.value = withSequence(
      withTiming(1.22, { duration: 180, easing: bounceEasing }),
      withTiming(1, { duration: 220, easing: bounceEasing })
    );
  }, [count, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.Text style={[styles.counter, { color: accent }, style]}>{count}</Animated.Text>
  );
}

/**
 * The tappable sushi nigiri. Plays a one-off entrance bounce on mount, an
 * infinite idle "bob" loop, and shrinks slightly while pressed.
 */
function SushiButton({
  onPress,
  top,
  topHi,
  stripe,
}: {
  onPress: () => void;
  top: string;
  topHi: string;
  stripe: string;
}) {
  const pressScale = useSharedValue(1);
  const entrance = useSharedValue(0);
  const bob = useSharedValue(0);

  useEffect(() => {
    entrance.value = withTiming(1, { duration: 600, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
    bob.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [bob, entrance]);

  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: pressScale.value }] }));
  const entranceStyle = useAnimatedStyle(() => ({
    opacity: interpolate(entrance.value, [0, 0.6, 1], [0, 1, 1]),
    transform: [
      { translateY: interpolate(entrance.value, [0, 0.6, 1], [40, -6, 0]) },
      { scale: interpolate(entrance.value, [0, 0.6, 1], [0.6, 1.06, 1]) },
    ],
  }));
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(bob.value, [0, 1], [0, -7]) }],
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Comer una pieza de sushi"
      onPressIn={() => {
        pressScale.value = withTiming(0.9, { duration: 100 });
      }}
      onPressOut={() => {
        pressScale.value = withTiming(1, { duration: 100 });
      }}
    >
      <Animated.View style={pressStyle}>
        <Animated.View style={entranceStyle}>
          <Animated.View style={bobStyle}>
            <Sushi topColor={top} topHi={topHi} stripe={stripe} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eatenLabel: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  counter: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 120,
    lineHeight: 120,
    marginTop: 4,
  },
  piecesLabel: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 20,
    marginTop: 2,
  },
  sushiBlock: {
    marginTop: 26,
    paddingBottom: 40,
    alignItems: 'center',
  },
  sushiWrap: {
    position: 'relative',
  },
  hint: {
    marginTop: 6,
    fontFamily: 'Fredoka_500Medium',
    fontSize: 15,
  },
  overlay: {
    zIndex: 8,
  },
});
