import { useState, SetStateAction, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Flex, Text } from '../atom';
import { getComments } from '../../services/comments';
import { getQnaBoxesById } from '../../services/boxes';
import { Controller, ItemWrapper } from '../molecules';
import BoxItem from './BoxItem';
import { css } from '@emotion/react';
import { InfoCircle } from '@emotion-icons/bootstrap';

const boxCss = {
  wrapper: css`
    padding: 10px 20px 0 20px;
  `,
  info: css`
    gap: 5px;
  `,
  border: css`
    border-bottom: 1px solid var(--gray);
  `,
  container: css`
    padding-bottom: 150px;
  `,
};

export type Comments = {
  authorId: string;
  boxId: string;
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  parentId: null | string;
  replies: [];
};

const BoxComment = ({
  replyComment,
  setReplyComment,
  setReplyUser,
}: {
  replyComment: string;
  setReplyComment: Dispatch<SetStateAction<string>>;
  setReplyUser: Dispatch<SetStateAction<string>>;
}) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const { id } = useParams() as { id: string };
  const staleTime = 3000;

  const { data: boxdetail } = useQuery({
    queryKey: ['boxdetail', id],
    queryFn: () => getQnaBoxesById([id]),
    staleTime,
  });
  const { data: boxcomments } = useQuery({
    queryKey: ['boxcomments', id],
    queryFn: () => getComments(id),
    staleTime,
  }) as { data: Comments[] };

  if (boxdetail !== undefined)
    return (
      <div css={boxCss.container}>
        <Flex justifyContent="space-between" alignItems="center" css={boxCss.wrapper}>
          <h2>{boxdetail && boxdetail[0].title}</h2>
          <button aria-label="더 많은 정보 보기">
            <InfoCircle size="16px" onClick={() => setMoreInfo(prev => !prev)} />
          </button>
        </Flex>
        <Flex flexDirection="column" css={[boxCss.wrapper, boxCss.info]}>
          {moreInfo && (
            <>
              <Text>{boxdetail && boxdetail[0].owner}</Text>
              <Text>{boxdetail && boxdetail[0].description}</Text>
            </>
          )}
          <Text>마지막 답변 날짜: 2023.07.31</Text>
        </Flex>
        <Controller />
        <ItemWrapper>
          {boxcomments.map(({ authorId, commentId, content, likes, replies, createdAt, parentId }, i) => (
            <Flex css={boxCss.border} flexDirection="column" key={`${commentId} ${i}`}>
              <BoxItem
                owner={boxdetail[0].owner}
                authorId={authorId}
                content={content}
                createdAt={createdAt}
                commentId={commentId}
                likes={likes}
                replies={replies}
                parentId={parentId}
                setReplyComment={setReplyComment}
                replyComment={replyComment}
                setReplyUser={setReplyUser}
              />
            </Flex>
          ))}
        </ItemWrapper>
      </div>
    );
};

export default BoxComment;
