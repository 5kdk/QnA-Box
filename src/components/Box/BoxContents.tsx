import { useState } from 'react';
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

  const [replyFor, setReplyFor] = useState<{ commentOwnerName: string; commentId: string } | null>(null);

  const activateReplyMode = (commentOwnerName: string, commentId: string) => {
    setReplyFor({ commentOwnerName, commentId });
  };
  const deactivateReplyMode = () => {
    setReplyFor(null);
  };

  return (
    <>
      <BoxInfo boxdetail={boxdetail!} />
      <Comments ownerId={boxdetail!.ownerId} activateReplyMode={activateReplyMode} />
      <CreateContentBar replyFor={replyFor} deactivateReplyMode={deactivateReplyMode} />
    </>
  );
};

export default BoxContents;
