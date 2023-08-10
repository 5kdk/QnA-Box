import { Suspense, useState } from 'react';
import BoxComment from '../Box/BoxComment';
import Question from '../molecules/Question';
import Answer from '../molecules/Answer';
import BoxSkeleton from '../molecules/BoxSkeleton';

const Box = () => {
  const [replyComment, setReplyComment] = useState('');
  return (
    <Suspense fallback={<BoxSkeleton num={5} />}>
      <BoxComment replyComment={replyComment} setReplyComment={setReplyComment} />
      {replyComment ? <Answer replyComment={replyComment} /> : <Question />}
    </Suspense>
  );
};

export default Box;
