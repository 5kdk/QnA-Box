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
});

interface QItemProps {
  imgUrl?: string;
  userName: string;
  text: string;
  isLike?: boolean;
  like?: number;
}

const Item = ({ imgUrl, userName, text, isLike, like }: QItemProps) => {
  return (
    <Flex css={wrapperStyle} justifyContent="space-between">
      <Avartar size="sm" src={imgUrl} />
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" alignItems="center">
          <span css={nameStyle}>{userName}</span>
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
