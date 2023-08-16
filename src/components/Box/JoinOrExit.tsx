import { useAtom, useSetAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { BookmarkPlus as Enter } from '@emotion-icons/bootstrap';
import { BookmarkCheckFill as Exit } from '@emotion-icons/bootstrap';
import { toastErrorState, userState } from '../../jotai/atom';
import { exitQnaBox, joinQnaBox } from '../../services/boxes';
import { UserData } from '../../services/profile';

interface JoinExitProps {
  type: 'join' | 'exit';
  boxId: string;
}

const JoinOrExit = ({ type, boxId }: JoinExitProps) => {
  const [user, setUser] = useAtom(userState);
  const setToastError = useSetAtom(toastErrorState);
  const { mutate } = useMutation({
    mutationFn: () => {
      const func = type !== 'join' ? joinQnaBox : exitQnaBox;
      return func(boxId);
    },
    onMutate: () => {
      setUser(user =>
        !user
          ? null
          : {
              ...user,
              joinedBoxes:
                type === 'join' ? [...user!.joinedBoxes, boxId] : user!.joinedBoxes.filter(id => id !== boxId),
            },
      );
      return { ...user };
    },
    onError: (err: Error, _, user) => {
      setToastError([err.message]);
      setUser(user as UserData);
    },
  });

  return (
    <button title={type === 'join' ? 'Box 담기' : 'Box 나가기'} aria-label={type} onClick={() => mutate()}>
      {type === 'join' ? <Exit size={20} /> : <Enter size={20} />}
    </button>
  );
};

export default JoinOrExit;
