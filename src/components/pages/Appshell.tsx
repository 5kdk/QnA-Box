import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { Header } from '../molecules';
import { Notification } from '../atom';

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
  return (
    <div css={appShellCss.wrapper}>
      <Notification />
      <Header />
      <main css={appShellCss.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Appshell;
