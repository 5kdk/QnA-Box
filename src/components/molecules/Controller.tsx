import { useState, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { Filter, Flex, Search } from '../atom';

const controllerCss = css`
  padding: 10px 20px;
`;

const BoxListController = () => {
  const [userInput, setUserInput] = useState('');

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

export default BoxListController;
