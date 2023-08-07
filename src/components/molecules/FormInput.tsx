import { css } from '@emotion/react';
import { Flex } from '../atom/';
import { UseFormRegister } from 'react-hook-form';

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
    border-bottom: 2px solid var(--deep_gray);
    line-height: 25px;
    font-size: 16px;
    :focus {
      outline: none;
    }
  `,
};

interface IFormValues {
  [key: string]: string;
  email: string;
  password: string;
}
interface InputType {
  label: string;
  formKey: string;
  type: string;
  register: UseFormRegister<IFormValues>;
}

const FormInput = ({ label, formKey, type, register, ...rest }: InputType) => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" {...rest}>
      <label css={InputCss.textstyle}>
        {label}
        <input css={InputCss.inputstyle} type={type} {...register(formKey)}></input>
      </label>
    </Flex>
  );
};

export default FormInput;
