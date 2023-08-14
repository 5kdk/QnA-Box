import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Notification } from '../components/atom';
import { Header } from '../components/molecules';
import { userState } from '../jotai/atom';
import { getProfile } from '../services/profile';
import { auth } from '../services/firebase';

const appShellCss = {
  wrapper: css`
    width: var(--app_width);
    margin: 0 auto;
    padding-top: 56px;
  `,
  main: css`
    min-height: calc(100vh - 56px);
    background-color: var(--white);
  `,
};

const Appshell = () => {
  const [isLoading, setLoading] = useState(true);
  const setUser = useSetAtom(userState);
  const params = useParams();

  useEffect(() => {
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
  }, [setUser, params]);

  return (
    <div css={appShellCss.wrapper}>
      <Notification />
      <Header />
      <main css={appShellCss.main}>{!isLoading && <Outlet />}</main>
    </div>
  );
};

export default Appshell;
