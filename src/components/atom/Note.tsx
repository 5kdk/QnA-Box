import { css } from '@emotion/react';

const style = ({ fs }: { fs?: string }) => css`
  color: #515254;
  font-size: ${fs || '1rem'};
`;

interface NoteProps {
  text: string;
  fs?: string;
  onClick: () => void;
}
const Note = ({ text, fs, onClick }: NoteProps) => {
  return (
    <button css={style({ fs })} onClick={onClick}>
      {text}
    </button>
  );
};

export default Note;
