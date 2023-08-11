import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Button, Flex } from '../atom';

const errorCss = {
  wrapper: css`
    gap: 22px;
    min-height: inherit;
    padding: 92px 0;
  `,
  msg: css`
    font-weight: 900;
    font-size: 30px;
  `,
  code: css`
    font-size: 100px;
    font-weight: 900;
    color: var(--gray);
    padding-bottom: 18px;
  `,
  buttons: css`
    gap: 18px;
  `,
};

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

const Error = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const toMainPage = () => navigate('/');

  return (
    <Flex css={errorCss.wrapper} flexDirection="column" alignItems="center" justifyContent="center">
      <p css={errorCss.msg}>Opps..!</p>
      {!error && <p css={errorCss.code}>404</p>}
      <p>{error?.message || '요청하신 페이지를 찾을 수 없습니다'}</p>
      <Flex css={errorCss.buttons}>
        <Button
          text="메인으로"
          color="var(--black)"
          bgColor="var(--white)"
          borderColor="var(--gray)"
          onClick={toMainPage}
        />
        {resetErrorBoundary && (
          <Button text="Retry" color="var(--white)" bgColor="var(--black)" onClick={resetErrorBoundary} />
        )}
      </Flex>
    </Flex>
  );
};

export default Error;
