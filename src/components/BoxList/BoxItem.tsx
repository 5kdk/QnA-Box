import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { Flex, Edit, Text, Avatar } from '../atom';
import { InfoModal } from '../molecules';
import { EditBox } from '.';
import { LinkToUser } from '../Box';
import { userState } from '../../jotai/atom';
import { useRemoveMyBoxMutation } from '../../hooks/mutation';
import { Box } from '../../services/boxes';
import { getProfile } from '../../services/profile';

const BoxListCss = {
  wrapperStyle: css`
    padding: 12px 24px 24px 24px;
    min-height: 100px;
    gap: 15px;
    border-bottom: 1px solid var(--gray);
  `,
  titleStyle: css`
    width: fit-content;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
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
  const user = useAtomValue(userState);
  const [editModal, setEditModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const { mutate: remove } = useRemoveMyBoxMutation();

  const { data: userData } = useQuery({
    queryKey: ['user', boxInfo.ownerId],
    queryFn: () => getProfile(boxInfo.ownerId),
    staleTime,
  });

  const handleEditModal = () => setEditModal(pre => !pre);
  const handleRemoveModal = () => setRemoveModal(pre => !pre);
  const removePost = () => remove(boxInfo.boxId);

  return (
    <Flex css={BoxListCss.wrapperStyle} justifyContent="space-between">
      {editModal && <EditBox boxInfo={boxInfo} closeEdit={handleEditModal} />}
      {removeModal && (
        <InfoModal
          title={`${boxInfo.title}을(를) 삭제하시겠습니까?`}
          text="삭제 시 박스 복구가 불가합니다."
          normalBtn={{ text: '삭제', onClick: removePost }}
          importantBtn={{ text: '취소', onClick: handleRemoveModal }}
        />
      )}
      <Avatar size="sm" src={userData?.photoURL} />
      <Flex flexDirection="column" css={BoxListCss.flexStyle}>
        <Link css={BoxListCss.titleStyle} to={boxInfo.boxId}>
          {boxInfo.title}
        </Link>
        <LinkToUser name={userData?.displayName} uid={boxInfo.ownerId} />
        <Text>{boxInfo.description}</Text>
      </Flex>
      {user?.uid === boxInfo.ownerId && <Edit edit={handleEditModal} remove={handleRemoveModal} />}
    </Flex>
  );
};

export default BoxItem;
