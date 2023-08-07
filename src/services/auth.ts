import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import extractUsernameFromEmail from '../utils/extractUsernameFromEmail';

export interface UserCollectionDoc {
  id: string;
  email: string;
  displayName: string;
  joinedRooms: string[];
  myRooms: string[];
}

export interface updateUserProfileProps {
  displayName?: string;
  photoURL?: string;
}

const USERS_COLLECTION_NAME = 'users';

const setUser = async (userId: string, email: string): Promise<void> => {
  const displayName = extractUsernameFromEmail(email);

  try {
    const userDocRef = doc(db, USERS_COLLECTION_NAME, userId);
    const userData: UserCollectionDoc = { id: userId, email, displayName, joinedRooms: [], myRooms: [] };
    await setDoc(userDocRef, userData);
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (email: string, password: string): Promise<void> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  if (credential.user) {
    await setUser(credential.user.uid, email);
  }
};

export const deregisterUser = async () => {
  const user = auth.currentUser;
  if (user) await deleteUser(user);
};

export const loginUser = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const updateUserProfile = async (newData: updateUserProfileProps) => {
  const user = auth.currentUser;
  if (user) await updateProfile(user, { ...newData });
};

export const updateUserPassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (user) await updatePassword(user, newPassword);
};
