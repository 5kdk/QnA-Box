import { useEffect, useRef } from 'react';

const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;
