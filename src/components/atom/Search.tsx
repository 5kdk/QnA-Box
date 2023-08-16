import { ChangeEvent } from 'react';
import { Search as SearchIcon } from '@emotion-icons/evaicons-solid/';
import { css } from '@emotion/react';

const SearchCss = {
  inputstyle: css`
    height: 30px;
    padding-left: 5px;
    border: none;
    border-radius: 5px;
    :focus {
      outline: 1px solid var(--black);
    }
  `,
  wrapstyle: css`
    display: flex;
    align-items: center;
  `,
};

interface SearchType {
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ input, handleInput }: SearchType) => {
  return (
    <div css={SearchCss.wrapstyle}>
      <label>
        <SearchIcon size="20px" />
        <input title="박스 검색창" css={SearchCss.inputstyle} onChange={handleInput} value={input}></input>
      </label>
    </div>
  );
};

export default Search;
