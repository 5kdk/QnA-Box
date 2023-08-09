import { useQuery } from '@tanstack/react-query';
import { MainFilter } from '../../components/pages/BoxList';
import { useAtomValue } from 'jotai';
import { userState } from '../../jotai/atom';
import { getMyQnaBoxes, getQnaBoxesById } from '../../services/boxes';

const staleTime = 3000;

const useMyListQuery = (boxFilter: MainFilter) => {
  const { joinedBoxes } = useAtomValue(userState);

  const queryFn = boxFilter === 'joined' ? () => getQnaBoxesById(joinedBoxes) : () => getMyQnaBoxes();

  const { data } = useQuery({
    queryKey: ['box', boxFilter],
    queryFn,
    staleTime,
  });

  return data || [];
};

export default useMyListQuery;
