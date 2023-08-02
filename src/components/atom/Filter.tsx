import { css } from '@emotion/react';
import { useState } from 'react';

const boxstyle = ({ isShow }: { isShow: boolean }) =>
  css({
    position: 'relative',
    width: '90px',
    padding: '8px',
    borderRadius: '8px',
    alignSelf: 'center',
    '::before': {
      content: isShow ? "'▲'" : "'▼'",
      position: 'absolute',
      top: '7px',
      right: '8px',
      color: '000000',
      fontSize: '15px',
    },
  });
const selectstyle = ({ isShow }: { isShow: boolean }) =>
  css({
    position: 'absolute',
    top: '40px',
    left: '0px',
    width: '100%',
    overflow: 'hidden',
    maxHeight: isShow ? '90px' : 0,
    height: '90px',
    padding: '0',
    borderRadius: '3px',
    backgroundColor: 'white',
    color: 'black',
    zIndex: 1,
    boxShadow: isShow ? '1px 2px 5px 2px rgba(0, 0, 0, 0.2)' : '',
  });

const labelStyle = css({ fontSize: '14px' });

const optionstyle = css({
  fontSize: '14px',
  padding: '6px 8px',
  width: '100%',
  textAlign: 'left',
  backgroundColor: 'white',
  border: 'none',

  '&:hover': {
    backgroundColor: '#1c56fc',
    color: 'white',
  },
});

type FilterType = '최신순' | '좋아요순' | '오래된순';

const Filter = () => {
  const [curValue, setCurValue] = useState<FilterType>('최신순');
  const [isShow, setIsShow] = useState(false);
  const handleCurValue = (filter: FilterType) => {
    setCurValue(filter);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      css={boxstyle({ isShow })}
      onClick={() => setIsShow(prev => !prev)}
      onKeyDown={() => {}}>
      <label css={labelStyle}>{curValue}</label>
      <div css={selectstyle({ isShow })}>
        <button css={optionstyle} onClick={() => handleCurValue('최신순')}>
          최신순
        </button>
        <button css={optionstyle} onClick={() => handleCurValue('좋아요순')}>
          좋아요순
        </button>
        <button css={optionstyle} onClick={() => handleCurValue('오래된순')}>
          오래된순
        </button>
      </div>
    </div>
  );
};

export default Filter;
