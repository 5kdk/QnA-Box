import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from '.';
import { Box, deleteQnaBox } from '../../services/boxes';

const useRemoveMyBoxMutation = () => {
  const queryClient = useQueryClient();

  return useGenericMutation<Box[], string>({
    queryKey: ['box', 'my'],
    mutationFn: deleteQnaBox,
    onMutate: boxId => {
      const previousBoxList = queryClient.getQueryData<Box[]>(['box', 'my']) ?? [];
      const updatedBoxList = previousBoxList.filter(box => box.boxId !== boxId);
      return updatedBoxList;
    },
  });
};

export default useRemoveMyBoxMutation;
