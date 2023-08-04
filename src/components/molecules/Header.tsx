import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import { ChevronLeft } from '@emotion-icons/bootstrap';
import { Flex, Logo } from '../atom/';
import { SideNav } from './SideNav';
import sideNavState from '../../jotai/atom/sideNavState';

const HeaderCss = {
  wrapperStyle: css`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--app_width);
    padding: 10px;
    background-color: var(--white);
  `,
  buttonStyle: css`
    height: 36px;
  `,
  LogoStyle: css`
    margin-top: 5px;
    cursor: pointer;
  `,
  iconStyle: (isopen: boolean) => css`
    position: relative;
    display: flex;
    width: 22px;
    height: 2px;
    background-color: ${isopen ? 'transparent' : 'var(--black)'};
    border-radius: 1px;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: ${!isopen ? '-5px' : undefined};
      width: 22px;
      height: 2px;
      border-radius: 1px;
      background-color: var(--black);
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
      background-color: var(--black);
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
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleBurgerClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <Flex css={HeaderCss.wrapperStyle} justifyContent="space-between" alignItems="center">
      <button css={HeaderCss.buttonStyle} onClick={handleBackButtonClick}>
        <ChevronLeft size="22px" />
      </button>
      <Logo size="sm" css={HeaderCss.LogoStyle} onClick={handleLogoClick} />
      <Flex>
        <button css={HeaderCss.buttonStyle} onClick={handleBurgerClick}>
          <i css={HeaderCss.iconStyle(isOpen)}></i>
        </button>
      </Flex>
      <SideNav isOpen={isOpen} />
    </Flex>
  );
};

export default Header;
