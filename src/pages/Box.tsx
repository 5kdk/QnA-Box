import { Suspense, useState } from 'react';
import BoxComment from '../components/Box/BoxComment';
import Question from '../components/molecules/Question';
import Answer from '../components/molecules/Answer';
import BoxSkeleton from '../components/molecules/BoxSkeleton';
import { getComments } from '../services/comments';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export type Comments = {
  authorId: string;
  boxId: string;
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  parentId: null;
  replies: [];
};

const Box = () => {
  const [replyComment, setReplyComment] = useState('');
  const [replyUser, setReplyUser] = useState('');
  const { id } = useParams() as { id: string };
  const staleTime = 3000;
  const { data } = useQuery({
    queryKey: ['boxcomments', id],
    queryFn: () => getComments(id),
    staleTime,
  }) as { data: Comments[] };

  return (
    <Suspense fallback={<BoxSkeleton />}>
      <BoxComment
        comments={data}
        replyComment={replyComment}
        setReplyComment={setReplyComment}
        setReplyUser={setReplyUser}
      />
      {replyComment ? <Answer replyUser={replyUser} /> : <Question />}
    </Suspense>
  );
};

export default Box;
