import { useState } from 'react';
import { css } from '@emotion/react';
import { Box } from '../../services/boxes';
import { Filter, Flex, Text, Title } from '../atom';
import { InfoCircle } from 'emotion-icons/boxicons-regular';

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
  onwer: css`
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

  const date = new Date(boxdetail.createdAt);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;

  return (
    <div css={boxInfoCss.wrapper}>
      <Flex alignItems="center" css={boxInfoCss.subWrapper}>
        <Title text={boxdetail.title} css={boxInfoCss.title} />
        <button aria-label="더 많은 Box 정보 보기">
          <InfoCircle size="18px" onClick={() => setMoreInfo(prev => !prev)} />
        </button>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" css={boxInfoCss.subWrapper}>
        <Flex flexDirection="column" css={[boxInfoCss.info]}>
          <Text css={boxInfoCss.onwer}>{boxdetail.owner}</Text>
          {moreInfo && (
            <>
              <Text>{boxdetail.description}</Text>
              <Text>{`생성된 날짜: ${formattedDate}`}</Text>
            </>
          )}
        </Flex>
        <Filter />
      </Flex>
    </div>
  );
};

export default BoxInfo;
