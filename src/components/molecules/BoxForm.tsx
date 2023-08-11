import { DefaultValues, SubmitHandler } from 'react-hook-form';
import { css } from '@emotion/react';
import { Flex, FormToggler, WideButton } from '../atom';
import { FormInput } from '../molecules';
import useCustomForm from '../../hooks/useCustomForm';
import { requiredFormValue } from '../../utils';
import { FormElement } from '../../services/boxes';

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

interface BoxFormProps {
  submitFunc: SubmitHandler<FormElement>;
  defaultValues: DefaultValues<FormElement>;
  btnOpt: {
    text: string;
    color: string;
    bgColor: string;
  };
}

const BoxForm = ({ submitFunc, defaultValues, btnOpt }: BoxFormProps) => {
  const { registerKey, onSubmit, watch } = useCustomForm<FormElement>(submitFunc, defaultValues);

  return (
    <Flex css={boxFormCss.wrapper} flexDirection="column">
      <form css={boxFormCss.form} onSubmit={onSubmit}>
        <Flex css={boxFormCss.inputs} flexDirection="column">
          <FormInput label="Title" type="text" register={registerKey('title', requiredFormValue('Title'))} />
          <FormInput label="Owner" type="text" register={registerKey('owner', requiredFormValue('Owner'))} />
          <FormInput
            label="Description"
            type="text"
            register={registerKey('description', requiredFormValue('Description'))}
          />
        </Flex>
        <Flex css={boxFormCss.toggles} flexDirection="column">
          <FormToggler selected={watch('activation')} text="질문 기능 비활성화" register={registerKey('activation')} />
          <FormToggler
            selected={watch('anonymous')}
            text="익명 질문을 허용합니다."
            register={registerKey('anonymous')}
          />
        </Flex>
        <WideButton {...btnOpt} onClick={() => {}} />
      </form>
    </Flex>
  );
};

export default BoxForm;
