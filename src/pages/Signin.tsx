import { useNavigate } from 'react-router-dom';
import { SignForm } from '../components/molecules';
import { SigninSchemaType, signinSchema } from '../schema';
import { setLocalStorage } from '../utils/localStorage';
import { loginUser } from '../services/auth';

const Signin = () => {
  const navigate = useNavigate();
  const reqSignin = async (data: SigninSchemaType) => {
    try {
      const user = await loginUser(data.email, data.password);
      if (user) setLocalStorage('uid', user.uid);
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
