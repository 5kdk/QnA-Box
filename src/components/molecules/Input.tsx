import { css } from '@emotion/react';

const textstyle = css``;

const inputstyle = css``;

const Input = ({ text }: { text: string }) => {
  return (
    <>
      <div css={textstyle}>{text}</div>
      <input css={inputstyle}></input>
    </>
  );
};

export default Input;
