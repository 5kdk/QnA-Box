import { css } from '@emotion/react';
import MainLogo from '../../assets/qa-logo.svg';
import Flex from './Flex';

const large = css({
  width: '93px',
});

const small = css({
  width: '36px',
});

interface LogoProps {
  size: 'lg' | 'sm';
  onClick?: () => void;
}

const Logo = ({ size, ...rest }: LogoProps) => {
  return (
    <Flex css={size === 'lg' ? large : small} {...rest}>
      <img src={MainLogo} alt="로고 이미지" />
    </Flex>
  );
};

export default Logo;
