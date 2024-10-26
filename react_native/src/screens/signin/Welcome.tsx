import React from "react";
import { StyleSheet, SafeAreaView, View, Pressable, Text } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Button } from "../../components/button";
import type { AuthStackParamList } from "../../navigation/authStack";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import tw from "../../lib/tailwind";

GoogleSignin.configure({
  webClientId: "",
});

const WelcomeScreen: React.FC<
  StackScreenProps<AuthStackParamList, "Welcome">
> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Text style={tw`text-3xl font-extrabold self-center`}>
          Get Started...
        </Text>
        <Button
          text="EMAIL"
          style={styles.button}
          icon={{
            name: "envelope",
            type: "FontAwesome5",
          }}
          onPress={() => {
            navigation.navigate("SignUpEmail");
          }}
        />
        <Button
          text="FACEBOOK"
          style={styles.button}
          icon={{
            name: "facebook",
            type: "FontAwesome5",
          }}
          onPress={() => {
            onFacebookButtonPress()
              .then((userCredential) => {
                console.log(
                  `Signed in with Facebook for ${userCredential.user.displayName}!`,
                );
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        />
        <Button
          text="GOOGLE"
          style={styles.button}
          icon={{
            name: "google",
            type: "FontAwesome5",
          }}
          onPress={() => {
            onGoogleButtonPress()
              .then((userCredential) => {
                console.log(
                  `Signed in with Google for ${userCredential.user.displayName}!`,
                );
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        />
      </View>

      <View>
        <Pressable
          style={styles.loginContainer}
          onPress={() => {
            navigation.navigate("SignInEmail");
          }}
        >
          <Text style={styles.textLogin}> Existing member?</Text>
          <Text style={styles.buttonLogin}>Log in here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

async function onFacebookButtonPress(): Promise<FirebaseAuthTypes.UserCredential> {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    throw new Error("User cancelled the login process");
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();

  if (data === null) {
    throw new Error("Something went wrong obtaining access token");
  }
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  console.debug(`access_token: ${data.accessToken}`);

  // Sign-in the user with the credential
  const firebaseUserCredential =
    await auth().signInWithCredential(facebookCredential);
  const firebaseJwt = await firebaseUserCredential.user.getIdToken();
  console.log(`firebaseUserCredential: ${firebaseJwt}`);
  return firebaseUserCredential;
}

async function onGoogleButtonPress(): Promise<FirebaseAuthTypes.UserCredential> {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const response = await GoogleSignin.signIn();

  if (isSuccessResponse(response)) {
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      response.data.idToken,
    );

    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);
  } else {
    throw new Error("User cancelled google signin");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    marginTop: 20,
  },

  text: {
    marginBottom: 20,
    alignSelf: "center",
  },

  buttonsContainer: {
    width: "80%",
    justifyContent: "center",
    flexGrow: 2,
  },

  textLogin: {
    alignSelf: "center",
  },

  loginContainer: {
    flexDirection: "row",
  },

  buttonLogin: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default WelcomeScreen;
