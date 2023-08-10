import { Avatar, Flex } from '../atom';
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
  wrapper: css`
    width: var(--app_width);
    min-height: 100px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--gray);
    gap: 15px;
  `,
  question: css`
    width: 100%;
    gap: 5px;
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
  titleWrapper: css`
    padding: 10px 20px 0 20px;
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

interface ItemSkeletonProps {
  num: number;
}

const BoxSkeleton = ({ num }: ItemSkeletonProps) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" css={BoxSkeletonCss.titleWrapper}>
        <Flex flexDirection="column">
          <div css={BoxSkeletonCss.title}></div>
          <div css={[BoxSkeletonCss.text, BoxSkeletonCss.detail]}></div>
        </Flex>
        <button aria-label="더 많은 정보 보기">
          <InfoCircle size="16px" />
        </button>
      </Flex>
      {Array.from({ length: num }, (_, i) => (
        <Flex key={`wrapper ${i}`} css={BoxSkeletonCss.wrapper} justifyContent="space-between">
          <Avatar size="sm" />
          <Flex flexDirection="column" css={BoxSkeletonCss.question}>
            <div css={BoxSkeletonCss.text} />
            {Array.from({ length: 3 }, (_, j) => (
              <div css={[BoxSkeletonCss.text, BoxSkeletonCss.detail]} key={`text ${i}-${j}`} />
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default BoxSkeleton;
