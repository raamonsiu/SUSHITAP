import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppTheme } from '../ThemeContext';

type Props = {
  accent: string;
  /** Horizontal center point in pixels, within the full-width layer it renders in. */
  left: number;
};

/**
 * A "+1" that floats up and fades out once, then is meant to be unmounted by
 * the parent (it does not remove itself). Centers itself on `left` using its
 * own measured width, since percentage transforms aren't supported.
 */
export default function FloatingPlusOne({ accent, left }: Props) {
  const { neutral } = useAppTheme();
  const progress = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.quad) });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 0.25, 1], [0, -26, -120]);
    const scale = interpolate(progress.value, [0, 0.25, 1], [0.6, 1.1, 0.9]);
    const opacity = interpolate(progress.value, [0, 0.25, 1], [0, 1, 0]);
    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <Animated.Text
      onLayout={(layoutEvent) => setTextWidth(layoutEvent.nativeEvent.layout.width)}
      style={[
        styles.text,
        { color: accent, left: left - textWidth / 2, textShadowColor: neutral.floaterHalo },
        animatedStyle,
      ]}
    >
      +1
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 6,
    fontFamily: 'Fredoka_700Bold',
    fontSize: 34,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 0,
  },
});
