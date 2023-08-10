import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from '.';
import { Box, FormElement, updateQnaBox } from '../../services/boxes';

const useUpdateMyBoxMutation = () => {
  const queryClient = useQueryClient();

  return useGenericMutation<Box[], { boxId: string; editFormData: FormElement }>({
    queryKey: ['box', 'my'],
    mutationFn: ({ boxId, editFormData }) => updateQnaBox(boxId, editFormData),
    onMutate: ({ boxId, editFormData }) => {
      const previousBoxList = queryClient.getQueryData<Box[]>(['box', 'my']) ?? [];

      const updatedBoxList = previousBoxList.map(box => (box.boxId === boxId ? { ...box, ...editFormData } : box));
      return updatedBoxList;
    },
  });
};

export default useUpdateMyBoxMutation;
