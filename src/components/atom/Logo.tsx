import { css } from '@emotion/react';
import MainLogo from '../../assets/qa-logo.svg';
import ReverseLogo from '../../assets/qa-logo-white.svg';
import { Flex } from './';

const LogoCss = {
  xlarge: css`
    width: 120px;
  `,
  large: css`
    width: 93px;
  `,
  small: css`
    width: 36px;
  `,
};

interface LogoProps {
  size: 'xl' | 'lg' | 'sm';
  reverse?: boolean;
  onClick?: () => void;
}

const Logo = ({ size, reverse, ...rest }: LogoProps) => {
  return (
    <Flex css={size === 'xl' ? LogoCss.xlarge : size === 'lg' ? LogoCss.large : LogoCss.small} {...rest}>
      <img src={reverse ? ReverseLogo : MainLogo} alt="로고 이미지" />
    </Flex>
  );
};

export default Logo;
