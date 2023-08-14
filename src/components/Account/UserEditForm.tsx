import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { DefaultValues, FieldValues, SubmitHandler } from 'react-hook-form';
import { ZodType } from 'zod';
import { css } from '@emotion/react';
import { Flex, WideButton } from '../atom';
import { FormInput } from '../molecules';
import useCustomForm from '../../hooks/useCustomForm';
import { requiredFormValue } from '../../utils';
import { useSetAtom } from 'jotai';
import { toastErrorState } from '../../jotai/atom';
import { ButtonProps } from '../atom/Button';

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
  submitFunc: (data: T) => Promise<void>;
  defaultValues?: DefaultValues<T>;
  formSchema?: ZodType<T>;
  onMutate?: (data: T) => void;
  formElement: {
    text: string;
    key: string;
    type: string;
  }[];
  btnSettings: ButtonProps;
}

const UserEditForm = <T extends FieldValues>({
  submitFunc,
  defaultValues,
  formSchema,
  onMutate,
  formElement,
  btnSettings,
}: UserEditFormProps<T>) => {
  const { registerKey, handleSubmit } = useCustomForm<T>(defaultValues, formSchema);
  const setToastError = useSetAtom(toastErrorState);
  const navigate = useNavigate();
  const { mutate: editUserInfo } = useMutation({
    mutationFn: submitFunc,
    onSettled: () => navigate('/account'),
    onError: (err: Error) => setToastError([err.message]),
    onMutate,
  });

  return (
    <>
      <form css={userEditFormCss.form} onSubmit={handleSubmit(editUserInfo as SubmitHandler<T>)}>
        <Flex css={userEditFormCss.account} flexDirection="column">
          {formElement.map(({ text, key, type }) => (
            <FormInput key={key} label={text} type={type} register={registerKey(key, requiredFormValue(text))} />
          ))}
        </Flex>
        <WideButton type="submit" {...btnSettings} />
      </form>
    </>
  );
};

export default UserEditForm;
