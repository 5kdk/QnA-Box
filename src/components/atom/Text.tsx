import { css } from '@emotion/react';

const textCss = css`
  font-size: 14px;
`;

interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children, ...rest }: TextProps) => {
  return (
    <p css={textCss} {...rest}>
      {children}
    </p>
  );
};

export default Text;
