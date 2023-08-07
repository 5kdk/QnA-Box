import { atom } from 'jotai';

const KEY = 'user';

const userState = () => {
  const getInitialValue = () => {
    const item = localStorage.getItem(KEY);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
  };

  const baseAtom = atom(getInitialValue());

  const derivedAtom = atom(
    get => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(KEY, JSON.stringify(nextValue));
    },
  );
  return derivedAtom;
};

export default userState;
