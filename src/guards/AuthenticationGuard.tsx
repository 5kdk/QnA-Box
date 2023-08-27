import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userState } from '../jotai/atom';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const AuthenticationGuard = ({ redirectTo, element, isAuthenticated }: AuthenticationGuardProps) => {
  const user = useAtomValue(userState);

  if (!user === isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default AuthenticationGuard;
