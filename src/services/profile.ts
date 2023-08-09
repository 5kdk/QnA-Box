import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase';
import { USERS_COLLECTION_NAME } from '../constants/collectionNames';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getUserRef = (uid: string) => doc(db, USERS_COLLECTION_NAME, uid);

export const getProfile = async (uid: string) => {
  const snapshot = await getDoc(getUserRef(uid));

  return snapshot.data();
};

export const updateUserDisplayName = async (uid: string, displayName: string) => {
  await updateDoc(getUserRef(uid), { displayName });
};

export const updateUserAvartar = async (uid: string, imageFile: File): Promise<void> => {
  const imageRef = ref(storage, `avartar/${uid}/${imageFile.name}`);

  await uploadBytes(imageRef, imageFile);

  const photoURL = await getDownloadURL(imageRef);

  await updateDoc(getUserRef(uid), { photoURL });
};
