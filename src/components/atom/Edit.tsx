import { useCallback, useState, MouseEvent } from 'react';
import { css } from '@emotion/react';
import { Pencil, ThreeDots, Trash } from 'emotion-icons/bootstrap';
import useClickOutside from '../../hooks/useClickOutside';

const modalStyle = css({
  position: 'absolute',
  top: '14px',
  right: 0,
  width: '70px',
  boxShadow: '1px 2px 5px 2px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#fff',
  borderRadius: '5px',
});

const buttonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  textAlign: 'left',
  borderRadius: '10px',
  fontSize: '13px',
  padding: '5px 15px 5px 10px',
});

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

  return (
    <div>
      <button onClick={handleClickMenuButton}>
        <ThreeDots size="16px" />
      </button>
      {isOpen && (
        <div css={modalStyle} ref={ref}>
          <button css={buttonStyle} onClick={edit}>
            <Pencil size="12px" />
            {' 수정'}
          </button>
          <button css={buttonStyle} onClick={remove}>
            <Trash size="12px" />
            {' 삭제'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Edit;
