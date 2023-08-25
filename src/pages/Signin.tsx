import { useNavigate } from 'react-router-dom';
import { SignForm } from '../components/molecules';
import { useReqTryCatch } from '../hooks';
import { SigninSchemaType, signinSchema } from '../schema';
import { loginUser } from '../services/auth';

const Signin = () => {
  const navigate = useNavigate();
  const reqTryCatch = useReqTryCatch();
  const reqSignin = (data: SigninSchemaType) => {
    reqTryCatch(async () => {
      await loginUser(data.email, data.password);
      const prevPage = document.referrer;
      if (prevPage.includes(import.meta.env.VITE_BASE_URL)) navigate(-1);
      else navigate('/');
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
