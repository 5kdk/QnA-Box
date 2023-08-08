import { atom } from 'jotai';

const KEY = 'user';

export const getInitialValue = () => {
  const user = localStorage.getItem(KEY);
  return user ? JSON.parse(user) : null;
};

const baseAtom = atom(getInitialValue());

export const userState = atom(
  get => get(baseAtom),
  (get, set, update) => {
    const currentValue = get(baseAtom);
    const nextValue = typeof update === 'function' ? update(currentValue) : update;
    set(baseAtom, nextValue);
    localStorage.setItem(KEY, JSON.stringify(nextValue));
  },
);

export default userState;
