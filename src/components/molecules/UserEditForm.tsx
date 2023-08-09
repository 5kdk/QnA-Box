import { DefaultValues, FieldValues, Path, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@emotion/react';
import { Flex, Notification, WideButton } from '../atom';
import { FormInput } from '../molecules';
import requiredFormValue from '../../utils/requiredFormValue';

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

interface UserEditFormProps<T> {
  formElement: {
    text: string;
    key: string;
    type: string;
  }[];
  iniForm?: DefaultValues<T>;
  formSchema?: ZodType<T>;
  btnSettings: {
    text: string;
    color: string;
    bgColor: string;
    borderColor?: string;
  };
  submitFunc: (data: T) => void;
}

const UserEditForm = <T extends FieldValues>({
  formElement,
  iniForm,
  formSchema,
  btnSettings,
  submitFunc,
}: UserEditFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: formSchema && zodResolver(formSchema),
    defaultValues: iniForm && iniForm,
  });

  return (
    <>
      <Notification errors={errors} />
      <form css={userEditFormCss.form} onSubmit={handleSubmit(submitFunc)}>
        <Flex css={userEditFormCss.account} flexDirection="column">
          {formElement.map(({ text, key, type }) => (
            <FormInput
              key={key}
              label={text}
              type={type}
              register={register(key as Path<T>, requiredFormValue(text))}
            />
          ))}
        </Flex>
        <WideButton {...btnSettings} onClick={() => {}} />
      </form>
    </>
  );
};

export default UserEditForm;
