import { css } from '@emotion/react';
import { ThreeDots } from 'emotion-icons/bootstrap';
import { useState } from 'react';

import { Pencil } from '@emotion-icons/bootstrap';
import { Trash } from '@emotion-icons/bootstrap';

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
  width: '100%',
  textAlign: 'left',
  fontSize: '12px',
  padding: '5px 10px',
});

interface EditProps {
  edit: () => void;
  remove: () => void;
}

const Edit = ({ edit, remove }: EditProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenuButton = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <button onClick={handleClickMenuButton}>
        <ThreeDots size="16px" />
      </button>
      {isOpen && (
        <div css={modalStyle}>
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
    </>
  );
};

export default Edit;
