import { Box, FormElement, updateQnaBox } from '../../services/boxes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateMyBoxMutationProps {
  boxId: string;
  editFormData: FormElement;
}

const useUpdateMyBoxMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = ['box', 'my'];

  return useMutation({
    mutationFn: ({ boxId, editFormData }: UpdateMyBoxMutationProps) => updateQnaBox(boxId, editFormData),
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey });

      const previousBoxList = queryClient.getQueryData<Box[]>(queryKey);

      const expected = (prev: Box[] | undefined, { boxId, editFormData }: UpdateMyBoxMutationProps) => {
        if (!prev) {
          return [];
        }
        const updatedBoxList = prev.map(box => (box.boxId === boxId ? { ...box, ...editFormData } : box));
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

export default useUpdateMyBoxMutation;
