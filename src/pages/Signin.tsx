import { useNavigate } from 'react-router-dom';
import { SignForm } from '../components/molecules';
import { SigninSchemaType, signinSchema } from '../schema';
import { loginUser } from '../services/auth';
import { useSetAtom } from 'jotai';
import userState from '../jotai/atom/userState';

const Signin = () => {
  const setUser = useSetAtom(userState);
  const navigate = useNavigate();
  const reqSignin = async (data: SigninSchemaType) => {
    try {
      const userData = await loginUser(data.email, data.password);
      setUser(userData);
      navigate('/box', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignForm<SigninSchemaType>
      buttonText="Sign In"
      formSchema={signinSchema}
      submitFunc={reqSignin}
      redirectTo="/signup"
      redirectMsg="계정이 없으신가요?"
    />
  );
};

export default Signin;
