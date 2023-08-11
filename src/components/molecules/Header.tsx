import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import { ChevronLeft } from '@emotion-icons/bootstrap';
import { Flex, Logo } from '../atom/';
import { SideNav } from './SideNav';
import { sideNavState } from '../../jotai/atom';

const HeaderCss = {
  wrapperStyle: (isRoot: boolean) => css`
    position: fixed;
    z-index: 990;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--app_width);
    padding: 10px;
    background-color: ${isRoot ? 'var(--black)' : 'var(--white)'};
  `,
  buttonStyle: css`
    height: 36px;
  `,
  LogoStyle: css`
    margin-top: 5px;
    cursor: pointer;
  `,
  iconStyle: (isopen: boolean, isRoot: boolean) => css`
    position: relative;
    display: flex;
    width: 22px;
    height: 2px;
    background-color: ${isopen ? 'transparent' : isRoot ? 'var(--white)' : 'var(--black)'};
    border-radius: 1px;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: ${!isopen ? '-5px' : undefined};
      width: 22px;
      height: 2px;
      border-radius: 1px;
      background-color: ${isRoot ? 'var(--white)' : 'var(--black)'};
      transform: ${isopen ? 'rotate(-45deg)' : undefined};
      transition: top, transform;
      transition-duration: 0.1s;
      transition-timing-function: ease-in-out;
    }
    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: ${!isopen ? '5px' : undefined};
      width: 22px;
      height: 2px;
      background-color: ${isRoot ? 'var(--white)' : 'var(--black)'};
      transform: ${isopen ? 'rotate(45deg)' : undefined};
      transition: top, transform;
      transition-duration: 0.1s;
      transition-timing-function: ease-in-out;
      border-radius: 1px;
    }
  `,
};

const Header = () => {
  const [isOpen, setIsOpen] = useAtom(sideNavState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isRoot = pathname === '/';
  const logoDisplay = !isRoot && !pathname.includes('sign');

  const handleBackButtonClick = () => {
    navigate(-1);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleBurgerClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <Flex css={HeaderCss.wrapperStyle(isRoot)} justifyContent="space-between" alignItems="center">
      <button aria-label="GotoBack-button" css={HeaderCss.buttonStyle} onClick={handleBackButtonClick}>
        <ChevronLeft size="22px" color={isRoot ? 'white' : undefined} />
      </button>
      {logoDisplay && <Logo size="sm" css={HeaderCss.LogoStyle} onClick={handleLogoClick} />}
      <Flex>
        <button aria-label="Info-button" css={HeaderCss.buttonStyle} onClick={handleBurgerClick}>
          <i css={HeaderCss.iconStyle(isOpen, isRoot)}></i>
        </button>
      </Flex>
      <SideNav isOpen={isOpen} />
    </Flex>
  );
};

export default Header;
