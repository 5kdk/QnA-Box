import { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Buttons } from '../BoxList';
// import { Buttons, Pagenation } from '../BoxList';
import Controller from '../molecules/Controller';
import Board from '../BoxList/Board';
import { Loading } from '../atom';
import ErrorFallback from '../molecules/ErrorFallback';

export type MainFilter = 'joined' | 'my';

const BoxList = () => {
  const [boxFilter, setBoxFilter] = useState<MainFilter>('joined');
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();
  // const switchPage = () => console.log('hi');

  const handleClickJoinedBox = () => {
    setBoxFilter('joined');
  };
  const handleClickMyBox = () => {
    setBoxFilter('my');
  };

  const handleClickNewBox = () => {
    navigate('create');
  };

  return (
    <>
      <Buttons
        boxFilter={boxFilter}
        handleClickJoinedBox={handleClickJoinedBox}
        handleClickMyBox={handleClickMyBox}
        handleClickNewBox={handleClickNewBox}
      />
      <Controller />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Loading />}>
          <Board boxFilter={boxFilter} />
        </Suspense>
      </ErrorBoundary>
      {/* <Pagenation currentPage={1} maxPage={5} onClickPageButton={switchPage} /> */}
    </>
  );
};

export default BoxList;
