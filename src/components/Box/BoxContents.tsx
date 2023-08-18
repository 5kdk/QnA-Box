import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BoxInfo, Comments, CreateContentBar } from '.';
import { getQnaBoxById } from '../../services/boxes';

const staleTime = 3000;

const BoxContents = () => {
  const { id } = useParams() as { id: string };
  const { data: boxdetail } = useQuery({
    queryKey: ['boxdetail', id],
    queryFn: () => getQnaBoxById(id),
    staleTime,
  });

  return (
    <>
      <BoxInfo boxdetail={boxdetail!} />
      <Comments ownerId={boxdetail!.ownerId} />
      <CreateContentBar />
    </>
  );
};

export default BoxContents;
