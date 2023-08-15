import { useNavigate } from 'react-router-dom';
import { SignForm } from '../components/molecules';
import { SigninSchemaType, signinSchema } from '../schema';
import { loginUser } from '../services/auth';
import { useReqTryCatch } from '../hooks';

const Signin = () => {
  const navigate = useNavigate();
  const reqTryCatch = useReqTryCatch();
  const reqSignin = (data: SigninSchemaType) => {
    reqTryCatch(async () => {
      await loginUser(data.email, data.password);
      navigate('/box', { replace: true });
    });
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
