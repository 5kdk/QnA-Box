import { useNavigate } from 'react-router-dom';
import { SignForm } from '../molecules';
import { SignupSchemaType, signupSchema } from '../../schema';
import { registerUser } from '../../services/auth';
import { FirebaseError } from 'firebase/app';

const Signup = () => {
  const navigate = useNavigate();
  const reqSignup = async (data: SignupSchemaType) => {
    try {
      await registerUser(data.email, data.password);

      navigate('/signin');
    } catch (err) {
      if ((err as FirebaseError).code === 'auth/email-already-in-use') {
        console.error('이미 존재하는 이메일 입니다.', err);
      }
    }
  };
  const anotherInputs = [{ label: 'Password Check', formkey: 'passwordCheck', type: 'password' }];
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
