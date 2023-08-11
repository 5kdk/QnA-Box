import { Suspense, useState } from 'react';
import BoxComment from '../components/Box/BoxComment';
import Question from '../components/molecules/Question';
import Answer from '../components/molecules/Answer';
import BoxSkeleton from '../components/molecules/BoxSkeleton';

const Box = () => {
  const [replyComment, setReplyComment] = useState('');
  return (
    <Suspense fallback={<BoxSkeleton />}>
      <BoxComment replyComment={replyComment} setReplyComment={setReplyComment} />
      {replyComment ? <Answer replyComment={replyComment} /> : <Question />}
    </Suspense>
  );
};

export default Box;
