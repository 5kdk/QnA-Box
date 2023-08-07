import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: React.ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
  const isLogin = auth.currentUser;

  if (!isLogin) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default AuthenticationGuard;
