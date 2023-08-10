import { Flex } from '../atom';
import { modalCss } from '../../styles';
import { BoxForm } from '../molecules';
import { css } from '@emotion/react';
import { useUpdateMyBoxMutation } from '../../hooks/mutation';

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
  boxId: string;
  boxInfo: {
    title: string;
    owner: string;
    description: string;
  };
  // closed: boolean;
  // anonymous: boolean;
  closeEdit: () => void;
}

const EditBox = ({ boxId, boxInfo, closeEdit }: EditBoxProps) => {
  const { mutate: update } = useUpdateMyBoxMutation();

  return (
    <Flex css={modalCss} justifyContent="center" alignItems="flex-end" onClick={closeEdit}>
      <Flex css={editBoxCss.wrapper} justifyContent="center" onClick={e => e.stopPropagation()}>
        <BoxForm
          defaultValues={boxInfo}
          btnOpt={{ text: '수정하기', color: 'var(--white)', bgColor: 'var(--black)' }}
          submitFunc={formData => update({ boxId: boxId, editFormData: formData })}
        />
      </Flex>
    </Flex>
  );
};

export default EditBox;
