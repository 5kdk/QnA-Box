import { Flex } from '../atom';
import { modalCss } from '../../styles';
import { BoxForm } from '../molecules';
import { css } from '@emotion/react';

const editBoxCss = {
  wrapper: css`
    width: var(--app_width);
    padding: 30px;
    background-color: var(--white);
    box-shadow: 0px -10px 10px 1px var(--shadow);
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

interface EditBoxProps {
  boxInfo: {
    name: string;
    owner: string;
    desc: string;
  };
  // closed: boolean;
  // anonymous: boolean;
  closeEdit: () => void;
}

const EditBox = ({ boxInfo, closeEdit }: EditBoxProps) => {
  return (
    <Flex css={modalCss} justifyContent="center" alignItems="flex-end" onClick={closeEdit}>
      <Flex css={editBoxCss.wrapper} justifyContent="center" onClick={e => e.stopPropagation()}>
        <BoxForm
          defaultValues={boxInfo}
          btnOpt={{ text: '수정하기', color: 'var(--white)', bgColor: 'var(--black)' }}
          submitFunc={() => {}}
        />
      </Flex>
    </Flex>
  );
};

export default EditBox;
