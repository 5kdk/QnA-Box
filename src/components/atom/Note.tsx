import { css } from '@emotion/react';

const style = css`
  color: #515254;
  font-size: 0.7rem;
  opacity: 0.5;
`;

const Note = ({ text }: { text: string }) => {
  return <div css={style}>{text}</div>;
};

export default Note;
