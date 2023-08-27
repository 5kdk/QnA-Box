import { useBoxMutation } from '.';
import { FormElement, updateQnaBox } from '../../services/boxes';

interface MutationVariables {
  boxId: string;
  editFormData: FormElement;
}

const useUpdateMyBoxMutation = () => {
  return useBoxMutation<MutationVariables>({
    mutationFn: ({ boxId, editFormData }) => updateQnaBox(boxId, editFormData),
    onMutate: (prev, { boxId, editFormData }) => {
      if (!prev) {
        return [];
      }
      const updatedBoxes = prev.map(box => (box.boxId === boxId ? { ...box, ...editFormData } : box));
      return updatedBoxes;
    },
  });
};

export default useUpdateMyBoxMutation;
