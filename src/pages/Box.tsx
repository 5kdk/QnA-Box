import { Suspense, useState } from 'react';
import BoxComment from '../components/Box/BoxComment';
import Question from '../components/molecules/Question';
import Answer from '../components/molecules/Answer';
import BoxSkeleton from '../components/molecules/BoxSkeleton';
import { useParams } from 'react-router-dom';

export type Comments = {
  authorId: string;
  boxId: string;
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  parentId: null | string;
  replies: [];
};

const Box = () => {
  const [replyComment, setReplyComment] = useState('');
  const [replyUser, setReplyUser] = useState('');
  const { id } = useParams() as { id: string };

  return (
    <Suspense fallback={<BoxSkeleton />}>
      <BoxComment replyComment={replyComment} setReplyComment={setReplyComment} setReplyUser={setReplyUser} />
      {replyComment ? <Answer replyUser={replyUser} replyComment={replyComment} BoxId={id} /> : <Question />}
    </Suspense>
  );
};

export default Box;
