import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, TextInput } from '@/components/ui';
import { CurrentUserContext, type CurrentUserContextType } from '@/context';
import auth from '@react-native-firebase/auth';
import { updateUserMetadata, updateUserInfo } from '@/db/user';
import { OnboardingStage } from '@/types/user';

const signOutUserSync = (): void => {
  async function signOutUser(): Promise<void> {
    await auth().signOut();
  }
  signOutUser().catch((e) => {
    console.error(e);
  });
};

const resetOnboarding = (currUserContext: CurrentUserContextType): void => {
  async function inner(): Promise<void> {
    await updateUserMetadata(
      { onboardingStage: OnboardingStage.Welcome },
      currUserContext
    );
  }
  inner().catch((e) => {
    console.error(e);
  });
};

export default function Profile(): React.JSX.Element {
  const { user, setUser } = useContext(CurrentUserContext);
  const [newName, setNewName] = React.useState('');

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.user.photoURL }} style={styles.image} />

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileHeaderText}>Profile</Text>
        </View>
        <Text style={styles.displayName}>{user.user.displayName}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Name"
            value={newName}
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <Button
            onPress={() => {
              updateUserInfo({ displayName: newName }, { user, setUser }).catch(
                (e) => {
                  console.error(e);
                }
              );
            }}
            text="Update Display Name"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={signOutUserSync}
          text="Sign Out"
          style={styles.button}
        />
        <Button
          onPress={() => {
            resetOnboarding({ user, setUser });
          }}
          text="Restart Onboarding"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  image: {
    borderRadius: 50,
    aspectRatio: 1,
    width: '33%',
    margin: 20,
  },
  profileContainer: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 30,
    width: '80%',
  },
  profileHeader: {
    backgroundColor: '#F27059',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'relative',
    top: -20,
  },
  profileHeaderText: {
    color: 'white',
    textAlign: 'center',
  },
  displayName: {
    color: '#6B7280', //gray-500
    textAlign: 'center',
    fontWeight: '800',
  },
  inputContainer: {
    margin: 20,
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    borderRadius: 30,
  },
});
