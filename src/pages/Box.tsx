import { css } from '@emotion/react';
import { BoxContents, BoxInfoSkeleton } from '../components/Box/';
import { Suspense } from 'react';

const containerStyle = css`
  padding-bottom: 150px;
`;

const Box = () => {
  return (
    <div css={containerStyle}>
      <Suspense fallback={<BoxInfoSkeleton />}>
        <BoxContents />
      </Suspense>
    </div>
  );
};

export default Box;
