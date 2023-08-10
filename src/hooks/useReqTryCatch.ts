import { FirebaseError } from 'firebase/app';
import { useSetAtom } from 'jotai';
import { toastErrorState } from '../jotai/atom';

const useReqTryCatch = () => {
  const setToastError = useSetAtom(toastErrorState);

  const reqTryCatch = async (
    tryFunc: () => Promise<void>,
    catchFunc: (err: FirebaseError) => void = err => setToastError(err.message),
    finalFunc: () => void = () => {},
  ) => {
    try {
      await tryFunc();
    } catch (err) {
      if (err instanceof FirebaseError) {
        catchFunc(err);
      }
    } finally {
      finalFunc();
    }
  };
  return reqTryCatch;
};

export default useReqTryCatch;
