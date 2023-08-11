import { css } from '@emotion/react';

const TitleCss = {
  TitleStyle: css`
    font-size: 25px;
    font-weight: 700;
  `,
};

const Title = ({ text, ...rest }: { text: string | undefined }) => {
  return (
    <div css={TitleCss.TitleStyle} {...rest}>
      {text && text}
    </div>
  );
};

export default Title;
