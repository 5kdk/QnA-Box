import { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Buttons } from '../components/BoxList';
// import { Buttons, Pagenation } from '../BoxList';
import Controller from '../components/molecules/Controller';
import Board from '../components/BoxList/Board';
import ErrorFallback from '../components/molecules/ErrorFallback';
import { ItemSkeleton } from '../components/molecules';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const key = 'filter';

export type MainFilter = 'joined' | 'my';

const BoxList = () => {
  const [boxFilter, setBoxFilter] = useState<MainFilter>(getLocalStorage(key) || 'my');
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();
  // const switchPage = () => console.log('hi');

  const handleClickJoinedBox = () => {
    setBoxFilter('joined');
    setLocalStorage(key, 'joined');
  };
  const handleClickMyBox = () => {
    setBoxFilter('my');
    setLocalStorage(key, 'my');
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
        <Suspense fallback={<ItemSkeleton num={5} />}>
          <Board boxFilter={boxFilter} />
        </Suspense>
      </ErrorBoundary>
      {/* <Pagenation currentPage={1} maxPage={5} onClickPageButton={switchPage} /> */}
    </>
  );
};

export default BoxList;
