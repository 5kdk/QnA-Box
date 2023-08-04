import { css } from '@emotion/react';
import { Flex, Edit, Text, Avatar } from '../atom';

const BoxListCss = {
  wrapperStyle: css`
    padding: 12px 24px 24px 24px;
    min-height: 100px;
    width: 448px;
    gap: 15px;
    border-bottom: 1px solid var(--gray);
  `,
  titleStyle: css`
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 700;
  `,
  nameStyle: css`
    font-size: 13px;
  `,
  menuWrapperStyle: css`
    position: relative;
  `,
  flexStyle: css`
    width: 100%;
  `,
};

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
    <Flex css={BoxListCss.wrapperStyle} justifyContent="space-between">
      <Avatar size="sm" src={imgUrl} />
      <Flex flexDirection="column" css={BoxListCss.flexStyle}>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex flexDirection="column">
            <span css={BoxListCss.titleStyle}>{title}</span>
            <span css={[BoxListCss.titleStyle, BoxListCss.nameStyle]}>{userName}</span>
          </Flex>
          <Flex alignItems="center" css={BoxListCss.menuWrapperStyle}>
            <Edit edit={editPost} remove={removePost} />
          </Flex>
        </Flex>
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
};

export default BoxListItem;
