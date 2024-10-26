import { useState, useEffect, type SetStateAction, type Dispatch } from "react";
import auth from "@react-native-firebase/auth";
import { getOrCreateUser } from "../../db/user";
import { type User, LoggedOutUser } from "../../types/user";

export function useAuthentication(): {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
} {
  const [user, setUser] = useState<User>(LoggedOutUser);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      console.debug("Auth State Changed");
      if (firebaseUser === null) {
        console.debug("User Logged Out");
        // User is signed out
        setUser(LoggedOutUser);
        return;
      }
      getOrCreateUser(firebaseUser.uid)
        .then((firestoreUser) => {
          setUser(firestoreUser);
          console.debug("User Logged In");
        })
        .catch((error) => {
          // TODO: Proper error handling
          console.error(error);
          setUser(LoggedOutUser);
        });
    });
    return unsubscribe;
  }, []);

  return { user, setUser };
}
