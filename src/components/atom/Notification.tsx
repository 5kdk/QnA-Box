import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

  useEffect(() => {
    toast.dismiss();
    if (Array.isArray(errors)) errors.forEach(error => error && toast.info(error));
    else if (errors) toast.info(errors);
  }, [errors]);

  useEffect(() => {
    toast.dismiss();
  }, [pathname]);

  return <ToastContainer newestOnTop css={notificationCss} position="top-center" autoClose={3000} transition={Slide} />;
};

export default Notification;
