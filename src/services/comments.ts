import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { COMMENTS_COLLECTION_NAME } from '../constants/collectionNames';

interface Reply {
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface CommentData {
  commentId: string;
  boxId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: string;
  replies: Reply[];
}

export const createComment = async (boxId: string, content: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const newCommentId = performance.now().toString();
  const newComment: CommentData = {
    commentId: newCommentId,
    boxId,
    authorId: user.uid,
    content: content,
    likes: 0,
    createdAt: new Date().toISOString(),
    replies: [],
  };

  const commentDocRef = doc(db, COMMENTS_COLLECTION_NAME, newCommentId);
  await setDoc(commentDocRef, newComment);
};
