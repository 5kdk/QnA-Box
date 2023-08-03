import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { Header } from '../molecules';
import { SideNav } from '../molecules/SideNav';
import sideNavState from '../../jotai/atom/sideNavState';

const appShellCss = {
  wrapper: css`
    width: 448px;
    margin: 0 auto;
  `,
  main: css`
    min-height: calc(100vh - 56px);
    background-color: var(--white);
  `,
};

const Appshell = () => {
  const isOpen = useAtomValue(sideNavState);
  return (
    <div css={appShellCss.wrapper}>
      <Header />
      <main css={appShellCss.main}>
        {isOpen ? <SideNav /> : null}
        <Outlet />
      </main>
    </div>
  );
};

export default Appshell;
