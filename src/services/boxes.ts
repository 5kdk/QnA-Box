import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { USERS_COLLECTION_NAME, BOXES_COLLECTION_NAME } from '../constants/collectionNames';

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

const updateUserQnaBoxes = async (userUid: string, boxId: string) => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, userUid);

  await updateDoc(userDocRef, {
    myBoxs: arrayUnion(boxId),
  });
};

export const createQnaBox = async (formData: FormData) => {
  const user = auth.currentUser;
  if (!user) return;
  const newData = { ownerUid: user.uid, owner: user.displayName, createdAt: Date.now(), ...formData };
  const qnaBoxsCollection = collection(db, BOXES_COLLECTION_NAME);
  const qnaBoxDocRef = await addDoc(qnaBoxsCollection, newData);
  await updateUserQnaBoxes(user.uid, qnaBoxDocRef.id);
};

export const getMyQnaBoxs = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const qnaBoxesCollectionRef = collection(db, BOXES_COLLECTION_NAME);
  const ownerUidFilter = where(OWNER_UID, '==', user.uid);
  const q = query(qnaBoxesCollectionRef, ownerUidFilter);
  const querySnapshot = await getDocs(q);

  const boxes: Box[] = querySnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Box,
  );

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
