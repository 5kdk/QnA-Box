import { css } from '@emotion/react';
import { PlusSm } from '@emotion-icons/heroicons-solid/';
import { Button, Flex } from '../atom';
import { useAtom } from 'jotai';
import { filterState } from '../../jotai/atom';
import { useNavigate } from 'react-router-dom';

const buttonCss = {
  wrapper: css`
    padding: 0 10px;
  `,
  tap: css`
    gap: 10px;
  `,
};

const Buttons = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useAtom(filterState);
  const selected = filter.mainFilter === 'joined';

  const handleClickJoinedBox = () => {
    setFilter({ ...filter, mainFilter: 'joined' });
  };

  const handleClickMyBox = () => {
    setFilter({ ...filter, mainFilter: 'my' });
  };

  const handleClickNewBox = () => {
    navigate('create');
  };

  return (
    <Flex justifyContent="space-between" css={buttonCss.wrapper}>
      <Flex css={buttonCss.tap}>
        <Button
          text="내 BOX"
          onClick={handleClickMyBox}
          borderColor={!selected ? 'var(--black)' : 'var(--gray)'}
          bgColor={!selected ? 'var(--black)' : 'var(--white)'}
          color={!selected ? 'var(--white)' : 'var(--black)'}
          fontWeight={300}
          minWidth="102px"
        />
        <Button
          text="참여 중인 BOX"
          onClick={handleClickJoinedBox}
          borderColor={selected ? 'var(--black)' : 'var(--gray)'}
          bgColor={selected ? 'var(--black)' : 'var(--white)'}
          color={selected ? 'var(--white)' : 'var(--black)'}
          fontWeight={300}
          minWidth="102px"
        />
      </Flex>
      <Button
        text="새로운 BOX"
        icon={<PlusSm size="16px" />}
        onClick={handleClickNewBox}
        bgColor="var(--blue)"
        color="var(--white)"
        fontWeight={300}
        minWidth="102px"
      />
    </Flex>
  );
};

export default Buttons;
