import React, { useEffect } from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  colors: readonly [string, string, string];
};

const BLOB_DEFS = [
  { size: 280, top: -80, left: -60, opacity: 0.55, duration: 9000 },
  { size: 260, top: 120, right: -90, opacity: 0.5, duration: 11000 },
  { size: 240, bottom: -70, left: 30, opacity: 0.5, duration: 10000 },
] as const;

function Blob({ color, def }: { color: string; def: (typeof BLOB_DEFS)[number] }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: def.duration / 2, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [def.duration, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -18]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.05]) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: def.size,
          height: def.size,
          borderRadius: def.size / 2,
          backgroundColor: color,
          opacity: def.opacity,
          top: 'top' in def ? def.top : undefined,
          left: 'left' in def ? def.left : undefined,
          right: 'right' in def ? def.right : undefined,
          bottom: 'bottom' in def ? def.bottom : undefined,
        },
        animatedStyle,
      ]}
    />
  );
}

export default function Blobs({ colors }: Props) {
  return (
    <>
      {BLOB_DEFS.map((def, i) => (
        <Blob key={i} color={colors[i]} def={def} />
      ))}
    </>
  );
}
