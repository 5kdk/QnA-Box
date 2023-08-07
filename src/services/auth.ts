import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import extractUsernameFromEmail from '../utils/extractUsernameFromEmail';

export interface User {
  id: string;
  email: string;
  displayName: string;
  joinedRooms: string[];
  myRooms: string[];
}

const USERS_COLLECTION_NAME = 'users';

const setUser = async (userId: string, email: string): Promise<void> => {
  const displayName = extractUsernameFromEmail(email);

  try {
    const userDocRef = doc(db, USERS_COLLECTION_NAME, userId);
    const userData: User = { id: userId, email, displayName, joinedRooms: [], myRooms: [] };
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
  const user = getCurrentUser();
  if (user) await deleteUser(user);
};

export const loginUser = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
