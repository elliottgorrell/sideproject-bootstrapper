import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button } from '@/components/ui';
import { SuccessAnimation, Background } from '@/components';
import type { OnboardingStackParamList } from '@/navigation/onboardingStack';
import { CurrentUserContext } from '@/context';
import { OnboardingStage } from '@/types/user';
import { updateUserMetadata } from '@/db/user';

const CompletionScreen: React.FC<
  StackScreenProps<OnboardingStackParamList, 'Completion'>
> = () => {
  const currUserContext = useContext(CurrentUserContext);

  const completeStage = (): void => {
    updateUserMetadata(
      { onboardingStage: OnboardingStage.Finished },
      currUserContext
    )
      .then(() => {
        console.debug('user marked as completed onboarding');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background variant={2} />

      <SuccessAnimation style={{ width: '50%' }} />

      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={completeStage}>
          Complete
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    width: '80%',
    justifyContent: 'center',
  },

  button: {
    marginTop: 20,
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
    backgroundColor: '#3C1053', // equivalent to a deep purple color
  },

  inactiveStep: {
    backgroundColor: '#e0e0e0', // equivalent to a light gray color
  },
});

export default CompletionScreen;
