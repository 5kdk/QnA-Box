import { css } from '@emotion/react';

const TitleCss = {
  TitleStyle: css`
    font-size: 25px;
    font-weight: 700;
  `,
};

const Title = ({ text, ...rest }: { text: string }) => {
  return (
    <div css={TitleCss.TitleStyle} {...rest}>
      {text}
    </div>
  );
};

export default Title;
