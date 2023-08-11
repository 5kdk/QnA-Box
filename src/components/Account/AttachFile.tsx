import { css } from '@emotion/react';
import { buttonCss, visuallyHidden } from '../../styles';
import { ChangeEvent } from 'react';

const attachCss = {
  btnProps: {
    color: 'var(--black)',
    bgColor: 'var(--white)',
    borderColor: 'var(--gray)',
  },
  button: css`
    cursor: pointer;
    font-size: 12px;
  `,
};

interface AttachProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const AttachFile = ({ onChange }: AttachProps) => {
  return (
    <label css={[buttonCss(attachCss.btnProps), attachCss.button]}>
      <input css={visuallyHidden} type="file" onChange={onChange} />
      이미지 수정
    </label>
  );
};

export default AttachFile;
