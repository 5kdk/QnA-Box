import { css } from '@emotion/react';
import { Flex, Title } from '../atom';
import { BoxForm } from '../molecules';

const tmpData = {
  displayName: 'minjae3',
};

const createBoxCss = {
  wrapper: css`
    padding: 92px 40px;
    gap: 48px;
  `,
};

const CreateBox = () => {
  return (
    <Flex css={createBoxCss.wrapper} flexDirection="column" justifyContent="center" alignItems="center">
      <Title text="QA Box 만들기" />
      <BoxForm
        defaultValues={{ owner: tmpData.displayName, closed: false, anonymous: true }}
        btnOpt={{ text: '등록하기', color: 'var(--white)', bgColor: 'var(--blue)' }}
        submitFunc={() => {}}
      />
    </Flex>
  );
};

export default CreateBox;
