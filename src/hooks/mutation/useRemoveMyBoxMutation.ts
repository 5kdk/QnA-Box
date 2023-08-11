import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, deleteQnaBox } from '../../services/boxes';

const useRemoveMyBoxMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = ['box', 'my'];

  return useMutation({
    mutationFn: (boxId: string) => deleteQnaBox(boxId),
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey });

      const previousBoxList = queryClient.getQueryData<Box[]>(queryKey);

      const expected = (prev: Box[] | undefined, boxId: string) => {
        if (!prev) {
          return [];
        }
        const updatedBoxList = prev.filter(box => box.boxId !== boxId);
        return updatedBoxList;
      };

      queryClient.setQueryData(queryKey, expected(previousBoxList, variables));

      return { previousBoxList };
    },
    onError(_, __, context) {
      queryClient.setQueryData(queryKey, context?.previousBoxList);
    },
  });
};

export default useRemoveMyBoxMutation;
