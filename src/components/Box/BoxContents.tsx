import { useState } from 'react';
import { Answer, BoxInfo, Comments, Question } from '.';
import { Controller } from '../molecules';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getQnaBoxById } from '../../services/boxes';

const staleTime = 3000;

const BoxContents = () => {
  const { id } = useParams() as { id: string };
  const { data: boxdetail } = useQuery({
    queryKey: ['boxdetail', id],
    queryFn: () => getQnaBoxById(id),
    staleTime,
  });

  const [replyComment, setReplyComment] = useState('');
  const [replyUser, setReplyUser] = useState('');

  return (
    <>
      <BoxInfo boxdetail={boxdetail!} />
      <Controller />
      <Comments
        owner={boxdetail!.owner}
        replyComment={replyComment}
        setReplyUser={setReplyUser}
        setReplyComment={setReplyComment}
      />
      {replyComment ? <Answer replyUser={replyUser} replyComment={replyComment} BoxId={id} /> : <Question />}
    </>
  );
};

export default BoxContents;
