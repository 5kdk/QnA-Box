import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import { ChevronLeft } from '@emotion-icons/bootstrap';
import Flex from '../atom/Flex';
import Logo from '../atom/Logo';
import sideNavState from '../../jotai/atom/sideNavState';
import { useNavigate } from 'react-router-dom';

const wrapperStyle = css({
  padding: '10px',
  backgroundColor: '#fff',
});

const icoStyle = (isopen: boolean) =>
  css({
    display: 'flex',
    width: '22px',
    height: '2px',
    backgroundColor: isopen ? 'transparent' : 'black',
    position: 'relative',
    borderRadius: '1px',

    '&::before': {
      position: 'absolute',
      content: '""',
      left: '0',
      top: !isopen ? '-5px' : undefined,
      width: '22px',
      height: '2px',
      backgroundColor: 'black',
      transform: isopen ? 'rotate(-45deg)' : undefined,
      transition: 'top, transform',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-in-out',
      borderRadius: '1px',
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      left: '0',
      top: !isopen ? '5px' : undefined,
      width: '22px',
      height: '2px',
      backgroundColor: 'black',
      transform: isopen ? 'rotate(45deg)' : undefined,
      transition: 'top, transform',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-in-out',
      borderRadius: '1px',
    },
  });

const buttonStyle = css({
  height: '36px',
});

const LogoStyle = css({ marginTop: '5px', cursor: 'pointer' });

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
    <Flex css={wrapperStyle} justifyContent="space-between" alignItems="center">
      <button css={buttonStyle} onClick={handleBackButtonClick}>
        <ChevronLeft size="22px" />
      </button>
      <Logo size="sm" css={LogoStyle} onClick={handleLogoClick} />
      <Flex>
        <button css={buttonStyle} onClick={handleBurgerClick}>
          <i css={icoStyle(isOpen)}></i>
        </button>
      </Flex>
    </Flex>
  );
};

export default Header;
