import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  accent: string;
};

/**
 * A "+1" that floats up and fades out once, then is meant to be unmounted by
 * the parent (it does not remove itself). Horizontal centering is computed
 * from its own measured width, since percentage transforms aren't supported.
 */
export default function FloatingPlusOne({ accent }: Props) {
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
      style={[styles.text, { color: accent, marginLeft: -textWidth / 2 }, animatedStyle]}
    >
      +1
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    left: '50%',
    top: 6,
    fontFamily: 'Fredoka_700Bold',
    fontSize: 34,
    textShadowColor: 'rgba(255,255,255,0.7)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 0,
  },
});
