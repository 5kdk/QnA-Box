import { ChangeEvent } from 'react';
import { Search as SearchIcon } from '@emotion-icons/evaicons-solid/';
import { css } from '@emotion/react';

const searchCss = {
  label: css`
    position: relative;
    display: flex;
    align-items: center;
  `,
  icon: css`
    position: absolute;
    top: 50%;
    left: 2.5px;
    transform: translateY(-50%);
  `,
  input: css`
    width: 100%;
    height: 30px;
    padding-left: 25px;
    border: none;
    border-radius: 5px;
    :focus {
      outline: 1px solid var(--black);
    }
  `,
};

interface SearchType {
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ input, handleInput }: SearchType) => {
  return (
    <label css={searchCss.label}>
      <SearchIcon css={searchCss.icon} size="20px" />
      <input title="박스 검색창" css={searchCss.input} onChange={handleInput} value={input}></input>
    </label>
  );
};

export default Search;
