import { ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import { Filter, Flex, Search } from '../atom';
import { searchInputState } from '../../jotai/atom';

const controllerCss = css`
  padding: 10px 20px;
`;

const Controller = () => {
  const [userInput, setUserInput] = useAtom(searchInputState);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <Flex justifyContent="space-between" css={controllerCss}>
      <Search input={userInput} handleInput={handleInput} />
      <Filter />
    </Flex>
  );
};

export default Controller;
