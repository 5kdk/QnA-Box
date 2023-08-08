import { useNavigate } from 'react-router-dom';
import { SignForm } from '../molecules';
import { SignupSchemaType, signupSchema } from '../../registerSchema';
import { registerUser } from '../../services/auth';

const Signup = () => {
  const reqSignup = (data: SignupSchemaType) => {
    try {
      await registerUser(data.email, data.password);

      navigate('/box');
    } catch (error) {
      console.error(error);
    }
  };
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
