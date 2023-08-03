import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import Flex from '../atom/Flex';

interface InputType {
  text: string;
  type: string;
  width?: string;
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ text, type, width, input, handleInput, ...rest }: InputType) => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" {...rest}>
      <label css={textstyle}>{text}</label>
      <input css={inputstyle(width)} type={type} onChange={handleInput} value={input}></input>
    </Flex>
  );
};

export default Input;

const textstyle = css`
  font-weight: 600;
  color: #595959;
`;
const inputstyle = (props?: string) =>
  css({
    marginTop: '10px',
    fontWeight: 'bold',
    width: props || '100%',
    border: 'none',
    borderBottom: '2px solid #595959',
    lineHeight: '25px',
    fontSize: '1rem',
    ':focus': {
      outline: 'none',
    },
  });
