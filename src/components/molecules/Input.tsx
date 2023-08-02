import { css } from '@emotion/react';
import Flex from '../atom/Flex';
import { ChangeEvent } from 'react';

interface InputType {
  text: string;
  type: string;
  width: string;
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ text, type, width, input, handleInput }: InputType) => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
      <div css={textstyle}>{text}</div>
      <input css={inputstyle2(width)} type={type} onChange={handleInput} value={input}></input>
    </Flex>
  );
};

export default Input;

const textstyle = css`
  font-weight: 600;
  color: #595959;
`;
const inputstyle2 = (props: string) =>
  css({
    marginTop: '20px',
    width: props,
    border: 'none',
    borderBottom: '2px solid #595959',
    lineHeight: '25px',
    fontSize: '1rem',
    opacity: '0.7',
    ':focus': {
      outline: 'none',
    },
  });
