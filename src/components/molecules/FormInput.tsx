import { css } from '@emotion/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Flex } from '../atom/';

const InputCss = {
  textstyle: css`
    width: 100%;
    font-weight: 600;
    color: var(--deep_gray);
  `,
  inputstyle: css`
    margin-top: 10px;
    width: 100%;
    font-weight: bold;
    border: none;
    border-bottom: 1.5px solid var(--deep_gray);
    line-height: 25px;
    font-size: 16px;
    :focus {
      outline: none;
    }
  `,
};

interface InputType {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
}

const FormInput = ({ label, type, register, ...rest }: InputType) => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" {...rest}>
      <label css={InputCss.textstyle}>
        {label}
        <input css={InputCss.inputstyle} type={type} {...register}></input>
      </label>
    </Flex>
  );
};

export default FormInput;
