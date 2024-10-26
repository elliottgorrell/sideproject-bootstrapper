import React from "react";
import { StyleSheet, SafeAreaView, View, Pressable } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Button, Text } from "@ui-kitten/components";
import type { AuthStackParamList } from "../../navigation/authStack";
import { Facebook, Email, Google } from "../../utils/icons";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "",
});

const WelcomeScreen: React.FC<
  StackScreenProps<AuthStackParamList, "Welcome">
> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* need to fixt his later, this is used now for justify content: space between */}
      </View>

      <View style={styles.buttonsContainer}>
        <Text style={styles.text} category="h2">
          Get Started...
        </Text>
        <Button
          size="large"
          style={styles.button}
          accessoryLeft={Email}
          onPress={() => {
            navigation.navigate("SignUpEmail");
          }}
        >
          EMAIL
        </Button>
        <Button
          size="large"
          style={styles.button}
          accessoryLeft={Facebook}
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
        >
          FACEBOOK
        </Button>
        <Button
          size="large"
          style={styles.button}
          accessoryLeft={Google}
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
        >
          GOOGLE
        </Button>
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
