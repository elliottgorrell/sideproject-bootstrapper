import LottieView from 'lottie-react-native';
import type React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import SuccessAnimationSource from '@/assets/animations/Success.json';

export const SuccessAnimation = ({ style }: ViewProps): React.JSX.Element => (
  <View style={[style, styles.container]}>
    <LottieView
      source={SuccessAnimationSource}
      autoPlay
      loop={false}
      style={styles.animation}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
