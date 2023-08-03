import { css } from '@emotion/react';

const textCss = css`
  font-size: 14px;
`;

interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <p css={textCss}>{children}</p>;
};

export default Text;
