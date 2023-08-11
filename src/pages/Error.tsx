import { css } from '@emotion/react';
import { Flex } from '../components/atom';
import { ErrorButtons } from '../components/molecules';
import { ErrorFallbackProps } from '../components/molecules/ErrorFallback';

const errorCss = {
  wrapper: (gap?: string) => css`
    gap: ${gap || '22px'};
    min-height: inherit;
    padding: 92px 40px;
    white-space: pre-line;
    text-align: center;
  `,
  opps: (fs?: string) => css`
    font-weight: 900;
    font-size: ${fs || '30px'};
  `,
  code: css`
    font-size: 100px;
    font-weight: 900;
    color: var(--gray);
    padding-bottom: 18px;
  `,
  message: css`
    line-height: 24px;
  `,
};

interface ErrorProps extends Partial<ErrorFallbackProps> {
  status?: number;
  message?: string;
  resetFn?: () => void;
}

const Error = ({ status, message, resetFn, error, resetErrorBoundary }: ErrorProps) => {
  return (
    <Flex css={errorCss.wrapper(error && '70px')} flexDirection="column" alignItems="center" justifyContent="center">
      <p css={errorCss.opps(error && '40px')}>Opps..!</p>
      {status && <p css={errorCss.code}>{status}</p>}
      <p css={errorCss.message}>{message || '이 오류가 계속 발생할 경우\n관리자에게 문의해주세요'}</p>
      <ErrorButtons resetFn={resetFn || resetErrorBoundary} />
    </Flex>
  );
};

export default Error;
