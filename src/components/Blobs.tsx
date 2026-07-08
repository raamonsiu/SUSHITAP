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

/**
 * A single soft background blob that drifts up and grows slightly, then
 * reverses, in an endless loop. Position and timing come from `blobConfig`.
 */
function Blob({ color, blobConfig }: { color: string; blobConfig: (typeof BLOB_DEFS)[number] }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: blobConfig.duration / 2, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [blobConfig.duration, progress]);

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
          width: blobConfig.size,
          height: blobConfig.size,
          borderRadius: blobConfig.size / 2,
          backgroundColor: color,
          opacity: blobConfig.opacity,
          top: 'top' in blobConfig ? blobConfig.top : undefined,
          left: 'left' in blobConfig ? blobConfig.left : undefined,
          right: 'right' in blobConfig ? blobConfig.right : undefined,
          bottom: 'bottom' in blobConfig ? blobConfig.bottom : undefined,
        },
        animatedStyle,
      ]}
    />
  );
}

/** Renders the three animated pastel blobs drifting behind the home screen. */
export default function Blobs({ colors }: Props) {
  return (
    <>
      {BLOB_DEFS.map((blobConfig, index) => (
        <Blob key={index} color={colors[index]} blobConfig={blobConfig} />
      ))}
    </>
  );
}
