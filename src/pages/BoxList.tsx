import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Buttons } from '../components/BoxList';
import { Board } from '../components/BoxList/';
import { ItemSkeleton, Controller, ErrorFallback } from '../components/molecules';

const BoxList = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Buttons />
      <Controller />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<ItemSkeleton num={5} />}>
          <Board />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default BoxList;
