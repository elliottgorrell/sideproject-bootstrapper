import type { LottieViewProps } from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export interface LoadingAnimationProps {
  loadingAnimationSource: LottieViewProps['source'];
  isLoaded?: boolean;
  finishedAnimationSource?: LottieViewProps['source'];
}

export const LoadingAnimation = ({
  loadingAnimationSource,
  finishedAnimationSource,
  isLoaded,
}: LoadingAnimationProps): React.JSX.Element => {
  const loadingAnimationRef = useRef<LottieView>(null);
  const finishedAnimationRef = useRef<LottieView>(null);
  const hasFinishedAnimation =
    finishedAnimationSource !== undefined && isLoaded !== undefined;

  // Create animated opacity values for smooth transition
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;

  if (hasFinishedAnimation) {
    useEffect(() => {
      if (isLoaded) {
        // Fade out loading animation and fade in checkmark animation
        Animated.timing(loadingOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => loadingAnimationRef.current?.reset());

        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => finishedAnimationRef.current?.play());
      } else {
        loadingAnimationRef.current?.play(); // Start loading animation
      }
    }, [isLoaded]);
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animationContainer, { opacity: loadingOpacity }]}
      >
        <LottieView
          ref={loadingAnimationRef}
          source={loadingAnimationSource}
          style={styles.animation}
          autoPlay
          loop
        />
      </Animated.View>
      {hasFinishedAnimation && (
        <Animated.View
          style={[styles.animationContainer, { opacity: checkmarkOpacity }]}
        >
          <LottieView
            ref={finishedAnimationRef}
            source={finishedAnimationSource}
            autoPlay={false}
            style={styles.animation}
            loop={false} // Only plays once
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
