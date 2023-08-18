import {
  DocumentReference,
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

export interface ReplyData {
  authorId: string;
  isAnonymous: boolean;
  content: string;
  likes: number;
  createdAt: number;
}

export interface CommentData {
  boxId: string;
  commentId: string;
  authorId: string;
  isAnonymous: boolean;
  content: string;
  likes: number;
  createdAt: number;
  replies: ReplyData[];
}

export const getCommentRef = (commentId: string) => doc(db, COMMENTS_COLLECTION_NAME, commentId);

const getComment = async (commentRef: DocumentReference) => {
  const snapshot = await getDoc(commentRef);
  const comment = snapshot.data();
  return comment;
};

export const makeNewComment = (boxId: string, content: string, isAnonymous: boolean) => {
  const uid = getUid();

  const commentsCollectionRef = collection(db, COMMENTS_COLLECTION_NAME);
  const commentDocRef = doc(commentsCollectionRef);

  return {
    commentId: commentDocRef.id,
    boxId,
    authorId: uid,
    isAnonymous: isAnonymous,
    content,
    likes: 0,
    createdAt: Date.now(),
    replies: [],
  };
};

export const createComment = async (newComment: CommentData) => {
  const commentRef = getCommentRef(newComment.commentId);
  await setDoc(commentRef, newComment);
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

const verifyCommentAuthor = async (commentRef: DocumentReference) => {
  const uid = getUid();

  const comment = await getComment(commentRef);
  if (comment?.authorId !== uid) throw new Error('해당 글의 작성자가 아닙니다');
};

export const updateComment = async (commentId: string, updatedContent: string) => {
  const commentRef = getCommentRef(commentId);
  await verifyCommentAuthor(commentRef);
  await updateDoc(commentRef, { content: updatedContent });
};

export const deleteComment = async (commentId: string) => {
  const commentRef = getCommentRef(commentId);
  await verifyCommentAuthor(commentRef);
  await deleteDoc(commentRef);
};

export const increaseCommentLikes = async (commentId: string) => {
  const uid = getUid();

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

  await updateDoc(getUserRef(uid), { likedComments: arrayRemove(commentId) });

  const commentRef = getCommentRef(commentId);
  const commentData = await getDoc(commentRef);
  if (commentData.exists()) {
    const updatedLikes = Math.max(0, commentData.get('likes') - 1);
    await updateDoc(commentRef, { likes: updatedLikes });
  }
};

export const makeNewReply = (content: string, isAnonymous: boolean) => {
  const uid = getUid();

  return {
    authorId: uid,
    isAnonymous,
    content,
    likes: 0,
    createdAt: Date.now(),
  };
};

export const createReplyToComment = async (commentId: string, newReply: ReplyData) => {
  const commentRef = getCommentRef(commentId);
  await updateDoc(commentRef, {
    replies: arrayUnion(newReply),
  });
};

const getRepliesNTargetIdx = async (
  commentRef: DocumentReference,
  createdAt: number,
): Promise<[ReplyData[], number] | undefined> => {
  const uid = getUid();

  const comment = await getComment(commentRef);
  if (comment) {
    const replyIndex = comment.replies.findIndex((reply: ReplyData) => reply.createdAt === createdAt);
    if (replyIndex === -1) throw new Error('해당 글이 없습니다');
    else if (uid !== comment.replies[replyIndex].authorId) throw new Error('해당 글의 작성자가 아닙니다');
    return [[...comment.replies], replyIndex];
  }
};

export const updateReplyToComment = async (commentId: string, newContent: string, createdAt: number) => {
  const commentRef = getCommentRef(commentId);
  const data = await getRepliesNTargetIdx(commentRef, createdAt);

  if (data) {
    const [replies, updateIdx] = data;
    replies[updateIdx] = { ...replies[updateIdx], content: newContent };
    await updateDoc(commentRef, { replies });
  }
};

export const removeReplyToComment = async (commentId: string, createdAt: number) => {
  const commentRef = getCommentRef(commentId);
  const data = await getRepliesNTargetIdx(commentRef, createdAt);

  if (data) {
    const [replies, deleteIdx] = data;
    replies.splice(deleteIdx, 1);
    await updateDoc(commentRef, { replies });
  }
};
