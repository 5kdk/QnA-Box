import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
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
