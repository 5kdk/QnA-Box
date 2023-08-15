import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentData, updateComment } from '../../services/comments';
import { filterState } from '../../jotai/atom';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { QueryDocumentSnapshot } from 'firebase/firestore';

interface mutationFnProps {
  commentId: string;
  input: string;
}

interface PageData {
  data: Array<CommentData>;
  nextPage: QueryDocumentSnapshot | undefined;
}

interface QueryData {
  pages: Array<PageData>;
  pageParams: Array<QueryDocumentSnapshot | undefined>;
}

const useUpdateCommentMutation = () => {
  const { subFilter } = useAtomValue(filterState);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['boxcomments', id, subFilter];

  return useMutation({
    mutationFn: ({ commentId, input }: mutationFnProps) => updateComment(commentId, input),
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey });

      const previousComment: QueryData = queryClient.getQueryData<QueryData>(queryKey)!;

      const expected = (prev: QueryData, variables: mutationFnProps) => {
        const updatedCommentList = {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            data: page.data.map((comment: CommentData) =>
              comment.commentId === variables.commentId ? { ...comment, content: variables.input } : comment,
            ),
          })),
        };
        return updatedCommentList;
      };

      queryClient.setQueryData(queryKey, expected(previousComment, variables));

      return { previousComment };
    },
    onError(_, __, context) {
      queryClient.setQueryData(queryKey, context?.previousComment);
    },
  });
};

export default useUpdateCommentMutation;
