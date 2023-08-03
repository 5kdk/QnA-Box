import { css } from '@emotion/react';

const TitleCss = {
  TitleStyle: css`
    font-size: 25px;
    font-weight: 700;
  `,
};

const Title = ({ text }: { text: string }) => {
  return <div css={TitleCss.TitleStyle}>{text}</div>;
};

export default Title;
