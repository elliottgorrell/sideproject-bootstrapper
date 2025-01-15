import { colors } from '@/theme';
import type React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';

type Variant = 1 | 2;

interface BackgroundProps {
  variant: Variant;
}

const renderVariant1 = (): React.JSX.Element => (
  <>
    <Rect
      id="bg"
      x="0"
      y="0"
      width="429.88"
      height="859.76"
      fill={colors.white}
    />
    <G transform="rotate(25 214.94 429.88)">
      <Path
        d="M -286.59 629.76 S -294.00 608.76
         0.00 629.76 133.29 506.76
         286.59 629.76 308.17 556.76
         573.17 629.76 665.76 520.76
         859.76 629.76 993.05 519.76
         1146.35 629.76 h 110 V 1459.76 H -286.59 Z"
        fill={colors.secondary700}
      />
      <Path
        d="M -286.59 255.00 S -153.29 33.00
         0.00 255.00 78.59 137.50
         286.59 255.00 419.88 137.50
         573.17 255.00 584.76 137.50
         859.76 255.00 993.05 87.00
         1146.35 255.00 h 110 V -600 H -286.59 Z"
        fill={colors.primary500}
      />
    </G>
  </>
);

const renderVariant2 = (): React.JSX.Element => (
  <>
    <Rect x="0" y="0" width="429.88" height="859.76" fill={colors.white} />
    <G rotation={199} origin="214.94, 429.88">
      <Path
        d="M -286.59 709.76 S -153.29 677.76
  0.00 709.76 133.29 639.76
  286.59 709.76 419.88 635.76
  573.17 709.76 706.47 700.76
  859.76 709.76 894.35 666.76
  1146.35 709.76 h 110 V 1459.76 H -286.59 Z"
        fill={colors.primary500}
      />
      <Path
        d="M -286.59 175.00 S -153.29 56.00
  0.00 175.00 133.29 69.00
  286.59 175.00 419.88 51.00
  573.17 175.00 696.76 79.00
  859.76 175.00 907.35 97.50
  1146.35 175.00 h 110 V -600 H -286.59 Z"
        fill={colors.secondary700}
      />
    </G>
  </>
);

const renderVariant = (variant: Variant): React.JSX.Element => {
  if (variant === 2) {
    return renderVariant2();
  }
  return renderVariant1();
};

export const Background = ({ variant }: BackgroundProps): React.JSX.Element => (
  <View style={styles.svgContainer}>
    <Svg
      viewBox="0 0 429.88 859.76"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      {renderVariant(variant)}
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
