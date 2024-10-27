import React, { useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { CurrentUserContext } from "@/context";
import { ProfileItem } from "@/components";
import styles from "@/assets/styles";
import auth from "@react-native-firebase/auth";
import { updateUser } from "@/db/user";
import { OnboardingStage, type User } from "@/types/user";

const signOutUserSync = (): void => {
  async function signOutUser(): Promise<void> {
    await auth().signOut();
  }
  signOutUser().catch((e) => {
    console.error(e);
  });
};

const resetOnboarding = (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
): void => {
  async function inner(): Promise<void> {
    await updateUser(
      { ...user, onboardingStage: OnboardingStage.Welcome },
      setUser,
    );
    await auth().signOut();
  }
  inner().catch((e) => {
    console.error(e);
  });
};

export default function Profile(): React.JSX.Element {
  const { user, setUser } = useContext(CurrentUserContext);

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground
          source={{ uri: user.profilePictureUrl }}
          style={styles.photo}
        />

        <ProfileItem name={user.displayName} />

        <View style={styles.actionsProfile}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={signOutUserSync}
          >
            <Text style={styles.textButton}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => {
              resetOnboarding(user, setUser);
            }}
          >
            <Text style={styles.textButton}>Restart Onboarding</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
