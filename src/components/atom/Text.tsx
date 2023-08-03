import { css } from '@emotion/react';

const textStyle = css`
  font-size: 14px;
`;

interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <p css={textStyle}>{children}</p>;
};

export default Text;
