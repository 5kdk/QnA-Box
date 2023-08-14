import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../../services/comments';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { filterState } from '../../jotai/atom';

const staleTime = 1000 * 60 * 5;

const useInfinityCommentQuery = () => {
  const { subFilter } = useAtomValue(filterState);
  const { id } = useParams<string>();

  const query = useInfiniteQuery({
    queryKey: ['boxcomments', id, subFilter],
    queryFn: ({ pageParam = 1 }) => getComments(id!, subFilter, pageParam),
    getNextPageParam: lastPage => lastPage.nextPage || undefined,
    staleTime,
  });

  return { ...query, boxcomments: query.data };
};

export default useInfinityCommentQuery;
