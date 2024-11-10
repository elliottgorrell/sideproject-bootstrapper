import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button } from '@/components/ui';
import type { OnboardingStackParamList } from '@/navigation/onboardingStack';
import { Background } from '@/components';

const WelcomeScreen: React.FC<
  StackScreenProps<OnboardingStackParamList, 'Welcome'>
> = ({ navigation }) => {
  const totalSteps = 2;
  const currentStep = 1;

  const completeStage = (): void => {
    navigation.navigate('Completion');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index + 1 === currentStep
                ? styles.activeStep
                : styles.inactiveStep,
            ]}
          />
        ))}
      </View>

      <Background variant={1} />

      <View style={styles.contentContainer}>
        <Text style={styles.text}>Welcome</Text>

        <View style={styles.whiteBox}>
          <Text style={styles.subHeading}>Welcome to Onboarding</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={completeStage}>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 24,
  },

  button: {
    marginTop: 20,
  },

  text: {
    marginBottom: 20,
    alignSelf: 'center',
  },

  subHeading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },

  buttonsContainer: {
    width: '80%',
    justifyContent: 'center',
  },

  touchableOpacity: {
    marginTop: 70,
    alignItems: 'center',
  },
  selectedTouchableOpacity: {
    backgroundColor: 'fff',
  },
  unselectedTouchableOpacity: {
    backgroundColor: 'fff',
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    zIndex: 1,
  },
  progressStep: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: '#561768',
  },
  inactiveStep: {
    backgroundColor: '#e0e0e0',
  },

  whiteBox: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android shadow
    padding: 20,
    borderRadius: 20,
  },

  accountName: {
    fontSize: 25,
  },
});

export default WelcomeScreen;
