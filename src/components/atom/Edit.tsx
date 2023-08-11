import { useCallback, useState, MouseEvent } from 'react';
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
  edit: () => void;
  remove: () => void;
}

const Edit = ({ edit, remove }: EditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(useCallback(() => setIsOpen(false), []));

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleEditClick = () => {
    edit();
    setIsOpen(false);
  };

  const handleRemoveClick = () => {
    remove();
    setIsOpen(false);
  };

  return (
    <div>
      <button aria-label="Edit-button" onClick={handleClickMenuButton}>
        <ThreeDots size="16px" />
      </button>
      {isOpen && (
        <div css={editCss.modal} ref={ref}>
          <button css={editCss.button} onClick={handleEditClick}>
            <Pencil size="12px" />
            {' 수정'}
          </button>
          <button css={editCss.button} onClick={handleRemoveClick}>
            <Trash size="12px" />
            {' 삭제'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Edit;
