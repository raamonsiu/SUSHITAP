import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { NEUTRAL, RADII, SHADOWS } from '../theme';

type Side = 'left' | 'right';

type Props = {
  side: Side;
  open: boolean;
  onClose: () => void;
  widthBase: number;
  widthPercent: number;
  children: React.ReactNode;
};

const DRAWER_ANIM = { duration: 320, easing: Easing.bezier(0.4, 0.9, 0.3, 1) };
const CLOSE_RATIO_THRESHOLD = 0.3;
const CLOSE_VELOCITY_THRESHOLD = 500;

/**
 * Slide-in panel used for both the settings (left) and history (right)
 * drawers. Animates open/closed on `open` changes and can also be
 * drag-closed by the user, snapping back open if the drag wasn't decisive.
 * Pre: `open` reflects the parent's intended visibility. Post: renders
 * `children` inside the sliding panel; calls `onClose` if a drag closes it.
 */
export default function Drawer({ side, open, onClose, widthBase, widthPercent, children }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const drawerWidth = Math.min(widthBase, screenWidth * widthPercent);
  const closedOffset = drawerWidth * 1.1;
  const closedValue = side === 'left' ? -closedOffset : closedOffset;
  const closingDirection = side === 'left' ? -1 : 1;

  const translateX = useSharedValue(closedValue);
  const dragStartX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(open ? 0 : closedValue, DRAWER_ANIM);
  }, [open, closedValue, translateX]);

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-14, 14])
    .onStart(() => {
      dragStartX.value = translateX.value;
    })
    .onUpdate((dragUpdateEvent) => {
      const nextTranslateX = dragStartX.value + dragUpdateEvent.translationX;
      translateX.value =
        side === 'left'
          ? Math.min(0, Math.max(closedValue, nextTranslateX))
          : Math.max(0, Math.min(closedValue, nextTranslateX));
    })
    .onEnd((dragEndEvent) => {
      const draggedRatio = Math.abs(translateX.value / closedValue);
      const shouldClose =
        draggedRatio > CLOSE_RATIO_THRESHOLD ||
        closingDirection * dragEndEvent.velocityX > CLOSE_VELOCITY_THRESHOLD;
      if (shouldClose) {
        translateX.value = withTiming(closedValue, DRAWER_ANIM);
        runOnJS(onClose)();
      } else {
        translateX.value = withTiming(0, DRAWER_ANIM);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const radiusStyle: ViewStyle =
    side === 'left'
      ? { borderTopRightRadius: RADII.drawer, borderBottomRightRadius: RADII.drawer }
      : { borderTopLeftRadius: RADII.drawer, borderBottomLeftRadius: RADII.drawer };

  const positionStyle: ViewStyle = side === 'left' ? { left: 0 } : { right: 0 };
  const handleStyle: ViewStyle = side === 'left' ? { right: 6 } : { left: 6 };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[
          styles.base,
          { width: drawerWidth, paddingTop: 26 + insets.top },
          positionStyle,
          radiusStyle,
          SHADOWS.drawer,
          animatedStyle,
        ]}
      >
        <View style={[styles.handle, handleStyle]} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: NEUTRAL.drawerBg,
    paddingHorizontal: 22,
    paddingBottom: 26,
    zIndex: 9,
  },
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -40,
    width: 5,
    height: 80,
    borderRadius: 3,
    backgroundColor: 'rgba(154,138,128,0.35)',
  },
});
