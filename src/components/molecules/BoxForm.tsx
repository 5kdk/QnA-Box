import { Path, SubmitHandler, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Flex, FormToggler, Notification, WideButton } from '../atom';
import { FormInput } from '../molecules';

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
  name: string;
  owner: string;
  desc: string;
  closed: boolean;
  anonymous: boolean;
}

interface BoxFormProps {
  defaultValues: {
    name?: string;
    owner: string;
    desc?: string;
    closed?: boolean;
    anonymous?: boolean;
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
  const onSubmit: SubmitHandler<FormElement> = data => {
    // const { name, owner, desc } = data;
    // if (name && owner && desc) {
    submitFunc(data);
    console.log({ ...data });
    // }
  };

  return (
    <Flex css={boxFormCss.wrapper} flexDirection="column">
      <Notification errors={errors} />
      <form css={boxFormCss.form} onSubmit={handleSubmit(onSubmit)}>
        <Flex css={boxFormCss.inputs} flexDirection="column">
          <FormInput label="Name" type="text" register={register('name' as Path<FormElement>, { required: true })} />
          <FormInput label="Owner" type="text" register={register('owner' as Path<FormElement>, { required: true })} />
          <FormInput
            label="Description"
            type="text"
            register={register('desc' as Path<FormElement>, { required: true })}
          />
        </Flex>
        <Flex css={boxFormCss.toggles} flexDirection="column">
          <FormToggler
            selected={watch('closed')}
            text="질문 기능 비활성화"
            register={register('closed' as Path<FormElement>)}
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
