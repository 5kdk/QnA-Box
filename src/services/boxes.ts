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
import { db } from './firebase';
import { getUid } from './auth';
import { BOXES_COLLECTION_NAME, USERS_COLLECTION_NAME } from '../constants/collectionNames';

export interface FormElement {
  [key: string]: string | boolean;
  ownerId: string;
  title: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
}

export interface Box {
  boxId: string;
  ownerId: string;
  title: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
  createdAt: number;
}

const OWNER_ID = 'ownerId';

export const createQnaBox = async (formData: FormElement) => {
  const uid = getUid();
  if (uid !== formData.ownerId) return;

  const qnaBoxesCollection = collection(db, BOXES_COLLECTION_NAME);
  const newDocRef = doc(qnaBoxesCollection);

  const newData = {
    boxId: newDocRef.id,
    createdAt: Date.now(),
    ...formData,
  };

  await setDoc(newDocRef, newData);
};

export const getMyQnaBoxes = async () => {
  const uid = getUid();

  const qnaBoxesCollectionRef = collection(db, BOXES_COLLECTION_NAME);
  const ownerIdFilter = where(OWNER_ID, '==', uid);
  const q = query(qnaBoxesCollectionRef, ownerIdFilter);
  const querySnapshot = await getDocs(q);

  const boxes: Box[] = querySnapshot.docs.map(doc => doc.data() as Box);

  return boxes;
};

export const getQnaBoxById = async (boxId: string): Promise<Box> => {
  const boxesCollection = collection(db, BOXES_COLLECTION_NAME);
  const boxDocRef = doc(boxesCollection, boxId);
  const snapshot = await getDoc(boxDocRef);

  return snapshot.data() as Promise<Box>;
};

export const getQnaBoxesById = async (boxIds: string[] | undefined): Promise<Box[] | undefined> => {
  if (boxIds === undefined) return;

  const boxesCollection = collection(db, BOXES_COLLECTION_NAME);

  const boxDocsPromises = boxIds.map(boxId => {
    const boxDocRef = doc(boxesCollection, boxId);
    return getDoc(boxDocRef);
  });

  const snapshots = await Promise.all(boxDocsPromises);

  const boxesData = snapshots.map(docSnapshot => {
    return docSnapshot.data() || null;
  });

  return boxesData as Box[] | undefined;
};

const getBoxRef = async (boxId: string) => {
  const uid = getUid();

  const qnaBoxDocRef = doc(db, BOXES_COLLECTION_NAME, boxId);
  const snapshot = await getDoc(qnaBoxDocRef);
  const data = snapshot.data();
  if (data?.ownerId !== uid) throw new Error('소유한 박스가 아닙니다');
  return qnaBoxDocRef;
};

export const updateQnaBox = async (boxId: string, editFormData: FormElement): Promise<void> => {
  const qnaBoxDocRef = await getBoxRef(boxId);

  await updateDoc(qnaBoxDocRef, editFormData);
};

export const deleteQnaBox = async (boxId: string): Promise<void> => {
  const qnaBoxDocRef = await getBoxRef(boxId);

  await deleteDoc(qnaBoxDocRef);
};

export const joinQnaBox = async (boxId: string) => {
  const uid = getUid();
  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayUnion(boxId),
  });
};

export const exitQnaBox = async (boxId: string) => {
  const uid = getUid();
  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayRemove(boxId),
  });
};
