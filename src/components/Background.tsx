import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

type Props = {
  colors: readonly [string, string, string];
};

/**
 * Full-screen radial gradient behind the home screen.
 * @param colors the theme's three gradient stops, from center to edge.
 */
export default function Background({ colors }: Props) {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
      <Defs>
        <RadialGradient id="bg" cx="50%" cy="0%" r="85%" gradientUnits="objectBoundingBox">
          <Stop offset="0%" stopColor={colors[0]} stopOpacity={1} />
          <Stop offset="55%" stopColor={colors[1]} stopOpacity={1} />
          <Stop offset="100%" stopColor={colors[2]} stopOpacity={1} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#bg)" />
    </Svg>
  );
}
