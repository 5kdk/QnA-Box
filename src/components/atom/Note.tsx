import { css } from '@emotion/react';

const style = ({ fs }: { fs?: string }) => css`
  color: var(--deep_gray);
  font-size: ${fs || '16px'};
`;

interface NoteProps {
  text: string;
  fs?: string;
  onClick: () => void;
}
const Note = ({ text, fs, onClick, ...rest }: NoteProps) => {
  return (
    <button css={style({ fs })} {...rest} onClick={onClick}>
      {text}
    </button>
  );
};

export default Note;
