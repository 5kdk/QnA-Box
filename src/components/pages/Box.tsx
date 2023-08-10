import { Suspense, useState } from 'react';
import BoxComment from '../Box/BoxComment';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../molecules/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Loading } from '../atom';
import Question from '../molecules/Question';
import Answer from '../molecules/Answer';

const Box = () => {
  const [replyComment, setReplyComment] = useState('');
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<Loading />}>
        <BoxComment replyComment={replyComment} setReplyComment={setReplyComment} />
        {replyComment ? <Answer replyComment={replyComment} /> : <Question />}
      </Suspense>
    </ErrorBoundary>
  );
};

export default Box;
