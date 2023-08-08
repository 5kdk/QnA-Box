import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { USERS_COLLECTION_NAME, ROOMS_COLLECTION_NAME } from '../constants/collectionNames';

interface FormData {
  title: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
}

const updateUserQnaRooms = async (userUid: string, roomId: string): Promise<void> => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, userUid);

  await updateDoc(userDocRef, {
    myRooms: arrayUnion(roomId),
  });
};

export const createQnaRoom = async (formData: FormData) => {
  const user = auth.currentUser;
  if (!user) return;
  const newData = { ownerUid: user.uid, owner: user.displayName, createdAt: Date.now(), ...formData };
  const qnaRoomsCollection = collection(db, ROOMS_COLLECTION_NAME);
  const qnaRoomDocRef = await addDoc(qnaRoomsCollection, newData);
  await updateUserQnaRooms(user.uid, qnaRoomDocRef.id);
};
