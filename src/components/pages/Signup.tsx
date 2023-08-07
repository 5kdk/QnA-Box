import SignForm from '../Sign/SignForm';
import { RegisterSchemaType, signupSchema } from '../../registerSchema';

const Signup = () => {
  const reqSignup = (data: RegisterSchemaType) => console.log(data);

  return (
    <SignForm
      buttonText="SIGNUP"
      formSchema={signupSchema}
      submitFunc={reqSignup}
      redirectTo="/signin"
      redirectMsg="이미 회원이신가요?"
      anotherInputs={[{ label: 'Password Check', formKey: 'passwordCheck', type: 'password' }]}
    />
  );
};

export default Signup;
