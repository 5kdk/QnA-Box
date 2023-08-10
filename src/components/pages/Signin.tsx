import { useNavigate } from 'react-router-dom';
import { SignForm } from '../molecules';
import { SigninSchemaType, signinSchema } from '../../schema';
import { loginUser } from '../../services/auth';

const Signin = () => {
  const navigate = useNavigate();
  const reqSignin = async (data: SigninSchemaType) => {
    try {
      await loginUser(data.email, data.password);
      navigate('/box', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

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
