import { css } from '@emotion/react';
import MainLogo from '../../assets/qa-logo.svg';

const large = css({
  width: '93px',
});
const small = css({
  width: '36px',
});

interface LogoProps {
  size: 'lg' | 'sm';
}

const Logo = ({ size, ...rest }: LogoProps) => {
  return (
    <div css={size === 'lg' ? large : small} {...rest}>
      <img src={MainLogo} alt="로고 이미지" />
    </div>
  );
};

export default Logo;
