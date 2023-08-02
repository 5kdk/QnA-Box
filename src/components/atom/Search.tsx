import { SearchAlt2 } from '@emotion-icons/boxicons-regular/SearchAlt2';
import { css } from '@emotion/react';

const iconstyle = css`
  width: 20px;
  height: 20px;
  color: #545454;
  position: absolute;
`;
const inputstyle = css`
  line-height: 30px;
  border: none;
  padding-left: 20px;
`;
const wrapstyle = css`
  display: flex;
  align-items: center;
`;

const Search = () => {
  return (
    <div css={wrapstyle}>
      <SearchAlt2 css={iconstyle} />
      <input css={inputstyle}></input>
    </div>
  );
};

export default Search;
