import { css, keyframes } from '@emotion/react';
import loading from '../../assets/images/loading.png';

const loadingCss = {
  bounce: keyframes`
    0% {
      transform : rotate(0deg)
    }
    100% {
      transform : rotate(360deg)
    }
  `,
  loading: (props: LoadingProps) => css`
    width: ${props.size || '80px'};
    animation: ${loadingCss.bounce} 1.5s infinite linear;
  `,
};

interface LoadingProps {
  size?: string;
}

const Loading = ({ size }: LoadingProps) => {
  return <img css={loadingCss.loading({ size })} src={loading} alt="loading" />;
};
export default Loading;
