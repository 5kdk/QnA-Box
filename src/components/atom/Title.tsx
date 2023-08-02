import { css } from '@emotion/react';

const style = css`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Title = ({ text }: { text: string }) => {
  return <div css={style}>{text}</div>;
};

export default Title;
