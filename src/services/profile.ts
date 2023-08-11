import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase';
import { USERS_COLLECTION_NAME } from '../constants/collectionNames';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  joinedBoxes: string[];
}

export const getUserRef = (uid: string) => doc(db, USERS_COLLECTION_NAME, uid);

export const getProfile = async (uid: string): Promise<UserData | undefined> => {
  const snapshot = await getDoc(getUserRef(uid));

  return snapshot.data() as UserData | undefined;
};

export const updateUserDisplayName = async (uid: string, displayName: string) => {
  await updateDoc(getUserRef(uid), { displayName });
};

export const updateUserAvartar = async (uid: string, imageFile: Blob) => {
  const imageRef = ref(storage, `avartar/${uid}/${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const photoURL = await getDownloadURL(imageRef);

  await updateDoc(getUserRef(uid), { photoURL });
};
