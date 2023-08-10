import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAtomValue } from 'jotai';
import { toastErrorState } from '../../jotai/atom';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  const errors = useAtomValue(toastErrorState);

  useEffect(() => {
    if (Array.isArray(errors)) errors.forEach(error => error && toast.info(error));
    else if (errors) toast.info(errors);
  }, [errors]);

  return <ToastContainer newestOnTop style={{ fontSize: 14 }} />;
};

export default Notification;
