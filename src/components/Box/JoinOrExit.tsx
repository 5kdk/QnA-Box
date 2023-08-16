import { useSetAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { BookmarkPlus as Enter } from '@emotion-icons/bootstrap';
import { BookmarkCheckFill as Exit } from '@emotion-icons/bootstrap';
import { toastErrorState, userState } from '../../jotai/atom';
import { exitQnaBox, joinQnaBox } from '../../services/boxes';

interface JoinExitProps {
  type: 'join' | 'exit';
  boxId: string;
}

const JoinOrExit = ({ type, boxId }: JoinExitProps) => {
  const setUser = useSetAtom(userState);
  const setToastError = useSetAtom(toastErrorState);
  const { mutate } = useMutation({
    mutationFn: () => {
      const func = type === 'join' ? exitQnaBox : joinQnaBox;
      return func(boxId);
    },
    onMutate: () =>
      setUser(user =>
        !user
          ? null
          : {
              ...user,
              joinedBoxes:
                type === 'join' ? user!.joinedBoxes.filter(id => id !== boxId) : [...user!.joinedBoxes, boxId],
            },
      ),
    onError: (err: Error) => setToastError([err.message]),
  });

  return (
    <button title={type === 'join' ? 'Box 담기' : 'Box 나가기'} aria-label={type} onClick={() => mutate()}>
      {type === 'join' ? <Exit size={20} /> : <Enter size={20} />}
    </button>
  );
};

export default JoinOrExit;
