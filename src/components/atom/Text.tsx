import { css } from '@emotion/react';

const textCss = css`
  font-size: 14px;
`;

interface TextProps {
  text: string | undefined;
}

const Text = ({ text, ...rest }: TextProps) => {
  return (
    <p css={textCss} {...rest}>
      {text && text}
    </p>
  );
};

export default Text;
