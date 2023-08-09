import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { BOXES_COLLECTION_NAME, USERS_COLLECTION_NAME } from '../constants/collectionNames';

interface FormData {
  title: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
}

interface EditFormData extends FormData {
  owner: string;
}

interface Box {
  boxId: string;
  title: string;
  owner: string;
  ownerId: string;
  activation: boolean;
  anonymous: boolean;
  createdAt: number;
  description: string;
}

const OWNER_UID = 'ownerUid';

export const createQnaBox = async (formData: FormData) => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaBoxesCollection = collection(db, BOXES_COLLECTION_NAME);
  const newDocRef = doc(qnaBoxesCollection);

  const newData = {
    boxId: newDocRef.id,
    ownerUid: user.uid,
    owner: user.displayName,
    createdAt: Date.now(),
    ...formData,
  };

  await setDoc(newDocRef, newData);
};

export const getMyQnaBoxes = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaBoxesCollectionRef = collection(db, BOXES_COLLECTION_NAME);
  const ownerUidFilter = where(OWNER_UID, '==', user.uid);
  const q = query(qnaBoxesCollectionRef, ownerUidFilter);
  const querySnapshot = await getDocs(q);

  const boxes: Box[] = querySnapshot.docs.map(doc => doc.data() as Box);

  return boxes;
};

export const getQnaBoxesById = async (boxIds: string[]) => {
  const boxesCollection = collection(db, BOXES_COLLECTION_NAME);

  const boxDocsPromises = boxIds.map(boxId => {
    const boxDocRef = doc(boxesCollection, boxId);
    return getDoc(boxDocRef);
  });

  const snapshots = await Promise.all(boxDocsPromises);

  const boxesData = snapshots.map(docSnapshot => {
    return docSnapshot.data() || null;
  });

  return boxesData;
};

export const updateQnaBox = async (boxId: string, editFormData: EditFormData): Promise<void> => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaBoxesCollectionRef = collection(db, BOXES_COLLECTION_NAME);
  const qnaBoxDocRef = doc(qnaBoxesCollectionRef, boxId);

  const updatedData = {
    title: editFormData.title,
    owner: editFormData.owner,
    description: editFormData.description,
    activation: editFormData.activation,
    anonymous: editFormData.anonymous,
  };

  await updateDoc(qnaBoxDocRef, updatedData);
};

export const deleteQnaBox = async (boxId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaBoxDocRef = doc(db, BOXES_COLLECTION_NAME, boxId);
  await deleteDoc(qnaBoxDocRef);
};

export const joinQnaBox = async (boxId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const userDocRef = doc(db, USERS_COLLECTION_NAME, user.uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayUnion(boxId),
  });
};

export const exitQnaBox = async (boxId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const userDocRef = doc(db, USERS_COLLECTION_NAME, user.uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayRemove(boxId),
  });
};
