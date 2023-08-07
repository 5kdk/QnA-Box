import SignForm from '../Sign/SignForm';
import { RegisterSchemaType, signinSchema } from '../../registerSchema';

const Signin = () => {
  const reqSignin = (data: RegisterSchemaType) => console.log(data);

  return (
    <SignForm
      buttonText="LOGIN"
      formSchema={signinSchema}
      submitFunc={reqSignin}
      redirectTo="/signup"
      redirectMsg="계정이 없으신가요?"
    />
  );
};

export default Signin;
