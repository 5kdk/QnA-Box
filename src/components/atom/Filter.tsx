import { css } from '@emotion/react';
import { useState } from 'react';

const boxstyle = ({ isShow }: { isShow: boolean }) =>
  css({
    position: 'relative',
    width: '90px',
    padding: '8px',
    borderRadius: '8px',
    alignSelf: 'center',
    boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
    cursor: 'pointer',
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
  });
const optionstyle = css`
  font-size: 14px;
  padding: 6px 8px;
  &:hover {
    background-color: #1c56fc;
    color: white;
  }
`;

const Filter = () => {
  const [curValue, setCurValue] = useState<string>('최신순');
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleCurValue = (e: any) => {
    setCurValue(e.target.innerText);
  };
  return (
    <div css={boxstyle({ isShow })} onClick={() => setIsShow(prev => !prev)}>
      <label>{curValue}</label>
      <ul css={selectstyle({ isShow })}>
        <li css={optionstyle} onClick={handleCurValue}>
          최신순
        </li>
        <li css={optionstyle} onClick={handleCurValue}>
          좋아요순
        </li>
        <li css={optionstyle} onClick={handleCurValue}>
          오래된순
        </li>
      </ul>
    </div>
  );
};

export default Filter;
