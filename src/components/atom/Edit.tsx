import { useCallback, useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { css } from '@emotion/react';
import { Pencil, ThreeDots, Trash } from 'emotion-icons/bootstrap';
import useClickOutside from '../../hooks/useClickOutside';

const editCss = {
  modal: css`
    position: absolute;
    top: 14px;
    right: 0;
    width: 70px;
    border-radius: 5px;
    box-shadow: 1px 2px 5px 2px var(--shadow);
    background-color: var(--white);
  `,
  button: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 15px 5px 10px;
    border-radius: 10px;
    text-align: left;
    font-size: 13px;
  `,
};

interface EditProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  remove: () => void;
}

const Edit = ({ setIsEdit, remove }: EditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(useCallback(() => setIsOpen(false), []));

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };
  const handleEdit = () => {
    setIsEdit(true);
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      <button aria-label="Edit-button" onClick={handleClickMenuButton}>
        <ThreeDots size="16px" />
      </button>
      {isOpen && (
        <div css={editCss.modal} ref={ref}>
          <button css={editCss.button} onClick={handleEdit}>
            <Pencil size="12px" />
            {' 수정'}
          </button>
          <button css={editCss.button} onClick={remove}>
            <Trash size="12px" />
            {' 삭제'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Edit;
