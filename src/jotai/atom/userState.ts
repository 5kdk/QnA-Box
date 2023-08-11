import { atom } from 'jotai';
import { removeLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { UserData } from '../../services/profile';

const KEY = 'uid';
const baseAtom = atom<UserData | null>(null);

export const userState = atom(
  get => get(baseAtom),
  (get, set, update) => {
    const currentValue = get(baseAtom);
    const nextValue = typeof update === 'function' ? update(currentValue) : update;
    set(baseAtom, nextValue);
    if (nextValue) setLocalStorage(KEY, nextValue.uid);
    else removeLocalStorage(KEY);
  },
);

export default userState;
