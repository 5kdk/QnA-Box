export const getLocalStorage = (key: string) => {
  const user = localStorage.getItem(key);
  return user ? JSON.parse(user) : null;
};

export const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
