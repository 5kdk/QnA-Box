import { css } from '@emotion/react';
import Avatar from '../atom/Avatar';
import Flex from '../atom/Flex';
import Edit from '../atom/Edit';
import Text from '../atom/Text';

const wrapperStyle = css({
  width: '28rem',
  minHeight: '100px',
  padding: '12px 24px 24px 24px',
  gap: '15px',
  border: '1px solid #F0F0F0',
});

const titleStyle = css({
  fontWeight: 700,
  fontSize: '16px',
  marginBottom: '5px',
});

const nameStyle = css({
  fontSize: '13px',
});

const menuWrapperStyle = css({
  position: 'relative',
});

interface BoxListItemProps {
  imgUrl?: string;
  title: string;
  userName: string;
  text: string;
}

const BoxListItem = ({ title, imgUrl, userName, text }: BoxListItemProps) => {
  const editPost = () => {
    console.log('edit');
  };
  const removePost = () => {
    console.log('delete');
  };

  return (
    <Flex css={wrapperStyle} justifyContent="space-between">
      <Avatar size="sm" src={imgUrl} />
      <Flex flexDirection="column" css={css({ width: '100%' })}>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex flexDirection="column">
            <span css={titleStyle}>{title}</span>
            <span css={[titleStyle, nameStyle]}>{userName}</span>
          </Flex>
          <Flex alignItems="center" css={menuWrapperStyle}>
            <Edit edit={editPost} remove={removePost} />
          </Flex>
        </Flex>
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
};

export default BoxListItem;
