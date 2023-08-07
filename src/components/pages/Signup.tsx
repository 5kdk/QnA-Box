import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Logo, Flex, WideButton, Note } from '../atom';
import { Input } from '../molecules';
import kakaologin from '../../assets/images/kakao_login.png';
import { registerUser } from '../../services/auth';

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
    min-width: 320px;
    height: 57px;
    border-radius: 10px;
    margin: 10px 0;
  `,
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const navigate = useNavigate();

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
    navigate('/signin');
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '') return;

    try {
      await registerUser(email, password);

      navigate('/box');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex css={SigninCss.container} flexDirection="column" alignItems="center">
      <Logo css={SigninCss.logostyle} size="lg" />
      <form onSubmit={handleOnSubmit}>
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
