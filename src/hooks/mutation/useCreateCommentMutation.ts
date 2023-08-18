import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { filterState } from '../../jotai/atom';
import { QueryData } from './useCreateReplyMutation';
import { CommentData, createComment } from '../../services/comments';

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
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey });

      const previousComment: QueryData = queryClient.getQueryData<QueryData>(queryKey)!;

      const expected = (prev: QueryData, variables: mutationFnProps) => {
        const pages = [...prev.pages];
        pages[0] = {
          ...pages[0],
          data: [variables.newComment, ...(pages[0]?.data || [])],
        };
        const updatedCommentList = {
          ...prev,
          pages,
        };
        return updatedCommentList;
      };

      queryClient.setQueryData(queryKey, expected(previousComment, variables));

      return { previousComment };
    },
    onError(_, __, context) {
      queryClient.setQueryData(queryKey, context?.previousComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useCreateCommentMutation;
