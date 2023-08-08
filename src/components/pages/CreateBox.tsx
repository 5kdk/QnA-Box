import { useEffect } from 'react';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Flex, FormToggler, Notification, Title, WideButton } from '../atom';
import { FormInput } from '../molecules';

const tmpData = {
  name: 'minjae3',
};

const createBoxCss = {
  wrapper: css`
    padding: 92px 40px;
    gap: 48px;
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

const CreateBox = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormElement>({
    defaultValues: {
      owner: tmpData.name,
    },
  });
  const onSubmit: SubmitHandler<FormElement> = data => {
    // const { name, owner, desc } = data;
    // if (name && owner && desc) {
    console.log({ ...data });
    // }
  };

  useEffect(() => {
    if (tmpData) {
      setValue('owner', tmpData.name);
    }
  }, [tmpData, setValue]);

  return (
    <Flex css={createBoxCss.wrapper} flexDirection="column" justifyContent="center" alignItems="center">
      <Notification errors={errors} />
      <Title text="QA Box 만들기" />
      <form css={createBoxCss.form} onSubmit={handleSubmit(onSubmit)}>
        <Flex css={createBoxCss.inputs} flexDirection="column">
          <FormInput label="Name" type="text" register={register('name' as Path<FormElement>, { required: true })} />
          <FormInput label="Owner" type="text" register={register('owner' as Path<FormElement>, { required: true })} />
          <FormInput
            label="Description"
            type="text"
            register={register('desc' as Path<FormElement>, { required: true })}
          />
        </Flex>
        <Flex css={createBoxCss.toggles} flexDirection="column">
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
        <WideButton text="등록하기" color="var(--white)" bgColor="var(--blue)" onClick={() => {}} />
      </form>
    </Flex>
  );
};

export default CreateBox;
