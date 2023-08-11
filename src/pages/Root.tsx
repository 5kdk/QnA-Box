import { css } from '@emotion/react';
import { Flex, Logo, Title, WideButton } from '../components/atom';
import { useNavigate } from 'react-router-dom';

const rootPageCss = {
  container: css`
    height: calc(100vh - 56px);
    padding-bottom: 56px;
    background-color: var(--black);
  `,
  subContainer: css`
    flex-grow: 1;
    gap: 50px;
  `,
  logostyle: css`
    & img svg {
      fill: var(--white);
    }
  `,
  title: css`
    color: var(--white);
    padding: 0 50px 0 60px;
    font-size: 24px;
  `,
  buttons: css``,
};

const Root = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/box');
  };

  return (
    <Flex css={rootPageCss.container} flexDirection="column" alignItems="center">
      <Flex css={rootPageCss.subContainer} flexDirection="column" alignItems="center" justifyContent="center">
        <Logo css={rootPageCss.logostyle} size="xl" reverse />
        <Title css={rootPageCss.title} text={'The best answers in one question! Share knowledge with QnA Box! 🧠'} />
        <WideButton
          css={rootPageCss.buttons}
          text="Get Started!"
          bgColor="var(--white)"
          color="var(--black)"
          onClick={handleButtonClick}
        />
      </Flex>
    </Flex>
  );
};

export default Root;
