import { DefaultValues, FieldValues, SubmitHandler } from 'react-hook-form';
import { ZodType } from 'zod';
import { css } from '@emotion/react';
import { Flex, WideButton } from '../atom';
import { FormInput } from '../molecules';
import useCustomForm from '../../hooks/useCustomForm';
import { requiredFormValue } from '../../utils';

const userEditFormCss = {
  form: css`
    display: flex;
    flex-direction: column;
    gap: 48px;
  `,
  account: css`
    gap: 22px;
  `,
};

interface UserEditFormProps<T extends FieldValues> {
  submitFunc: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  formSchema?: ZodType<T>;
  formElement: {
    text: string;
    key: string;
    type: string;
  }[];
  btnSettings: {
    text: string;
    color: string;
    bgColor: string;
    borderColor?: string;
  };
}

const UserEditForm = <T extends FieldValues>({
  submitFunc,
  defaultValues,
  formSchema,
  formElement,
  btnSettings,
}: UserEditFormProps<T>) => {
  const { registerKey, onSubmit } = useCustomForm<T>(submitFunc, defaultValues, formSchema);

  return (
    <>
      <form css={userEditFormCss.form} onSubmit={onSubmit}>
        <Flex css={userEditFormCss.account} flexDirection="column">
          {formElement.map(({ text, key, type }) => (
            <FormInput key={key} label={text} type={type} register={registerKey(key, requiredFormValue(text))} />
          ))}
        </Flex>
        <WideButton {...btnSettings} onClick={() => {}} />
      </form>
    </>
  );
};

export default UserEditForm;
