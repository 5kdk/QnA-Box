import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { Flex, Edit, Text, Avatar } from '../atom';
import { EditBox } from '.';
import { getProfile } from '../../services/profile';
import { Box } from '../../services/boxes';
import { useRemoveMyBoxMutation } from '../../hooks/mutation';
import { useNavigate } from 'react-router-dom';

const BoxListCss = {
  wrapperStyle: css`
    padding: 12px 24px 24px 24px;
    min-height: 100px;
    gap: 15px;
    border-bottom: 1px solid var(--gray);
  `,
  titleStyle: css`
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
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

const staleTime = 3000;

interface BoxListItemProps {
  boxInfo: Box;
}

const BoxItem = ({ boxInfo }: BoxListItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const { mutate: remove } = useRemoveMyBoxMutation();
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ['user', boxInfo.ownerId],
    queryFn: () => getProfile(boxInfo.ownerId),
    staleTime,
  });

  const navigateToDetail = () => {
    navigate(boxInfo.boxId);
  };

  const editPost = () => {
    console.log('edit');
    setEditMode(true);
  };

  const removePost = () => {
    remove(boxInfo.boxId);
  };

  const closeEdit = () => {
    setEditMode(false);
  };

  return (
    <Flex css={BoxListCss.wrapperStyle} justifyContent="space-between">
      {editMode && <EditBox boxId={boxInfo.boxId} boxInfo={boxInfo} closeEdit={closeEdit} />}
      <Avatar size="sm" src={userData ? userData.photoURL : ''} />
      <Flex flexDirection="column" css={BoxListCss.flexStyle}>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex flexDirection="column">
            <button css={BoxListCss.titleStyle} onClick={navigateToDetail}>
              {boxInfo.title}
            </button>
            <span css={[BoxListCss.titleStyle, BoxListCss.nameStyle]}>{userData?.displayName}</span>
          </Flex>
          <Flex alignItems="center" css={BoxListCss.menuWrapperStyle}>
            <Edit edit={editPost} remove={removePost} />
          </Flex>
        </Flex>
        <Text>{boxInfo.description}</Text>
      </Flex>
    </Flex>
  );
};

export default BoxItem;
