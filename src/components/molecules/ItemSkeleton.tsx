import { css, keyframes } from '@emotion/react';
import { Avatar, Flex } from '../atom';

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3; 
  }
`;

const itemSkeletonCss = {
  wrapper: css`
    width: 448px;
    min-height: 100px;
    padding: 12px 24px;
    border: 1px solid var(--gray);
    gap: 15px;
  `,
  question: css`
    width: '100%';
    gap: '5px';
  `,
  text: css`
    width: 100px;
    height: 18px;
    border-radius: 10px;
    animation: ${blink} 2s ease-in-out infinite;
    background-color: var(--gray);
  `,
  detail: css`
    width: 340px;
    height: 15px;
  `,
};

const ItemSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }, () => (
        <Flex css={itemSkeletonCss.wrapper} justifyContent="space-between">
          <Avatar size="sm" />
          <Flex flexDirection="column" css={itemSkeletonCss.question}>
            <div css={itemSkeletonCss.text} />
            {Array.from({ length: 3 }, () => (
              <div css={[itemSkeletonCss.text, itemSkeletonCss.detail]} />
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default ItemSkeleton;
