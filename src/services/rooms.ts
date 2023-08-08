import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { USERS_COLLECTION_NAME, ROOMS_COLLECTION_NAME } from '../constants/collectionNames';

interface FormData {
  title: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
}

interface EditFormData extends FormData {
  owner: string;
}

interface Room {
  id: string;
  title: string;
  owner: string;
  ownerId: string;
  activation: boolean;
  anonymous: boolean;
  createdAt: number;
  description: string;
}

const OWNER_UID = 'ownerUid';

const updateUserQnaRooms = async (userUid: string, roomId: string) => {
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

export const getMyQnaRooms = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaRoomsCollectionRef = collection(db, ROOMS_COLLECTION_NAME);
  const ownerUidFilter = where(OWNER_UID, '==', user.uid);
  const q = query(qnaRoomsCollectionRef, ownerUidFilter);
  const querySnapshot = await getDocs(q);

  const rooms: Room[] = querySnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Room,
  );

  return rooms;
};

export const getQnaRoomsById = async (roomIds: string[]) => {
  const roomsCollection = collection(db, ROOMS_COLLECTION_NAME);

  const roomDocsPromises = roomIds.map(roomId => {
    const roomDocRef = doc(roomsCollection, roomId);
    return getDoc(roomDocRef);
  });

  const snapshots = await Promise.all(roomDocsPromises);

  const roomsData = snapshots.map(docSnapshot => {
    return docSnapshot.data() || null;
  });

  return roomsData;
};

export const updateQnaRoom = async (roomId: string, editFormData: EditFormData): Promise<void> => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaRoomsCollectionRef = collection(db, ROOMS_COLLECTION_NAME);
  const qnaRoomDocRef = doc(qnaRoomsCollectionRef, roomId);

  const updatedData = {
    title: editFormData.title,
    owner: editFormData.owner,
    description: editFormData.description,
    activation: editFormData.activation,
    anonymous: editFormData.anonymous,
  };

  await updateDoc(qnaRoomDocRef, updatedData);
};
