import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getUid } from './auth';
import { USERS_COLLECTION_NAME } from '../constants/collectionNames';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  joinedBoxes: string[];
  likedComments: string[];
}

export const getUserRef = (uid: string) => doc(db, USERS_COLLECTION_NAME, uid);

export const getProfile = async (uid: string | undefined) => {
  if (!uid) return null;

  const snapshot = await getDoc(getUserRef(uid));
  const result = snapshot.data();
  if (!result) throw new ReferenceError('해당 유저가 존재하지 않습니다');
  else return result as Promise<UserData>;
};

export const updateUserDisplayName = async (displayName: string) => {
  const uid = getUid();
  if (!uid) return;

  await updateDoc(getUserRef(uid), { displayName });
};

export const updateUserAvartar = async (imageFile: Blob) => {
  const uid = getUid();
  if (!uid) return;

  const imageRef = ref(storage, `avartar/${uid}/${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const photoURL = await getDownloadURL(imageRef);
  await updateDoc(getUserRef(uid), { photoURL });
};
