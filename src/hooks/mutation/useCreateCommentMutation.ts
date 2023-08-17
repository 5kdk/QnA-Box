import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentData, createComment } from '../../services/comments';
import { filterState } from '../../jotai/atom';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';

interface mutationFnProps {
  newComment: CommentData;
}

const useCreateCommentMutation = () => {
  const { subFilter } = useAtomValue(filterState);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['boxcomments', id, subFilter];

  return useMutation({
    mutationFn: ({ newComment }: mutationFnProps) => createComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useCreateCommentMutation;
