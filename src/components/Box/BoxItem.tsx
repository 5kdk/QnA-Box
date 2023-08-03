import { css } from '@emotion/react';
import { SuitHeart } from '@emotion-icons/bootstrap';
import { SuitHeartFill } from '@emotion-icons/bootstrap';
import Avatar from '../atom/Avatar';
import Flex from '../atom/Flex';
import Edit from '../atom/Edit';
import Text from '../atom/Text';

const wrapperStyle = css({
  width: '28rem',
  minHeight: '100px',
  padding: '12px 24px',
  gap: '15px',
});

const nameStyle = css({
  fontWeight: 700,
  FontSize: '14px',
  marginBottom: '5px',
});

const ownerNameStyle = css({
  color: '#1C56FC',
});

const subTextStyle = css({
  fontSize: '12px',
  color: '#8E8E8E',
  fontWeight: 400,
  marginRight: '5px',
});

const menuWrapperStyle = css({
  position: 'relative',
});

const lineStyle = css({
  width: '1.5px',
  marginTop: '10px',
  marginBottom: '-10px',
  backgroundColor: '#F0F0F0',
  height: 'calc(100% + 30px)',
});

type Post = {
  responder: string;
  responderAvatarUrl: string;
  content: string;
  postTime: string;
  like: number;
  answer: Post[];
};

type BoxItemProps = {
  owner: string;
  responder: string;
  responderAvatarUrl: string;
  content: string;
  postTime: string;
  like: number;
  answer: Post[];
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
const BoxItem = ({ owner, responder, postTime, content, responderAvatarUrl, like, answer }: BoxItemProps) => {
  // temp
  const isLike = true;

  const editPost = () => {
    console.log('edit');
  };
  const removePost = () => {
    console.log('delete');
  };

  return (
    <>
      <Flex css={wrapperStyle} justifyContent="space-between">
        <Flex alignItems="center" flexDirection="column">
          <Avatar size="sm" src={responderAvatarUrl} />
          {answer.length !== 0 && <div css={lineStyle}></div>}
        </Flex>
        <Flex flexDirection="column" css={css({ width: '100%' })}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Flex flexDirection="column">
              <span css={owner === responder ? [nameStyle, ownerNameStyle] : nameStyle}>{responder}</span>
            </Flex>
            <Flex alignItems="center" css={menuWrapperStyle}>
              <span css={subTextStyle}>{displayTimeAgo(postTime)}</span>
              <Edit edit={editPost} remove={removePost} />
            </Flex>
          </Flex>
          <Text>{content}</Text>
          <Flex alignItems="center" css={css({ gap: '5px', margin: '10px 0 12px 0' })}>
            {isLike ? <SuitHeartFill size="14px" color="#FC6D1C" /> : <SuitHeart size="14px" />}
            {like !== 0 && <span css={subTextStyle}>{`${like} likes`}</span>}
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
          />
        ))}
    </>
  );
};

export default BoxItem;
