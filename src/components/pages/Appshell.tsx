import { Outlet } from 'react-router-dom';
import Header from '../molecules/Header';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import sideNavState from '../../jotai/atom/sideNavState';
import SideNav from '../molecules/SideNav/SideNav';

const wrapperStyle = css({
  width: '28rem',
  margin: '0 auto',
});

const style = css({
  minHeight: 'calc(100vh - 56px)',
  backgroundColor: '#fff',
});

const Appshell = () => {
  const isOpen = useAtomValue(sideNavState);
  return (
    <div css={wrapperStyle}>
      <Header />
      <main css={style}>
        {isOpen ? <SideNav /> : null}
        <Outlet />
      </main>
    </div>
  );
};

export default Appshell;
