import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import extractUsernameFromEmail from '../utils/extractUsernameFromEmail';
import { USERS_COLLECTION_NAME } from '../constants/collectionNames';

const createUserDoc = async (
  uid: string,
  email: string,
  displayName: string,
  photoURL: string | null,
): Promise<void> => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await setDoc(userDocRef, {
    uid,
    email,
    displayName,
    photoURL,
    joinedBoxes: [],
  });
};

export const registerUser = async (email: string, password: string): Promise<void> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const displayName = extractUsernameFromEmail(email);
  await createUserDoc(credential.user.uid, email, displayName, credential.user.photoURL);
};

export const loginWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  if (credential.user.email) {
    const displayName = extractUsernameFromEmail(credential.user.email);
    await createUserDoc(credential.user.uid, credential.user.email, displayName, credential.user.photoURL);
  }
};

export const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, USERS_COLLECTION_NAME, user.uid);
    const userData = await getDoc(userDocRef);

    return userData.data();
  }
};

export const deregisterUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, USERS_COLLECTION_NAME, user.uid);
    await deleteDoc(docRef);
    await deleteUser(user);
  }
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const updateUserPassword = async (password: string, newPassword: string) => {
  const user = auth.currentUser;
  if (user?.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  }
};
