import { atom } from 'jotai';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localStorage';

const KEY = 'user';

export const getInitialValue = () => {
  return getLocalStorage(KEY);
};

const baseAtom = atom(getInitialValue());

export const userState = atom(
  get => get(baseAtom),
  (get, set, update) => {
    const currentValue = get(baseAtom);
    const nextValue = typeof update === 'function' ? update(currentValue) : update;
    set(baseAtom, nextValue);
    if (nextValue) setLocalStorage(KEY, nextValue);
    else removeLocalStorage(KEY);
  },
);

export default userState;
