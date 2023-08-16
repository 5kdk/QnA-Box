import { Flex } from '../atom';
import { modalCss } from '../../styles';
import { BoxForm } from '../molecules';
import { css } from '@emotion/react';
import { useUpdateMyBoxMutation } from '../../hooks/mutation';
import { Box, FormElement } from '../../services/boxes';
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
  boxInfo: Box;
  closeEdit: () => void;
}

const EditBox = ({ boxInfo, closeEdit }: EditBoxProps) => {
  const { mutate: update } = useUpdateMyBoxMutation();
  const globalWidth = useAtomValue(globalWidthState);
  const defaultForm = () => {
    const defaultVal: Partial<Box> = { ...boxInfo };
    delete defaultVal.boxId;
    delete defaultVal.createdAt;
    return defaultVal as FormElement;
  };
  const editBox = (formData: FormElement) => update({ boxId: boxInfo.boxId, editFormData: formData });

  return (
    <Flex css={modalCss} justifyContent="center" alignItems="flex-end" onClick={closeEdit}>
      <Flex css={editBoxCss.wrapper(globalWidth)} justifyContent="center" onClick={e => e.stopPropagation()}>
        <BoxForm
          defaultValues={defaultForm()}
          btnOpt={{ text: '수정하기', color: 'var(--white)', bgColor: 'var(--black)' }}
          closeEdit={closeEdit}
          submitFunc={editBox}
        />
      </Flex>
    </Flex>
  );
};

export default EditBox;
