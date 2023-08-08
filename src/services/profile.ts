import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from './firebase';
import { USERS_COLLECTION_NAME } from '../constants/collectionNames';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getProfile = async (uid: string) => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);
  const snapshot = await getDoc(userDocRef);

  return snapshot.data();
};

export const updateUserDisplayName = async (displayName: string) => {
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, USERS_COLLECTION_NAME, user.uid);

    await updateDoc(userDocRef, {
      displayName,
    });
  }
};

export const updateUserAvartar = async (uid: string, imageFile: File): Promise<void> => {
  const imageRef = ref(storage, `avartar/${uid}/${imageFile.name}`);

  await uploadBytes(imageRef, imageFile);

  const photoURL = await getDownloadURL(imageRef);

  await updateDoc(doc(db, USERS_COLLECTION_NAME, uid), {
    photoURL,
  });
};
