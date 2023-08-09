import { Dispatch, SetStateAction } from 'react';
import { Avatar, Edit, Flex, Text } from '../atom';
import { css } from '@emotion/react';
import { SuitHeart, SuitHeartFill } from '@emotion-icons/bootstrap';
import { Reply } from '@emotion-icons/boxicons-regular/Reply';

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
  responder: string;
  responderAvatarUrl: string;
  content: string;
  postTime: string;
  like: number;
  answer: Post[];
};

type BoxItemProps = Post & {
  owner: string;
  setReplyComment: Dispatch<SetStateAction<string>>;
  replyComment: string;
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
  replyComment,
  owner,
  responder,
  postTime,
  content,
  responderAvatarUrl,
  like,
  answer,
}: BoxItemProps) => {
  // temp
  const isLike = true;

  const editPost = () => {
    console.log('edit');
  };
  const removePost = () => {
    console.log('delete');
  };
  const handleComment = (responder: string) => () => {
    if (responder === replyComment) return setReplyComment('');
    setReplyComment(responder);
  };

  return (
    <>
      <Flex css={boxItemCss.wrapper(replyComment === responder)} justifyContent="space-between">
        <Flex alignItems="center" flexDirection="column">
          <Avatar size="sm" src={responderAvatarUrl} />
          {answer.length !== 0 && <div css={boxItemCss.line}></div>}
        </Flex>
        <Flex flexDirection="column" css={boxItemCss.question}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Flex flexDirection="column">
              <span css={owner === responder ? [boxItemCss.name, boxItemCss.ownerName] : boxItemCss.name}>
                {responder}
              </span>
            </Flex>
            <Flex alignItems="center" css={boxItemCss.menuWrapper}>
              <span css={boxItemCss.subText}>{displayTimeAgo(postTime)}</span>
              <Edit edit={editPost} remove={removePost} />
            </Flex>
          </Flex>
          <Text>{content}</Text>
          <Flex alignItems="center" css={boxItemCss.like}>
            {isLike ? <SuitHeartFill size="14px" color="var(--orange)" /> : <SuitHeart size="14px" />}
            {like !== 0 && <span css={boxItemCss.subText}>{`${like} likes`}</span>}
            <button css={boxItemCss.reply} onClick={handleComment(responder)}>
              <Reply size="20px" />
            </button>
          </Flex>
        </Flex>
      </Flex>
      {answer.length !== 0 &&
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
        ))}
    </>
  );
};

export default BoxItem;
