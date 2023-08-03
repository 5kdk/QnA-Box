import { css } from '@emotion/react';
import MainLogo from '../../assets/qa-logo.svg';
import Flex from './Flex';

const LogoCss = {
  large: css`
    width: 93px;
  `,
  small: css`
    width: 36px;
  `,
};

interface LogoProps {
  size: 'lg' | 'sm';
  onClick?: () => void;
}

const Logo = ({ size, ...rest }: LogoProps) => {
  return (
    <Flex css={size === 'lg' ? LogoCss.large : LogoCss.small} {...rest}>
      <img src={MainLogo} alt="로고 이미지" />
    </Flex>
  );
};

export default Logo;
