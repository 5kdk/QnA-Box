import { Flex } from '../atom';
import { css, keyframes } from '@emotion/react';
import { InfoCircle } from '@emotion-icons/bootstrap';

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3; 
  }
`;

const BoxSkeletonCss = {
  titleWrapper: css`
    padding: 20px 0;
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
  title: css`
    width: 150px;
    height: 25px;
    border-radius: 10px;
    animation: ${blink} 2s ease-in-out infinite;
    background-color: var(--gray);
    margin-bottom: 10px;
  `,
};

const BoxSkeleton = () => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" css={BoxSkeletonCss.titleWrapper}>
        <Flex flexDirection="column">
          <div css={BoxSkeletonCss.title}></div>
          <div css={[BoxSkeletonCss.text, BoxSkeletonCss.detail]}></div>
        </Flex>
        <InfoCircle size="16px" />
      </Flex>
    </>
  );
};

export default BoxSkeleton;
