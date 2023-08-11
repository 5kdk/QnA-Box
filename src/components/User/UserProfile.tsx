import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '.';
import { getProfile } from '../../services/profile';

const UserProfile = () => {
  const { uid } = useParams();
  const { data } = useQuery({
    queryKey: ['user', uid],
    queryFn: () => getProfile(uid),
    staleTime: 3000,
  });

  return <UserInfo {...data} />;
};

export default UserProfile;
