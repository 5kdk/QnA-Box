import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { ZodType } from 'zod';
import { css } from '@emotion/react';
import { Flex, Logo, Note, WideButton } from '../atom';
import { FormInput } from '.';
import useCustomForm from '../../hooks/useCustomForm';
import googlelogin2 from '../../assets/images/btn_google_signin_light_normal_web.png';
import { useReqTryCatch } from '../../hooks';
import { loginWithGoogle } from '../../services/auth';

const SignFormCss = {
  container: css`
    margin: 0 50px;
    height: 90vh;
  `,
  logostyle: css`
    flex-grow: 0.5;
  `,
  form: css`
    width: 320px;
  `,
  inputstyle: css`
    margin: 10px 0;
  `,
  buttons: css`
    margin-top: 20px;
    text-align: center;
  `,
  googlelogin: css`
    margin-top: 10px;
  `,
};

interface SignFormProps<T extends FieldValues> {
  submitFunc: SubmitHandler<T>;
  formSchema: ZodType<T>;
  redirectTo: string;
  anotherInputs?: { label: string; formkey: string; type: string }[];
  buttonText: string;
  redirectMsg: string;
}

const SignForm = <T extends FieldValues>({
  submitFunc,
  formSchema,
  redirectTo,
  anotherInputs = [],
  buttonText,
  redirectMsg,
}: SignFormProps<T>) => {
  const { registerKey, handleSubmit } = useCustomForm<T>(undefined, formSchema);
  const navigate = useNavigate();
  const toOtherPage = () => navigate(redirectTo);
  const reqTryCatch = useReqTryCatch();
  const signinGoogle = () =>
    reqTryCatch(async () => {
      await loginWithGoogle();
      navigate(-1);
    });

  return (
    <Flex css={SignFormCss.container} flexDirection="column" alignItems="center">
      <Logo css={SignFormCss.logostyle} size="lg" />
      <form css={SignFormCss.form} onSubmit={handleSubmit(submitFunc)}>
        <FormInput css={SignFormCss.inputstyle} label="E-mail" type="text" register={registerKey('email')} />
        <FormInput css={SignFormCss.inputstyle} label="Password" type="password" register={registerKey('password')} />
        {anotherInputs.map((input, idx) => (
          <FormInput key={idx} css={SignFormCss.inputstyle} {...input} register={registerKey(input.formkey)} />
        ))}
        <div css={SignFormCss.buttons}>
          <WideButton type="submit" text={buttonText} bgColor="var(--blue)" color="var(--white)" />
          <button aria-label="구글 로그인" type="button" onClick={signinGoogle}>
            <img css={SignFormCss.googlelogin} src={googlelogin2} alt="google" />
          </button>
        </div>
      </form>
      <Note css={SignFormCss.inputstyle} text={redirectMsg} onClick={toOtherPage} />
    </Flex>
  );
};

export default SignForm;
