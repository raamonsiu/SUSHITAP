import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

type Props = {
  topColor: string;
  topHi: string;
  stripe: string;
  size?: number;
};

export default function Sushi({ topColor, topHi, stripe, size = 270 }: Props) {
  const height = (size / 270) * 220;
  return (
    <Svg width={size} height={height} viewBox="0 0 270 220" fill="none">
      <Ellipse cx={135} cy={196} rx={104} ry={18} fill="#B99" opacity={0.22} />
      <Rect x={30} y={104} width={210} height={92} rx={46} fill="#FFFDF9" />
      <Rect x={30} y={104} width={210} height={46} rx={46} fill="#FFFFFF" opacity={0.6} />
      <Ellipse cx={80} cy={132} rx={10} ry={8} fill="#F3EEE6" opacity={0.7} />
      <Ellipse cx={130} cy={140} rx={11} ry={8} fill="#F3EEE6" opacity={0.7} />
      <Ellipse cx={185} cy={130} rx={10} ry={8} fill="#F3EEE6" opacity={0.7} />
      <Rect x={20} y={52} width={230} height={80} rx={40} fill={topColor} />
      <Rect x={20} y={52} width={230} height={34} rx={34} fill={topHi} opacity={0.55} />
      <Path
        d="M52 74c34 10 132 10 166 0"
        stroke={stripe}
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.85}
      />
      <Path
        d="M46 96c40 11 138 11 178 0"
        stroke={stripe}
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.7}
      />
      <Ellipse cx={106} cy={96} rx={8.5} ry={11} fill="#43302B" />
      <Ellipse cx={164} cy={96} rx={8.5} ry={11} fill="#43302B" />
      <Circle cx={109} cy={92} r={2.8} fill="#fff" />
      <Circle cx={167} cy={92} r={2.8} fill="#fff" />
      <Circle cx={86} cy={108} r={8} fill="#FF9BB0" opacity={0.7} />
      <Circle cx={184} cy={108} r={8} fill="#FF9BB0" opacity={0.7} />
      <Path
        d="M126 108c4 5 14 5 18 0"
        stroke="#43302B"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
