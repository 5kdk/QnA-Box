import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { filterState, userState } from '../../jotai/atom';
import { Box, getMyQnaBoxes, getQnaBoxesById } from '../../services/boxes';

const staleTime = 3000;

const useMyListQuery = () => {
  const { joinedBoxes } = useAtomValue(userState);
  const filter = useAtomValue(filterState);

  const queryFn = filter.mainFilter === 'joined' ? () => getQnaBoxesById(joinedBoxes) : () => getMyQnaBoxes();

  const { data } = useQuery({
    queryKey: ['box', filter.mainFilter],
    queryFn,
    staleTime,
  });

  return (data as Box[]) || [];
};

export default useMyListQuery;
