import { FieldErrors } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProps {
  errors: FieldErrors;
}
const Notification = ({ errors }: NotificationProps) => {
  Object.values(errors).forEach(obj => obj?.message && toast(`${obj.message}`));
  return <ToastContainer />;
};

export default Notification;
