import { css } from '@emotion/react';
import MainLogo from '../../assets/qa-logo.svg';
import Flex from './Flex';

interface LogoProps {
  size: 'lg' | 'sm';
  onClick?: () => void;
}

const LogoCss = {
  large: css`
    width: 93px;
  `,
  small: css`
    width: 36px;
  `,
};

const Logo = ({ size, ...rest }: LogoProps) => {
  return (
    <Flex css={size === 'lg' ? LogoCss.large : LogoCss.small} {...rest}>
      <img src={MainLogo} alt="로고 이미지" />
    </Flex>
  );
};

export default Logo;
