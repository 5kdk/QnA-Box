import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentData, deleteComment } from '../../services/comments';
import { filterState } from '../../jotai/atom';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { QueryDocumentSnapshot } from 'firebase/firestore';

interface PageData {
  data: Array<CommentData>;
  nextPage: QueryDocumentSnapshot | undefined;
}

interface QueryData {
  pages: Array<PageData>;
  pageParams: Array<QueryDocumentSnapshot | undefined>;
}

const useRemoveCommentMutation = () => {
  const { subFilter } = useAtomValue(filterState);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['boxcomments', id, subFilter];

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    async onMutate(commentId) {
      await queryClient.cancelQueries({ queryKey });

      const previousComment: QueryData = queryClient.getQueryData<QueryData>(queryKey)!;

      const expected = (prev: QueryData, commentId: string) => {
        const updatedBoxList = {
          ...prev,
          pages: prev.pages.map((page: PageData) => ({
            ...page,
            data: page.data.filter((comment: CommentData) => comment.commentId !== commentId),
          })),
        };
        return updatedBoxList;
      };

      queryClient.setQueryData(queryKey, expected(previousComment, commentId));

      return { previousComment };
    },
    onError(_, __, context) {
      queryClient.setQueryData(queryKey, context?.previousComment);
    },
  });
};

export default useRemoveCommentMutation;
