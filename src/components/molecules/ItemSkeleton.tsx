import { css, keyframes } from '@emotion/react';
import Avartar from '../atom/Avartar';
import Flex from '../atom/Flex';

const wrapperStyle = css({
  width: '28rem',
  minHeight: '100px',
  padding: '12px 24px',
  gap: '15px',
  border: '1px solid #F0F0F0',
});

const blinkStyle = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3; 
  }
`;
const textStyle = css({
  width: '100px',
  height: '18px',
  backgroundColor: '#D6D6D6',
  borderRadius: '10px',
  animation: `${blinkStyle} 2s ease-in-out infinite`,
});

const detailStyle = css({
  width: '340px',
  height: '15px',
});

const ItemSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }, () => (
        <Flex css={wrapperStyle} justifyContent="space-between">
          <Avartar size="sm" />
          <Flex flexDirection="column" css={css({ width: '100%', gap: '5px' })}>
            <div css={textStyle}></div>
            {Array.from({ length: 3 }, () => (
              <div css={[textStyle, detailStyle]}></div>
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default ItemSkeleton;
