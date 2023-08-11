import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Loading } from '../atom';
import { UserProfile } from '../User';
import { Error } from '.';

const User = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={Error} onReset={reset}>
      <Suspense fallback={<Loading />}>
        <UserProfile />;
      </Suspense>
    </ErrorBoundary>
  );
};

export default User;
