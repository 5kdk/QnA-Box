import { useEffect } from 'react';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Flex, FormToggler, WideButton } from '../atom';
import { FormInput } from '../molecules';
import { toastErrorState } from '../../jotai/atom';
import { errorObjToString, requiredFormValue } from '../../utils';

const boxFormCss = {
  wrapper: css`
    background-color: var(--white);
  `,
  form: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 32px;
  `,
  inputs: css`
    gap: 16px;
  `,
  toggles: css`
    gap: 12px;
  `,
};

interface FormElement {
  [key: string]: boolean | string;
  title: string;
  owner: string;
  description: string;
  activation: boolean;
  anonymous: boolean;
}

interface BoxFormProps {
  defaultValues: {
    title?: string;
    owner: string;
    description?: string;
    activation: boolean;
    anonymous: boolean;
  };
  btnOpt: {
    text: string;
    color: string;
    bgColor: string;
  };
  submitFunc: (data: FormElement) => void;
}

const BoxForm = ({ defaultValues, btnOpt, submitFunc }: BoxFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormElement>({
    defaultValues,
  });
  const setToastError = useSetAtom(toastErrorState);
  const onSubmit: SubmitHandler<FormElement> = data => {
    submitFunc(data);
    console.log({ ...data });
  };

  useEffect(() => {
    if (errors) setToastError(errorObjToString(errors));
  }, [errors, setToastError]);

  return (
    <Flex css={boxFormCss.wrapper} flexDirection="column">
      <form css={boxFormCss.form} onSubmit={handleSubmit(onSubmit)}>
        <Flex css={boxFormCss.inputs} flexDirection="column">
          <FormInput
            label="Title"
            type="text"
            register={register('title' as Path<FormElement>, requiredFormValue('Title'))}
          />
          <FormInput
            label="Owner"
            type="text"
            register={register('owner' as Path<FormElement>, requiredFormValue('Owner'))}
          />
          <FormInput
            label="Description"
            type="text"
            register={register('description' as Path<FormElement>, requiredFormValue('Description'))}
          />
        </Flex>
        <Flex css={boxFormCss.toggles} flexDirection="column">
          <FormToggler
            selected={watch('activation')}
            text="질문 기능 비활성화"
            register={register('activation' as Path<FormElement>)}
          />
          <FormToggler
            selected={watch('anonymous')}
            text="익명 질문을 허용합니다."
            register={register('anonymous' as Path<FormElement>)}
          />
        </Flex>
        <WideButton {...btnOpt} onClick={() => {}} />
      </form>
    </Flex>
  );
};

export default BoxForm;
