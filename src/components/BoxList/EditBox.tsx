import { Flex } from '../atom';
import { modalCss } from '../../styles';
import { BoxForm } from '../molecules';
import { css } from '@emotion/react';
import { useUpdateMyBoxMutation } from '../../hooks/mutation';
import { FormElement } from '../../services/boxes';
import { globalWidthState } from '../../jotai/atom';
import { useAtomValue } from 'jotai';

const editBoxCss = {
  wrapper: (globalWidth: string) => css`
    width: ${globalWidth};
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
  boxInfo: FormElement;
  closeEdit: () => void;
}

const EditBox = ({ boxId, boxInfo, closeEdit }: EditBoxProps) => {
  const { mutate: update } = useUpdateMyBoxMutation();
  const globalWidth = useAtomValue(globalWidthState);

  return (
    <Flex css={modalCss} justifyContent="center" alignItems="flex-end" onClick={closeEdit}>
      <Flex css={editBoxCss.wrapper(globalWidth)} justifyContent="center" onClick={e => e.stopPropagation()}>
        <BoxForm
          defaultValues={boxInfo}
          btnOpt={{ text: '수정하기', color: 'var(--white)', bgColor: 'var(--black)' }}
          closeEdit={closeEdit}
          submitFunc={formData => update({ boxId: boxId, editFormData: formData })}
        />
      </Flex>
    </Flex>
  );
};

export default EditBox;
