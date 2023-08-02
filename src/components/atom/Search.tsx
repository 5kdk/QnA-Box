import { Search as SearchIcon } from '@emotion-icons/evaicons-solid/';
import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

const inputstyle = css`
  line-height: 30px;
  border: none;
  padding-left: 20px;
`;
const wrapstyle = css`
  display: flex;
  align-items: center;
`;

interface SearchType {
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ input, handleInput }: SearchType) => {
  return (
    <div css={wrapstyle}>
      <SearchIcon size="20px" />
      <input title="박스 검색창" css={inputstyle} onChange={handleInput} value={input}></input>
    </div>
  );
};

export default Search;
