import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/profile';

const staleTime = 3000;

const useUserInfo = (authorId: string) => {
  const { data } = useQuery({
    queryKey: ['user', authorId],
    queryFn: () => getProfile(authorId),
    staleTime,
  });

  return data;
};

export default useUserInfo;
