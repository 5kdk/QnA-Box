import Search from '../atom/Search';
import Filter from '../atom/Filter';
import Flex from '../atom/Flex';
import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';

const flexstyle = (props: string) =>
  css({
    width: props,
  });

const ContentController = ({ width }: { width: string }) => {
  const [input, setInput] = useState('');
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <Flex css={flexstyle(width)} justifyContent="space-between" alignItems="center">
      <Search handleInput={handleInput} input={input} />
      <Filter />
    </Flex>
  );
};

export default ContentController;
