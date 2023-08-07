import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import userState from '../jotai/atom/userState';
import { auth } from '../services/firebase';
import { Flex, Loading } from '../components/atom';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: React.ReactNode;
}

const KEY = 'firebaseUser';

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
  const [user, setUser] = useAtom(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        localStorage.setItem(KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(KEY);
      }
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [setUser]);

  if (isLoading) {
    return (
      <Flex alignItems="center">
        <Loading />
      </Flex>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default AuthenticationGuard;
