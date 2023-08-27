import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Notification } from '../components/atom';
import { Header } from '../components/molecules';
import { userState, globalWidthState } from '../jotai/atom';
import { getProfile } from '../services/profile';
import { auth } from '../services/firebase';

const appShellCss = {
  wrapper: css`
    max-width: var(--max_app_width);
    min-width: var(--min_app_width);
    margin: 0 auto;
    padding-top: 56px;
    overflow: hidden;
  `,
  main: (bgBlack: boolean) => css`
    min-height: calc(100vh - 56px);
    background-color: ${bgBlack ? 'var(--black)' : 'var(--white)'};
  `,
};

const Appshell = () => {
  const [isLoading, setLoading] = useState(true);
  const setGlobalWidth = useSetAtom(globalWidthState);
  const appShellRef = useRef<HTMLDivElement>(null);

  const setUser = useSetAtom(userState);
  const { pathname } = useLocation();

  useEffect(() => {
    if (appShellRef.current) {
      setGlobalWidth(`${appShellRef.current.clientWidth}px`);
    }
  }, [setGlobalWidth]);

  useEffect(() => {
    if (pathname === '/') {
      setLoading(false);
    }

    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        const getUser = async () => {
          try {
            const data = await getProfile(user.uid);
            if (data) setUser(data);
          } catch (err) {
            console.log(err);
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
  }, [setUser, pathname]);

  return (
    <div ref={appShellRef} css={appShellCss.wrapper}>
      <Notification />
      <Header />
      <main css={appShellCss.main(pathname === '/')}>{!isLoading && <Outlet />}</main>
    </div>
  );
};

export default Appshell;
