import SignForm from '../Sign/SignForm';
import { SignupSchemaType, signupSchema } from '../../registerSchema';

const Signup = () => {
  const reqSignup = (data: SignupSchemaType) => console.log(data);
  const anotherInputs = [{ label: 'Password Check', formKey: 'passwordCheck', type: 'password' }];
  return (
    <SignForm<SignupSchemaType>
      buttonText="SIGNUP"
      formSchema={signupSchema}
      submitFunc={reqSignup}
      redirectTo="/signin"
      redirectMsg="이미 회원이신가요?"
      anotherInputs={anotherInputs}
    />
  );
};

export default Signup;
