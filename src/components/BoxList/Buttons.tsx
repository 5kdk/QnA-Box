import { css } from '@emotion/react';
import { PlusSm } from '@emotion-icons/heroicons-solid/';
import { Button, Flex } from '../atom';

const buttonCss = {
  wrapper: css`
    padding: 0 10px;
  `,
  tap: css`
    gap: 10px;
  `,
};

const Buttons = () => {
  return (
    <Flex justifyContent="space-between" css={buttonCss.wrapper}>
      <Flex css={buttonCss.tap}>
        <Button
          text="참여 중인 BOX"
          onClick={() => {
            console.log('hi');
          }}
          bgColor="var(--black)"
          color="var(--white)"
          fontWeight={300}
          minWidth="102px"
        />
        <Button
          text="내 BOX"
          onClick={() => {
            console.log('hi');
          }}
          borderColor="var(--gray)"
          bgColor="var(--white)"
          color="var(--black)"
          fontWeight={300}
          minWidth="102px"
        />
      </Flex>
      <Button
        text="새로운 BOX"
        icon={<PlusSm size="16px" />}
        onClick={() => {
          console.log('hi');
        }}
        bgColor="var(--blue)"
        color="var(--white)"
        fontWeight={300}
        minWidth="102px"
      />
    </Flex>
  );
};

export default Buttons;
