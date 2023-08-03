import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Logo, Flex, WideButton, Note } from '../atom';
import { Input } from '../molecules';
import kakaologin from '../../assets/images/kakao_login.png';

const SigninCss = {
  container: css`
    margin: 0 50px;
    height: 90vh;
  `,
  logostyle: css`
    flex-grow: 0.5;
  `,
  inputstyle: css`
    margin: 10px 0;
  `,
  notestyle: css`
    margin: 10px 0;
  `,
  kakaobutton: css`
    background-color: var(--kakao);
    min-width: 20rem;
    height: 57px;
    border-radius: 10px;
    margin: 10px 0;
  `,
  formstyle: css`
    text-align: right;
  `,
  forgetpwstyle: css`
    margin-bottom: 50px;
  `,
};

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const ToSignUp = () => {
    navigate('/signup');
  };
  return (
    <Flex css={SigninCss.container} flexDirection="column" alignItems="center">
      <Logo css={SigninCss.logostyle} size="lg" />
      <form css={SigninCss.formstyle}>
        <Input
          css={SigninCss.inputstyle}
          text="E-mail"
          type="text"
          width="100%"
          input={email}
          handleInput={handleEmail}
        />
        <Input
          css={SigninCss.inputstyle}
          text="Password"
          type="password"
          width="100%"
          input={password}
          handleInput={handlePassword}
        />
        <Note css={SigninCss.forgetpwstyle} text="비밀번호를 잊으셨나요?" fs="0.7rem" onClick={() => {}} />
        <WideButton text="Login" bgColor="var(--blue)" color="var(--white)" onClick={() => {}} />
        <button css={SigninCss.kakaobutton}>
          <img src={kakaologin} alt="kakaologin-img" />
        </button>
      </form>
      <Note css={SigninCss.notestyle} text="계정이 없으신가요?" onClick={ToSignUp} />
    </Flex>
  );
};

export default Signin;
