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
import { verifiedUid } from './auth';
import { BOXES_COLLECTION_NAME, USERS_COLLECTION_NAME } from '../constants/collectionNames';

export interface FormElement {
  title: string;
  owner: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
}

export interface Box {
  boxId: string;
  title: string;
  owner: string;
  ownerUid: string;
  activation: boolean;
  anonymous: boolean;
  createdAt: number;
  description: string;
}

const OWNER_UID = 'ownerUid';

export const createQnaBox = async (formData: FormElement) => {
  const uid = verifiedUid();
  if (!uid) return;

  const qnaBoxesCollection = collection(db, BOXES_COLLECTION_NAME);
  const newDocRef = doc(qnaBoxesCollection);

  const newData = {
    boxId: newDocRef.id,
    ownerUid: uid,
    createdAt: Date.now(),
    ...formData,
  };

  await setDoc(newDocRef, newData);
};

export const getMyQnaBoxes = async () => {
  const uid = verifiedUid();
  if (!uid) return;

  const qnaBoxesCollectionRef = collection(db, BOXES_COLLECTION_NAME);
  const ownerUidFilter = where(OWNER_UID, '==', uid);
  const q = query(qnaBoxesCollectionRef, ownerUidFilter);
  const querySnapshot = await getDocs(q);

  const boxes: Box[] = querySnapshot.docs.map(doc => doc.data() as Box);

  return boxes;
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
  verifiedUid();

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
  verifiedUid();

  const qnaBoxDocRef = doc(db, BOXES_COLLECTION_NAME, boxId);
  await deleteDoc(qnaBoxDocRef);
};

export const joinQnaBox = async (boxId: string) => {
  const uid = verifiedUid();
  if (!uid) return;

  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayUnion(boxId),
  });
};

export const exitQnaBox = async (boxId: string) => {
  const uid = verifiedUid();
  if (!uid) return;

  const userDocRef = doc(db, USERS_COLLECTION_NAME, uid);

  await updateDoc(userDocRef, {
    joinedBoxes: arrayRemove(boxId),
  });
};
