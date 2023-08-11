import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { getComments } from '../../services/comments';
import { useQuery } from '@tanstack/react-query';
import { ItemWrapper } from '../molecules';
import { Flex } from '../atom';
import { Comment } from '.';
import { Dispatch, SetStateAction } from 'react';

const flexStyle = css`
  border-bottom: 1px solid var(--gray);
`;

const staleTime = 3000;

const Comments = ({
  owner,
  replyComment,
  setReplyComment,
  setReplyUser,
}: {
  owner: string;
  replyComment: string;
  setReplyUser: Dispatch<SetStateAction<string>>;
  setReplyComment: Dispatch<SetStateAction<string>>;
}) => {
  const { id } = useParams() as { id: string };

  const { data: boxcomments } = useQuery({
    queryKey: ['boxcomments', id],
    queryFn: () => getComments(id),
    staleTime,
  });

  if (!boxcomments) {
    return;
  }

  return (
    <ItemWrapper>
      {boxcomments.map(({ authorId, commentId, content, likes, replies, createdAt, parentId }, i) => (
        <Flex css={flexStyle} flexDirection="column" key={`${commentId} ${i}`}>
          <Comment
            owner={owner}
            authorId={authorId}
            content={content}
            createdAt={createdAt}
            commentId={commentId}
            likes={likes}
            replies={replies}
            parentId={parentId}
            setReplyUser={setReplyUser}
            setReplyComment={setReplyComment}
            replyComment={replyComment}
          />
        </Flex>
      ))}
    </ItemWrapper>
  );
};

export default Comments;
