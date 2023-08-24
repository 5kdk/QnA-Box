import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Notification } from '../components/atom';
import { Header } from '../components/molecules';
import { globalWidthState } from '../jotai/atom';

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
  const setGlobalWidth = useSetAtom(globalWidthState);
  const appShellRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (appShellRef.current) {
      setGlobalWidth(`${appShellRef.current.clientWidth}px`);
    }
  }, [setGlobalWidth]);

  return (
    <div ref={appShellRef} css={appShellCss.wrapper}>
      <Notification />
      <Header />
      <main css={appShellCss.main(pathname === '/')}>{<Outlet />}</main>
    </div>
  );
};

export default Appshell;
