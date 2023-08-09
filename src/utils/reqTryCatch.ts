import { FirebaseError } from 'firebase/app';

const reqTryCatch = async (
  tryFunc: () => Promise<void>,
  catchFunc: (err: FirebaseError) => void = error => console.error(error),
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

export default reqTryCatch;
