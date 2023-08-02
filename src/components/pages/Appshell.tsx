import { Outlet } from 'react-router-dom';
import Header from '../molecules/Header';
import { css } from '@emotion/react';

const wrapperStyle = css({
  width: '28rem',
  margin: '0 auto',
});

const style = css({
  minHeight: 'calc(100vh - 56px)',
  backgroundColor: '#fff',
});

const Appshell = () => {
  return (
    <div css={wrapperStyle}>
      <Header />
      <main css={style}>
        <Outlet />
      </main>
    </div>
  );
};

export default Appshell;
