import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { Header } from '../molecules';

const appShellCss = {
  wrapper: css`
    width: 448px;
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
      <Header />
      <main css={appShellCss.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Appshell;
