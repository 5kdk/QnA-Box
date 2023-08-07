import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { Flex, Logo, Note, WideButton } from '../atom';
import { FormInput } from '../molecules';
import kakaologin from '../../assets/images/kakao_login.png';
import { RegisterSchemaType } from '../../registerSchema';

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
  `,
  kakaobutton: css`
    background-color: var(--kakao);
    min-width: 320px;
    height: 57px;
    border-radius: 10px;
    margin: 10px 0;
  `,
};

interface SignFormProps {
  buttonText: string;
  formSchema: ZodType<RegisterSchemaType>;
  anotherInputs?: { label: string; formKey: string; type: string }[];
  submitFunc: (data: RegisterSchemaType) => void;
  redirectTo: string;
  redirectMsg: string;
}
const SignForm = ({
  buttonText,
  formSchema,
  anotherInputs = [],
  submitFunc,
  redirectTo,
  redirectMsg,
}: SignFormProps) => {
  type RegisterSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(formSchema) });
  const onSubmit: SubmitHandler<RegisterSchemaType> = submitFunc;
  console.log(errors);
  const navigate = useNavigate();
  const toOtherPage = () => navigate(redirectTo);

  return (
    <Flex css={SignFormCss.container} flexDirection="column" alignItems="center">
      <Logo css={SignFormCss.logostyle} size="lg" />
      <form css={SignFormCss.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput css={SignFormCss.inputstyle} label="E-mail" formKey="email" type="text" register={register} />
        <FormInput
          css={SignFormCss.inputstyle}
          label="Password"
          formKey="password"
          type="password"
          register={register}
        />
        {anotherInputs.map((input, idx) => (
          <FormInput key={idx} css={SignFormCss.inputstyle} {...input} register={register} />
        ))}
        <div css={SignFormCss.buttons}>
          <WideButton text={buttonText} bgColor="var(--blue)" color="var(--white)" onClick={() => {}} />
          <button css={SignFormCss.kakaobutton} aria-label="카카오 로그인">
            <img src={kakaologin} alt="kakaologin-img" />
          </button>
        </div>
      </form>
      <Note css={SignFormCss.inputstyle} text={redirectMsg} onClick={toOtherPage} />
    </Flex>
  );
};

export default SignForm;
