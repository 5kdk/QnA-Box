import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { Link } from '@emotion-icons/heroicons-outline';
import { InfoCircle } from 'emotion-icons/boxicons-regular';
import { Filter, Flex, Text, Title } from '../atom';
import { JoinOrExit } from '.';
import { userState } from '../../jotai/atom';
import { useUserInfo } from '../../hooks/query';
import { Box } from '../../services/boxes';

const boxInfoCss = {
  wrapper: css`
    padding: 10px 20px;
  `,
  subWrapper: css`
    gap: 10px;
    margin: 5px 0;
  `,
  title: css`
    max-width: 350px;
    text-overflow: ellipsis;
  `,
  owner: css`
    padding: 8px 0;
    font-size: 16px;
    font-weight: 500;
  `,
  info: css`
    color: var(--deep_gray);
    gap: 5px;
  `,
};

const BoxInfo = ({ boxdetail }: { boxdetail: Box }) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const boxOwner = useUserInfo(boxdetail.ownerId);
  const user = useAtomValue(userState);

  const handleCopyClipBoard = () =>
    navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/box/${boxdetail.boxId}`);

  const date = new Date(boxdetail.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;
  const joinedType = user?.joinedBoxes.includes(boxdetail.boxId) ? 'exit' : 'join';

  return (
    <div css={boxInfoCss.wrapper}>
      <Flex justifyContent="space-between">
        <Flex css={boxInfoCss.subWrapper} alignItems="center">
          <Title text={boxdetail.title} css={boxInfoCss.title} />
          <button title="Box 정보" aria-label="더 많은 Box 정보 보기">
            <InfoCircle size="18px" onClick={() => setMoreInfo(prev => !prev)} />
          </button>
        </Flex>
        <Flex css={boxInfoCss.subWrapper} alignItems="center">
          <JoinOrExit type={joinedType} boxId={boxdetail.boxId} />
          <button title="링크 복사" aria-label="링크 복사" onClick={handleCopyClipBoard}>
            <Link size={20} />
          </button>
        </Flex>
      </Flex>
      <Flex alignItems="flex-start" justifyContent="space-between" css={boxInfoCss.subWrapper}>
        <Flex flexDirection="column" css={[boxInfoCss.info]}>
          <Text css={boxInfoCss.owner} text={boxOwner?.displayName} />
          {moreInfo && (
            <>
              <Text text={boxdetail.description} />
              <Text text={`생성된 날짜: ${formattedDate}`} />
            </>
          )}
        </Flex>
        <Filter />
      </Flex>
    </div>
  );
};

export default BoxInfo;
