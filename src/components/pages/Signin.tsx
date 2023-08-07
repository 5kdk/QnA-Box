import { SignForm } from '../molecules';
import { SigninSchemaType, signinSchema } from '../../registerSchema';

const Signin = () => {
  const reqSignin = (data: SigninSchemaType) => console.log(data);

  return (
    <SignForm<SigninSchemaType>
      buttonText="LOGIN"
      formSchema={signinSchema}
      submitFunc={reqSignin}
      redirectTo="/signup"
      redirectMsg="계정이 없으신가요?"
    />
  );
};

export default Signin;
