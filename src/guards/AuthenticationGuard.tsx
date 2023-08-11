import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import userState from '../jotai/atom/userState';
import { auth } from '../services/firebase';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: React.ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
  const [user, setUser] = useAtom(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsLoading(false);
      if (!user) setUser(null);
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [setUser]);

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return !isLoading && element;
};

export default AuthenticationGuard;
