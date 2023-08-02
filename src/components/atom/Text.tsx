import { css } from '@emotion/react';

const textStyle = css({
  fontSize: '14px',
});

interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <p css={textStyle}>{children}</p>;
};

export default Text;
