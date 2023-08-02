import { css } from '@emotion/react';
import { SuitHeart } from '@emotion-icons/bootstrap';
import { SuitHeartFill } from '@emotion-icons/bootstrap';
import Avartar from '../atom/Avartar';
import Flex from '../atom/Flex';

const wrapperStyle = css({
  width: '28rem',
  minHeight: '100px',
  padding: '12px 24px',
  gap: '15px',
});

const nameStyle = css({
  fontWeight: 700,
  FontSize: '16px',
  marginBottom: '5px',
});

const textStyle = css({
  fontSize: '14px',
  marginBottom: '10px',
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

interface QItemProps {
  userName: string;
  postTime: string;
  text: string;
  imgUrl?: string;
  isLike?: boolean;
  like?: number;
}

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

const Item = ({ imgUrl, userName, postTime, text, isLike, like }: QItemProps) => {
  return (
    <Flex css={wrapperStyle} justifyContent="space-between">
      <Avartar size="sm" src={imgUrl} />
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" alignItems="flex-start">
          <span css={nameStyle}>{userName}</span>
          <Flex alignItems="center" css={menuWrapperStyle}>
            {postTime && <span css={subTextStyle}>{displayTimeAgo(postTime)}</span>}
          </Flex>
        </Flex>
        <p css={textStyle}>{text}</p>
        <Flex alignItems="center" css={css({ gap: '5px' })}>
          {isLike ? <SuitHeartFill size="14px" color="#FC6D1C" /> : <SuitHeart size="14px" />}
          {like && <span css={subTextStyle}>{`${like} likes`}</span>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Item;
