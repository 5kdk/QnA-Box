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

export interface ReplyData {
  authorId: string | undefined;
  isAnonymous: boolean;
  content: string;
  likes: number;
  createdAt: number;
}

export interface CommentData {
  boxId: string;
  commentId: string;
  authorId: string | undefined;
  isAnonymous: boolean;
  content: string;
  likes: number;
  createdAt: number;
  replies: ReplyData[];
}

export const createComment = async (boxId: string, content: string, isAnonymous: boolean) => {
  const uid = getUid();

  const commentsCollectionRef = collection(db, COMMENTS_COLLECTION_NAME);
  const commentDocRef = doc(commentsCollectionRef);

  const newComment: CommentData = {
    commentId: commentDocRef.id,
    boxId,
    authorId: uid,
    isAnonymous: isAnonymous,
    content,
    likes: 0,
    createdAt: Date.now(),
    replies: [],
  };

  await setDoc(commentDocRef, newComment);
};

export const fetchFilteredCommentsByPage = async (boxId: string, subfilter: string, pageParam?: number) => {
  const commentsQuery = pageParam
    ? query(
        collection(db, COMMENTS_COLLECTION_NAME),
        where('boxId', '==', boxId),
        orderBy('createdAt', `${subfilter === '최신순' ? 'desc' : 'asc'}`),
        limit(5),
        startAfter(pageParam),
      )
    : query(
        collection(db, COMMENTS_COLLECTION_NAME),
        where('boxId', '==', boxId),
        orderBy('createdAt', `${subfilter === '최신순' ? 'desc' : 'asc'}`),
        limit(5),
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

export const createReplyToComment = async (commentId: string, reply: ReplyData) => {
  const commentRef = doc(db, COMMENTS_COLLECTION_NAME, commentId);

  await updateDoc(commentRef, {
    replies: arrayUnion(reply),
  });
};

export const updateReplyToComment = async (commentId: string, newContent: string, createdAt: number) => {
  const commentRef = doc(db, COMMENTS_COLLECTION_NAME, commentId);

  const commentSnapshot = await getDoc(commentRef);
  const commentData = commentSnapshot.data();

  if (commentData && commentData.replies) {
    const replyIndex = commentData.replies.findIndex((reply: ReplyData) => reply.createdAt === createdAt);
    if (replyIndex > -1) {
      const newReplies = [...commentData.replies];
      newReplies[replyIndex] = { ...newReplies[replyIndex], content: newContent };

      await updateDoc(commentRef, {
        replies: newReplies,
      });
    }
  }
};

export const removeReplyToComment = async (commentId: string, createdAt: number) => {
  const commentRef = doc(db, COMMENTS_COLLECTION_NAME, commentId);

  const commentSnapshot = await getDoc(commentRef);
  const commentData = commentSnapshot.data();

  if (commentData && commentData.replies) {
    const replyIndex = commentData.replies.findIndex((reply: ReplyData) => reply.createdAt === createdAt);
    if (replyIndex > -1) {
      const newReplies = [...commentData.replies.slice(0, replyIndex), ...commentData.replies.slice(replyIndex + 1)];

      await updateDoc(commentRef, {
        replies: newReplies,
      });
    }
  }
};
