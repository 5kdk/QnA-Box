import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Edit, Flex, Text } from '../atom';
import { css } from '@emotion/react';
import { SuitHeart, SuitHeartFill } from '@emotion-icons/bootstrap';
import { Reply } from '@emotion-icons/boxicons-regular/Reply';
import EditCommentForm from './EditCommentForm';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/profile';

const boxItemCss = {
  wrapper: (reply: boolean) => css`
    width: var(--app_width);
    min-height: 100px;
    padding: 12px 24px;
    gap: 15px;
    background-color: ${reply ? 'var(--gray)' : 'white'};
  `,
  line: css`
    width: 1.5px;
    height: calc(100% + 30px);
    margin-top: 10px;
    margin-bottom: -10px;
    background-color: var(--gray);
  `,
  question: css`
    width: 100%;
  `,
  name: css`
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 14px;
  `,
  ownerName: css`
    color: var(--blue);
  `,
  menuWrapper: css`
    position: relative;
  `,
  subText: css`
    margin-right: 5px;
    font-size: 12px;
    font-weight: 400;
    color: var(--deep_gray);
  `,
  like: css`
    margin: 10px 0 12px 0;
    gap: 5px;
  `,
  reply: css`
    rotate: 180deg;
    padding-bottom: 3px;
  `,
};

type Post = {
  authorId: string;
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: Post[];
};

type BoxItemProps = Post & {
  owner: string;
  setReplyComment: Dispatch<SetStateAction<string>>;
  setReplyUser: Dispatch<SetStateAction<string>>;
  replyComment: string;
};
type Profile = {
  displayName: string;
  email: string;
  joinedBoxes: [];
  likedComments: [];
  photoURL: null | string;
  uid: string;
};

const displayTimeAgo = (postTimestamp: string): string => {
  const currentTime = new Date();
  const postTime = new Date(postTimestamp);
  const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - postTime.getTime()) / 1000);

  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_WEEK = 604800;
  const SECONDS_IN_YEAR = 31536000;

  if (timeDifferenceInSeconds < SECONDS_IN_MINUTE) {
    return `${timeDifferenceInSeconds}s`;
  } else if (timeDifferenceInSeconds < SECONDS_IN_HOUR) {
    return `${Math.floor(timeDifferenceInSeconds / SECONDS_IN_MINUTE)}m`;
  } else if (timeDifferenceInSeconds < SECONDS_IN_DAY) {
    return `${Math.floor(timeDifferenceInSeconds / SECONDS_IN_HOUR)}h`;
  } else if (timeDifferenceInSeconds < SECONDS_IN_WEEK) {
    return `${Math.floor(timeDifferenceInSeconds / SECONDS_IN_DAY)}d`;
  } else if (timeDifferenceInSeconds < SECONDS_IN_YEAR) {
    return `${Math.floor(timeDifferenceInSeconds / SECONDS_IN_WEEK)}w`;
  } else {
    return `${Math.floor(timeDifferenceInSeconds / SECONDS_IN_YEAR)}y`;
  }
};
const BoxItem = ({
  setReplyComment,
  setReplyUser,
  replyComment,
  owner,
  authorId,
  commentId,
  content,
  likes,
  createdAt,
  replies,
}: BoxItemProps) => {
  // temp
  const [isEdit, setIsEdit] = useState(false);
  const isLike = true;

  const { data } = useQuery({
    queryKey: ['getAuthor', authorId],
    queryFn: () => getProfile(authorId),
  }) as { data: Profile };

  const handleModify = () => {
    setIsEdit(prev => !prev);
  };
  const handleCancle = () => {
    setIsEdit(prev => !prev);
  };
  const removePost = () => {
    console.log('delete');
  };
  const handleReplyComment = (commentId: string, name: string) => () => {
    if (commentId === replyComment) return setReplyComment('');
    setReplyComment(commentId);
    setReplyUser(name);
  };

  return (
    <>
      <Flex css={boxItemCss.wrapper(replyComment === commentId)} justifyContent="space-between">
        <Flex alignItems="center" flexDirection="column">
          <Avatar size="sm" src={data?.photoURL} />
          {replies.length !== 0 && <div css={boxItemCss.line}></div>}
        </Flex>
        <Flex flexDirection="column" css={boxItemCss.question}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Flex flexDirection="column">
              <span css={owner === data?.displayName ? [boxItemCss.name, boxItemCss.ownerName] : boxItemCss.name}>
                {data?.displayName}
              </span>
            </Flex>
            <Flex alignItems="center" css={boxItemCss.menuWrapper}>
              <span css={boxItemCss.subText}>{displayTimeAgo(createdAt)}</span>
              <Edit edit={handleModify} remove={removePost} />
            </Flex>
          </Flex>
          {isEdit ? (
            <EditCommentForm text={content} handleModify={handleModify} handleCancle={handleCancle} />
          ) : (
            <Text>{content}</Text>
          )}
          <Flex alignItems="center" css={boxItemCss.like}>
            {isLike ? <SuitHeartFill size="14px" color="var(--orange)" /> : <SuitHeart size="14px" />}
            {likes !== 0 && <span css={boxItemCss.subText}>{`${likes} likes`}</span>}
            <button css={boxItemCss.reply} onClick={handleReplyComment(commentId, data.displayName)}>
              {isEdit ? '' : <Reply size="20px" />}
            </button>
          </Flex>
        </Flex>
      </Flex>
      {/* {answer.length !== 0 &&
        answer.map(({ responder, responderAvatarUrl, postTime, content, like, answer }, i) => (
          <BoxItem
            owner={owner}
            responder={responder}
            content={content}
            postTime={postTime}
            responderAvatarUrl={responderAvatarUrl}
            like={like}
            answer={answer}
            key={`answer ${responder} ${i}`}
            setReplyComment={setReplyComment}
            replyComment={replyComment}
          />
        ))} */}
    </>
  );
};

export default BoxItem;
