import { css } from '@emotion/react';
import { Flex } from '../atom';
import { ReactNode } from 'react';

const boxesCss = css`
  border-top: 1px solid var(--gray);
`;

const Boxes = ({ children }: { children: ReactNode }) => {
  return (
    <Flex css={boxesCss} flexDirection="column">
      {children}
    </Flex>
  );
};

export default Boxes;
