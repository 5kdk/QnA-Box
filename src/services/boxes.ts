import {
  DocumentReference,
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
import { getUserRef } from './profile';
import { BOXES_COLLECTION_NAME } from '../constants/collectionNames';

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

const getBoxRef = (boxId: string) => doc(db, BOXES_COLLECTION_NAME, boxId);

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
  const boxRef = getBoxRef(boxId);
  const snapshot = await getDoc(boxRef);

  return snapshot.data() as Promise<Box>;
};

export const getQnaBoxesById = async (boxIds: string[] | undefined): Promise<Box[] | undefined> => {
  if (boxIds === undefined) return;

  const boxDocsPromises = boxIds.map(boxId => {
    const boxRef = getBoxRef(boxId);
    return getDoc(boxRef);
  });

  const snapshots = await Promise.all(boxDocsPromises);

  const boxesData = snapshots.map(docSnapshot => {
    return docSnapshot.data() || null;
  });

  return boxesData as Box[] | undefined;
};

const verifyOwner = async (boxRef: DocumentReference) => {
  const uid = getUid();

  const snapshot = await getDoc(boxRef);
  const box = snapshot.data();
  if (box?.ownerId !== uid) throw new Error('소유한 박스가 아닙니다');
};

export const updateQnaBox = async (boxId: string, editFormData: FormElement): Promise<void> => {
  const boxRef = getBoxRef(boxId);
  await verifyOwner(boxRef);
  await updateDoc(boxRef, editFormData);
};

export const deleteQnaBox = async (boxId: string): Promise<void> => {
  const boxRef = getBoxRef(boxId);
  await verifyOwner(boxRef);
  await deleteDoc(boxRef);
};

export const joinQnaBox = async (boxId: string) => {
  const uid = getUid();
  const userDocRef = getUserRef(uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayUnion(boxId),
  });
};

export const exitQnaBox = async (boxId: string) => {
  const uid = getUid();
  const userDocRef = getUserRef(uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayRemove(boxId),
  });
};
