import { Button, Flex, Text, Title } from '../atom';
import { css } from '@emotion/react';

const FlexCss = css`
  min-height: 100px;
`;

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <Flex alignItems="center" flexDirection="column" justifyContent="space-between" css={FlexCss}>
    <Title text="Something went wrong" />
    <Text>{error.message}</Text>
    <Text>다시 시도해주세요</Text>
    <Button color="var(--white)" bgColor="var(--black)" text="retry" onClick={() => resetErrorBoundary()} />
  </Flex>
);

export default ErrorFallback;
