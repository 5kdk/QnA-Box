import { css } from '@emotion/react';
import { Button, Flex } from '../atom';
import { useNavigate } from 'react-router-dom';

const errBtnsCss = css`
  gap: 18px;
`;

interface ErrBtnsProps {
  resetFn?: () => void;
}

const ErrorButtons = ({ resetFn }: ErrBtnsProps) => {
  const navigate = useNavigate();
  const toMainPage = () => navigate('/');

  return (
    <Flex css={errBtnsCss}>
      <Button
        text="메인으로"
        color="var(--black)"
        bgColor="var(--white)"
        borderColor="var(--gray)"
        onClick={toMainPage}
      />
      {resetFn && <Button text="Retry" color="var(--white)" bgColor="var(--black)" onClick={resetFn} />}
    </Flex>
  );
};

export default ErrorButtons;
