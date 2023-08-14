import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { css } from '@emotion/react';
import { toastErrorState } from '../../jotai/atom';
import 'react-toastify/dist/ReactToastify.css';

const notificationCss = css`
  font-size: 13px;
`;

const Notification = () => {
  const errors = useAtomValue(toastErrorState);

  useEffect(() => {
    toast.dismiss();
    if (Array.isArray(errors)) errors.forEach(error => error && toast.info(error));
    else if (errors) toast.info(errors);
  }, [errors]);

  return <ToastContainer newestOnTop css={notificationCss} position="top-center" autoClose={3000} transition={Slide} />;
};

export default Notification;
