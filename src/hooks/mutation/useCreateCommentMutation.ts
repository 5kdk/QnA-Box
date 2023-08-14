import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../services/comments';
import { filterState } from '../../jotai/atom';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';

interface mutationFnProps {
  question: string;
  isAnonymous: boolean;
}

const useCreateCommentMutation = () => {
  const { subFilter } = useAtomValue(filterState);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['boxcomments', id, subFilter];

  return useMutation({
    mutationFn: ({ question, isAnonymous }: mutationFnProps) => createComment(id!, question, isAnonymous),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useCreateCommentMutation;
