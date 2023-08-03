import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Button, Flex } from '../atom';

const errorCss = {
  wrapper: css({
    gap: '1.3rem',
    minHeight: 'inherit',
    padding: '5.8rem 0',
  }),
  msg: css({
    fontWeight: '900',
    fontSize: '1.9rem',
  }),
  code: css({
    fontSize: '100px',
    fontWeight: '900',
    color: '#D9D9D9',
    paddingBottom: '1.2rem',
  }),
  buttons: css({
    gap: '1.2rem',
  }),
};

interface ErrorProps {
  status?: number;
  message?: string;
  retryFunc?: () => void;
}
const Error = ({ status = 404, message = '요청하신 페이지를 찾을 수 없습니다', retryFunc }: ErrorProps) => {
  const navigate = useNavigate();
  return (
    <Flex css={errorCss.wrapper} flexDirection="column" alignItems="center" justifyContent="center">
      <p css={errorCss.msg}>Opps..!</p>
      <p css={errorCss.code}>{status}</p>
      <p>{message}</p>
      <Flex css={errorCss.buttons}>
        <Button text="메인으로" color="black" bgColor="white" borderColor="#D6D6D6" onClick={() => navigate('/')} />
        {retryFunc && <Button text="Retry" color="white" bgColor="black" onClick={retryFunc} />}
      </Flex>
    </Flex>
  );
};

export default Error;
