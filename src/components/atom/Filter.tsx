import { useState, useCallback, MouseEvent } from 'react';
import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import { filterState } from '../../jotai/atom';
import useClickOutside from '../../hooks/useClickOutside';

const FilterCss = {
  boxstyle: (isShow: boolean) => {
    return css`
      position: relative;
      width: 90px;
      padding: 8px;
      border-radius: 8px;
      align-self: center;
      ::before {
        position: absolute;
        content: ${isShow ? "'▲'" : "'▼'"};
        top: 7px;
        right: 8px;
        color: var(--black);
        font-size: 15px;
      }
    `;
  },
  selectstyle: (isShow: boolean) => {
    return css`
      position: absolute;
      top: 40px;
      left: 0px;
      width: 100%;
      overflow: hidden;
      max-height: ${isShow ? '90px' : 0};
      padding: 0;
      border-radius: 3px;
      background-color: var(--white);
      color: var(--black);
      z-index: 1;
      box-shadow: ${isShow ? '1px 2px 5px 2px var(--shadow)' : ''};
    `;
  },
  labelStyle: css`
    font-size: 14px;
  `,
  optionstyle: css`
    padding: 6px 8px;
    width: 100%;
    font-size: 14px;
    text-align: left;
    background-color: var(--white);
    border: none;
    &:hover {
      background-color: var(--blue);
      color: var(--white);
    }
  `,
};

type FilterType = '최신순' | '오래된순';

const Filter = () => {
  const [curValue, setCurValue] = useAtom(filterState);
  const [isShow, setIsShow] = useState(false);

  const ref = useClickOutside(useCallback(() => setIsShow(false), []));

  const handleCurValue = (filter: FilterType) => (e: MouseEvent) => {
    e.stopPropagation();
    setCurValue(filter);
  };

  const handleShow = (e: MouseEvent) => {
    e.stopPropagation();
    setIsShow(prev => !prev);
  };

  const filters: FilterType[] = ['최신순', '오래된순'];

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      css={FilterCss.boxstyle(isShow)}
      onClick={handleShow}
      onKeyDown={() => {}}>
      <label css={FilterCss.labelStyle}>{curValue}</label>
      <div css={FilterCss.selectstyle(isShow)}>
        {filters.map(filter => (
          <button key={filter} css={FilterCss.optionstyle} aria-label={filter} onClick={handleCurValue(filter)}>
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
