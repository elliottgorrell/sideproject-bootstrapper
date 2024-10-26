import { type Dispatch, type SetStateAction } from "react";
import firestore from "@react-native-firebase/firestore";
import { OnboardingStage, type User } from "../types/user";

const collectionName = "users";

const defaultUser = {
  onboardingStage: OnboardingStage.Welcome,
};

export async function getUser(uid: string): Promise<User | null> {
  console.debug(`fetching user from firestore with uid: ${uid}`);
  const userDocument = await firestore()
    .collection(collectionName)
    .doc(uid)
    .get();

  if (userDocument.exists) {
    const user = userDocument.data() as User;
    user.uid = uid;
    return user;
  } else {
    return null;
  }
}

export async function getOrCreateUser(uid: string): Promise<User> {
  let user = await getUser(uid);

  if (user === null) {
    console.debug("User does not exist. Creating...");
    await createUser(uid);
    user = await getUser(uid);

    if (user === null) {
      throw new Error("User was not created. This should never happen");
    }
  }

  return user;
}

export async function createUser(uid: string): Promise<void> {
  const currUser = await getUser(uid);

  if (currUser === null) {
    await firestore().collection(collectionName).doc(uid).set(defaultUser);
  } else {
    throw new Error("User already exists");
  }
}

/**
 * This updates the user in firestore and also requires the setState dispatcher for react to make sure these don't fall out of sync
 * TODO: This is super janky. Ideally we want to have a firestore listener to keep our react state in sync or have setUser update both
 * react state and firestore. Still deciding the best way to go and don't want to be blocked by this for now.
 * @param user
 * @param setUser
 */
export async function updateUser(
  user: User,
  setUser: Dispatch<SetStateAction<User>>,
): Promise<void> {
  await firestore().collection(collectionName).doc(user.uid).update(user);
  setUser(user);
}
