import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Notification } from '../components/atom';
import { Header } from '../components/molecules';
import { userState } from '../jotai/atom';
import { getLocalStorage } from '../utils/localStorage';
import { getProfile } from '../services/profile';

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
    const uid = getLocalStorage('uid');
    if (uid) {
      const getUser = async () => {
        try {
          setLoading(true);
          const data = await getProfile(uid);
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
      setLoading(false);
      setUser(null);
    }
  }, [params, setUser]);

  return (
    <div css={appShellCss.wrapper}>
      <Notification />
      <Header />
      <main css={appShellCss.main}>{!isLoading && <Outlet />}</main>
    </div>
  );
};

export default Appshell;
