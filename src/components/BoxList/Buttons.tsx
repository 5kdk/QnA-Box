import { css } from '@emotion/react';
import { PlusSm } from '@emotion-icons/heroicons-solid/';
import Button from '../atom/Button';
import Flex from '../atom/Flex';

const ButtonStyle = {
  flexStyle: css`
    padding: 0 10px;
  `,
};

const Buttons = () => {
  return (
    <Flex justifyContent="space-between" css={ButtonStyle.flexStyle}>
      <Flex css={css({ gap: '10px' })}>
        <Button
          text="참여 중인 BOX"
          onClick={() => {
            console.log('hi');
          }}
          bgColor="#000000"
          color="#fff"
          fontWeight={300}
          minWidth="102px"
        />
        <Button
          text="내 BOX"
          onClick={() => {
            console.log('hi');
          }}
          borderColor="#D6D6D6"
          bgColor="#fff"
          color="#000000"
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
        bgColor="#1C56FC"
        color="#fff"
        fontWeight={300}
        minWidth="102px"
      />
    </Flex>
  );
};

export default Buttons;
