import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userState } from '../jotai/atom';
import { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { getProfile } from '../services/profile';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const AuthenticationGuard = ({ redirectTo, element, isAuthenticated }: AuthenticationGuardProps) => {
  const [user, setUser] = useAtom(userState);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        const getUser = async () => {
          try {
            const data = await getProfile(user.uid);
            if (data) setUser(data);
          } catch (err) {
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
        getUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [setUser]);

  if (!isLoading && !user === isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return !isLoading && element;
};

export default AuthenticationGuard;
