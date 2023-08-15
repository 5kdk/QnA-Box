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
  if (!uid || uid !== formData.ownerId) return;

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
  if (!uid) return;

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

  const boxDataSnapshot = snapshot.data();

  const boxData: Box = {
    boxId: boxDataSnapshot?.id,
    title: boxDataSnapshot?.title,
    ownerId: boxDataSnapshot?.ownerId,
    activation: boxDataSnapshot?.activation,
    anonymous: boxDataSnapshot?.anonymous,
    createdAt: boxDataSnapshot?.createdAt,
    description: boxDataSnapshot?.description,
  };

  return boxData;
};

export const getQnaBoxesById = async (boxIds: string[]): Promise<Box[] | undefined> => {
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

export const updateQnaBox = async (boxId: string, editFormData: FormElement): Promise<void> => {
  if (!getUid()) return;

  const qnaBoxesCollectionRef = collection(db, BOXES_COLLECTION_NAME);
  const qnaBoxDocRef = doc(qnaBoxesCollectionRef, boxId);

  const updatedData = {
    title: editFormData.title,
    ownerId: editFormData.ownerId,
    description: editFormData.description,
    activation: editFormData.activation,
    anonymous: editFormData.anonymous,
  };

  await updateDoc(qnaBoxDocRef, updatedData);
};

export const deleteQnaBox = async (boxId: string): Promise<void> => {
  if (!getUid()) return;

  const qnaBoxDocRef = doc(db, BOXES_COLLECTION_NAME, boxId);
  await deleteDoc(qnaBoxDocRef);
};

export const joinQnaBox = async (boxId: string) => {
  const uid = getUid();
  if (!uid) return;

  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayUnion(boxId),
  });
};

export const exitQnaBox = async (boxId: string) => {
  const uid = getUid();
  if (!uid) return;

  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayRemove(boxId),
  });
};
