import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, Path, SubmitHandler, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Flex, Logo, Note, WideButton } from '../atom';
import { FormInput } from '.';
import { toastErrorState } from '../../jotai/atom';
import errorObjToString from '../../utils/errorObjToString';
import googlelogin2 from '../../assets/images/btn_google_signin_light_normal_web.png';

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

interface SignFormProps<T> {
  buttonText: string;
  formSchema: ZodType<T>;
  anotherInputs?: { label: string; formkey: string; type: string }[];
  submitFunc: (data: T) => void;
  redirectTo: string;
  redirectMsg: string;
}

const SignForm = <T extends FieldValues>({
  buttonText,
  formSchema,
  anotherInputs = [],
  submitFunc,
  redirectTo,
  redirectMsg,
}: SignFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ resolver: zodResolver(formSchema) });
  const onSubmit: SubmitHandler<T> = submitFunc;
  const navigate = useNavigate();
  const toOtherPage = () => navigate(redirectTo);
  const setToastError = useSetAtom(toastErrorState);

  useEffect(() => {
    if (errors) setToastError(errorObjToString(errors));
  }, [errors, setToastError]);

  return (
    <Flex css={SignFormCss.container} flexDirection="column" alignItems="center">
      <Logo css={SignFormCss.logostyle} size="lg" />
      <form css={SignFormCss.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput css={SignFormCss.inputstyle} label="E-mail" type="text" register={register('email' as Path<T>)} />
        <FormInput
          css={SignFormCss.inputstyle}
          label="Password"
          type="password"
          register={register('password' as Path<T>)}
        />
        {anotherInputs.map((input, idx) => (
          <FormInput key={idx} css={SignFormCss.inputstyle} {...input} register={register(input.formkey as Path<T>)} />
        ))}
        <div css={SignFormCss.buttons}>
          <WideButton text={buttonText} bgColor="var(--blue)" color="var(--white)" onClick={() => {}} />
          <button aria-label="구글 로그인">
            <img css={SignFormCss.googlelogin} src={googlelogin2} alt="google" />
          </button>
        </div>
      </form>
      <Note css={SignFormCss.inputstyle} text={redirectMsg} onClick={toOtherPage} />
    </Flex>
  );
};

export default SignForm;
