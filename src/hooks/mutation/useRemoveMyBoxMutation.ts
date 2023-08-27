import { deleteQnaBox } from '../../services/boxes';
import { useBoxMutation } from '.';

const useRemoveMyBoxMutation = () => {
  return useBoxMutation<string>({
    mutationFn: boxId => deleteQnaBox(boxId),
    onMutate: (prev, boxId) => {
      if (!prev) {
        return [];
      }
      const updatedBoxList = prev.filter(box => box.boxId !== boxId);
      return updatedBoxList;
    },
  });
};

export default useRemoveMyBoxMutation;
