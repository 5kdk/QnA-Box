import { useState } from 'react';
import { css } from '@emotion/react';
import { Box } from '../../services/boxes';
import { Flex, Text, Title } from '../atom';
import { InfoCircle } from 'emotion-icons/boxicons-regular';

const boxInfoCss = {
  wrapper: css`
    padding: 10px 20px 0 20px;
    gap: 10px;
  `,
  title: css`
    max-width: 350px;
    text-overflow: ellipsis;
  `,
  onwer: css`
    font-size: 16px;
    font-weight: 500;
    padding: 0 0 5px 3px;
  `,
  info: css`
    color: var(--deep_gray);
    padding-left: 3px;
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
    <>
      <Flex alignItems="center" css={boxInfoCss.wrapper}>
        <Title text={boxdetail.title} css={boxInfoCss.title} />
        <button aria-label="더 많은 Box 정보 보기">
          <InfoCircle size="18px" onClick={() => setMoreInfo(prev => !prev)} />
        </button>
      </Flex>
      <div css={boxInfoCss.wrapper}>
        <Text css={boxInfoCss.onwer}>{boxdetail.owner}</Text>
        <Flex flexDirection="column" css={[boxInfoCss.info]}>
          {moreInfo && (
            <>
              <Text>{boxdetail.description}</Text>
              <Text>{`생성된 날짜: ${formattedDate}`}</Text>
            </>
          )}
        </Flex>
      </div>
    </>
  );
};

export default BoxInfo;
