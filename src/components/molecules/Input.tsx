import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Flex } from '../atom/';

const InputCss = {
  textstyle: css`
    width: 100%;
    font-weight: 600;
    color: var(--deep_gray);
  `,
  inputstyle: (props?: string) => {
    return css`
      margin-top: 10px;
      width: ${props || '100%'};
      font-weight: bold;
      border: none;
      border-bottom: 2px solid var(--deep_gray);
      line-height: 25px;
      font-size: 16px;
      :focus {
        outline: none;
      }
    `;
  },
};

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
      <label css={InputCss.textstyle}>
        {text}
        <input css={InputCss.inputstyle(width)} type={type} onChange={handleInput} value={input}></input>
      </label>
    </Flex>
  );
};

export default Input;
