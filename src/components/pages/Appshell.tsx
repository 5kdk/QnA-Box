import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Header } from '../molecules';
import { Notification } from '../atom';
import { useSetAtom } from 'jotai';
import { userState } from '../../jotai/atom';
import { getMyProfile } from '../../services/profile';

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
    const getUser = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [params, setUser]);

  return (
    <div css={appShellCss.wrapper}>
      <Notification />
      <Header />
      <main css={appShellCss.main}>{isLoading || <Outlet />}</main>
    </div>
  );
};

export default Appshell;
