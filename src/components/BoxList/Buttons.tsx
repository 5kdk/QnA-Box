import { css } from '@emotion/react';
import { PlusSm } from '@emotion-icons/heroicons-solid/';
import { Button, Flex } from '../atom';
import { MainFilter } from '../../pages/BoxList';

const buttonCss = {
  wrapper: css`
    padding: 0 10px;
  `,
  tap: css`
    gap: 10px;
  `,
};

interface ButtonsProps {
  boxFilter: MainFilter;
  handleClickJoinedBox: () => void;
  handleClickMyBox: () => void;
  handleClickNewBox: () => void;
}

const Buttons = ({ boxFilter, handleClickJoinedBox, handleClickMyBox, handleClickNewBox }: ButtonsProps) => {
  const selected = boxFilter === 'joined';

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
