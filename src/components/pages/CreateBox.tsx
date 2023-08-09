import { css } from '@emotion/react';
import { Flex, Title } from '../atom';
import { BoxForm } from '../molecules';
import { useAtomValue } from 'jotai';
import { userState } from '../../jotai/atom';
import { createQnaBox } from '../../services/boxes';
import { useNavigate } from 'react-router-dom';
import { FormElement } from '../molecules/BoxForm';

const createBoxCss = {
  wrapper: css`
    padding: 92px 40px;
    gap: 48px;
  `,
};

const CreateBox = () => {
  const user = useAtomValue(userState);
  const navigate = useNavigate();

  const handleSubmit = (formData: FormElement) => {
    createQnaBox(formData);
    navigate('/box');
  };

  return (
    <Flex css={createBoxCss.wrapper} flexDirection="column" justifyContent="center" alignItems="center">
      <Title text="QA Box 만들기" />
      <BoxForm
        defaultValues={{ owner: user.displayName, activation: false, anonymous: true }}
        btnOpt={{ text: '등록하기', color: 'var(--white)', bgColor: 'var(--blue)' }}
        submitFunc={handleSubmit}
      />
    </Flex>
  );
};

export default CreateBox;
