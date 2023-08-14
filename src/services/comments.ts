import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import { getUserRef } from './profile';
import { getUid } from './auth';
import { COMMENTS_COLLECTION_NAME } from '../constants/collectionNames';

export const getCommentRef = (commentId: string) => doc(db, COMMENTS_COLLECTION_NAME, commentId);

// export interface Reply {
//   commentId: string;
//   authorId: string;
//   displayName: string | undefined;
//   boxId: string;
//   content: string;
//   likes: number;
//   createdAt: number;
//   parentId: string | null;
// }

export interface CommentData {
  commentId: string;
  authorId: string;
  displayName: string | undefined;
  boxId: string;
  content: string;
  likes: number;
  createdAt: number;
  // replies: Reply[];
  replies: [];
}

export const createComment = async (boxId: string, content: string, displayName: string | undefined) => {
  const uid = getUid();
  if (!uid) return;

  const commentsCollectionRef = collection(db, COMMENTS_COLLECTION_NAME);
  const commentDocRef = doc(commentsCollectionRef);

  const newComment: CommentData = {
    commentId: commentDocRef.id,
    boxId,
    authorId: uid,
    displayName,
    content,
    likes: 0,
    createdAt: Date.now(),
    replies: [],
  };

  await setDoc(commentDocRef, newComment);
};

export const getComments = async (boxId: string, subfilter: string, pageParam?: number) => {
  const commentsQuery = pageParam
    ? query(
        collection(db, COMMENTS_COLLECTION_NAME),
        where('boxId', '==', boxId),
        orderBy('createdAt', `${subfilter === '최신순' ? 'desc' : 'asc'}`),
        limit(3),
      )
    : query(
        collection(db, COMMENTS_COLLECTION_NAME),
        where('boxId', '==', boxId),
        orderBy('createdAt', `${subfilter === '최신순' ? 'desc' : 'asc'}`),
        limit(3),
        startAfter(pageParam),
      );

  const querySnapshot = await getDocs(commentsQuery);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const data = querySnapshot.docs.map(doc => doc.data() as CommentData);

  return { data, nextPage: lastVisible };
};

export const updateComment = async (commentId: string, updatedContent: string) => {
  await updateDoc(getCommentRef(commentId), { content: updatedContent });
};

export const deleteComment = async (commentId: string) => {
  await deleteDoc(getCommentRef(commentId));
};

export const increaseCommentLikes = async (commentId: string) => {
  const uid = getUid();
  if (!uid) return;

  await updateDoc(getUserRef(uid), { likedComments: arrayUnion(commentId) });

  const commentRef = getCommentRef(commentId);
  const commentData = await getDoc(commentRef);
  if (commentData.exists()) {
    const updatedLikes = commentData.get('likes') + 1;
    await updateDoc(commentRef, { likes: updatedLikes });
  }
};

export const decreaseCommentLikes = async (commentId: string) => {
  const uid = getUid();
  if (!uid) return;

  await updateDoc(getUserRef(uid), { likedComments: arrayRemove(commentId) });

  const commentRef = getCommentRef(commentId);
  const commentData = await getDoc(commentRef);
  if (commentData.exists()) {
    const updatedLikes = Math.max(0, commentData.get('likes') - 1);
    await updateDoc(commentRef, { likes: updatedLikes });
  }
};
