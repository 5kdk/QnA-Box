import { css } from '@emotion/react';
import { Text } from '../atom';

const textStyle = (black: boolean | undefined) => css`
  color: ${black ? 'var(--deep_gray)' : 'var(--gray)'};
`;

const CopyLight = ({ black }: { black?: boolean }) => {
  const year = new Date().getFullYear();

  return <Text css={textStyle(black)} text={`Copyright © ${year} 쬬와규. Built with React TS ⚛️. `} />;
};

export default CopyLight;
