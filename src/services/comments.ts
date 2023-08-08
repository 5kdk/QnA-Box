import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { COMMENTS_COLLECTION_NAME } from '../constants/collectionNames';

interface Reply {
  authorId: string;
  content: string;
  createdAt: number;
}
interface CommentData {
  commentId: string;
  boxId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: number;
  replies: Reply[];
}

export const createComment = async (boxId: string, content: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const commentsCollectionRef = collection(db, COMMENTS_COLLECTION_NAME);
  const commentDocRef = doc(commentsCollectionRef);

  const newComment: CommentData = {
    commentId: commentDocRef.id,
    boxId,
    authorId: user.uid,
    content,
    likes: 0,
    createdAt: Date.now(),
    replies: [],
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
  const comments = querySnapshot.docs.map(doc => doc.data() as CommentData);

  return comments;
};

export const updateComment = async (commentId: string, updatedContent: string) => {
  const commentRef = doc(db, COMMENTS_COLLECTION_NAME, commentId);
  await updateDoc(commentRef, { content: updatedContent });
};

export const deleteComment = async (commentId: string) => {
  const commentRef = doc(db, COMMENTS_COLLECTION_NAME, commentId);
  await deleteDoc(commentRef);
};
