import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userState } from '../jotai/atom';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: React.ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
  const user = useAtomValue(userState);

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default AuthenticationGuard;
