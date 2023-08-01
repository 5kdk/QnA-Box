import { css, keyframes } from '@emotion/react';
import loading from '../../assets/images/loading.png';

const bounce = keyframes`
  0% {
    transform : rotate(0deg)
  }

  100% {
    transform : rotate(360deg)
  }
`;

const loadingCss = (props: LoadingProps) =>
  css({
    width: props.size || '5rem',
    animation: `${bounce} 1.5s infinite linear`,
  });

interface LoadingProps {
  size?: string;
}

const Loading = ({ size }: LoadingProps) => {
  return <img css={loadingCss({ size })} src={loading} alt="loading" />;
};
export default Loading;
