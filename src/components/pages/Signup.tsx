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
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const navigete = useNavigate();
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleCheckPw = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value);
  };
  const ToLogin = () => {
    navigete('/signin');
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
        <Input
          css={SigninCss.inputstyle}
          text="Password Check"
          type="password"
          width="100%"
          input={checkPw}
          handleInput={handleCheckPw}
        />
        <WideButton text="SignUp" bgColor="var(--blue)" color="var(--white)" onClick={() => {}} />
        <button css={SigninCss.kakaobutton}>
          <img src={kakaologin} alt="kakaologin-img" />
        </button>
      </form>
      <Note css={SigninCss.notestyle} text="이미 회원이신가요?" onClick={ToLogin} />
    </Flex>
  );
};

export default Signup;
