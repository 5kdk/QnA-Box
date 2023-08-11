import { useState, SetStateAction, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Flex, Text } from '../atom';
import { getQnaBoxesById } from '../../services/boxes';
import { Controller, ItemWrapper } from '../molecules';
import BoxItem from './BoxItem';
import { css } from '@emotion/react';
import { InfoCircle } from '@emotion-icons/bootstrap';
import { Comments } from '../../pages/Box';

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

const BoxComment = ({
  replyComment,
  setReplyComment,
  setReplyUser,
  comments,
}: {
  replyComment: string;
  setReplyComment: Dispatch<SetStateAction<string>>;
  setReplyUser: Dispatch<SetStateAction<string>>;
  comments: Comments[];
}) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const { id } = useParams() as { id: string };
  const staleTime = 3000;
  const { data } = useQuery({
    queryKey: ['boxdetail', id],
    queryFn: () => getQnaBoxesById([id]),
    staleTime,
  });
  if (data !== undefined)
    return (
      <div css={boxCss.container}>
        <Flex justifyContent="space-between" alignItems="center" css={boxCss.wrapper}>
          <h2>{data && data[0].title}</h2>
          <button aria-label="더 많은 정보 보기">
            <InfoCircle size="16px" onClick={() => setMoreInfo(prev => !prev)} />
          </button>
        </Flex>
        <Flex flexDirection="column" css={[boxCss.wrapper, boxCss.info]}>
          {moreInfo && (
            <>
              <Text>{data && data[0].owner}</Text>
              <Text>{data && data[0].description}</Text>
            </>
          )}
          <Text>마지막 답변 날짜: 2023.07.31</Text>
        </Flex>
        <Controller />
        <ItemWrapper>
          {comments.map(({ authorId, commentId, content, likes, replies, createdAt }: Comments, i: number) => (
            <Flex css={boxCss.border} flexDirection="column" key={`${commentId} ${i}`}>
              <BoxItem
                owner={data[0].owner}
                authorId={authorId}
                content={content}
                createdAt={createdAt}
                commentId={commentId}
                likes={likes}
                replies={replies}
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
