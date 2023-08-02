import { useState, ChangeEvent } from 'react';
import Filter from '../atom/Filter';
import Flex from '../atom/Flex';
import Search from '../atom/Search';
import { css } from '@emotion/react';

const BoxListController = () => {
  const [userInput, setUserInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <Flex justifyContent="space-between" css={css({ padding: '10px 20px' })}>
      <Search input={userInput} handleInput={handleInput} />
      <Filter />
    </Flex>
  );
};

export default BoxListController;
