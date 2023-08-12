import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import { getUserRef } from './profile';
import { getUid } from './auth';
import { COMMENTS_COLLECTION_NAME } from '../constants/collectionNames';

export const getCommentRef = (commentId: string) => doc(db, COMMENTS_COLLECTION_NAME, commentId);

interface CommentData {
  commentId: string;
  boxId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: number;
  parentId: string | null;
}

export const createComment = async (boxId: string, content: string, commentId?: string) => {
  const uid = getUid();
  if (!uid) return;

  const commentsCollectionRef = collection(db, COMMENTS_COLLECTION_NAME);
  const commentDocRef = doc(commentsCollectionRef);

  const newComment: CommentData = {
    commentId: commentDocRef.id,
    boxId,
    authorId: uid,
    content,
    likes: 0,
    createdAt: Date.now(),
    parentId: commentId || null,
  };

  await setDoc(commentDocRef, newComment);
};

export const getComments = async (boxId: string) => {
  const commentsQuery = query(
    collection(db, COMMENTS_COLLECTION_NAME),
    where('boxId', '==', boxId),
    orderBy('createdAt'),
  );

  const querySnapshot = await getDocs(commentsQuery);
  const allComments = querySnapshot.docs.map(doc => doc.data() as CommentData);
  const comments = allComments.filter(c => !c.parentId);
  const replies = allComments.filter(c => c.parentId);
  return comments.map(comment => {
    return { ...comment, replies: replies.filter(reply => reply.parentId === comment.commentId) };
  });
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
