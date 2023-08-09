import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../User/UserInfo';
import useReqTryCatch from '../../hooks/useReqTryCatch';
import { getProfile } from '../../services/profile';

export interface Profile {
  displayName: string;
  email: string;
  photoURL: string;
}

const User = () => {
  const { uid } = useParams();
  const [user, setUser] = useState<Profile>({ displayName: '', email: '', photoURL: '' });
  const reqTryCatch = useReqTryCatch();

  useEffect(() => {
    if (uid)
      reqTryCatch(async () => {
        const user = await getProfile(uid);
        if (user && user.displayName && user.email && user.photoURL) {
          const { displayName, email, photoURL } = user;
          setUser({ displayName, email, photoURL });
        }
      });
  }, [uid, reqTryCatch]);

  return <UserInfo {...user} />;
};

export default User;
