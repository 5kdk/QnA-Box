import { css } from '@emotion/react';
import useMyListQuery from '../../hooks/query/useMyListQuery';
import { BoxItem, Boxes } from '.';
import { MainFilter } from '../pages/BoxList';
import { Flex, Text } from '../atom';

const WrapperCss = css`
  min-height: 6.25rem;
`;

interface BoxListBodyProps {
  boxFilter: MainFilter;
}

const Board = ({ boxFilter }: BoxListBodyProps) => {
  const boxList = useMyListQuery(boxFilter);

  return (
    <Boxes>
      {boxList?.length !== 0 ? (
        boxList.map(({ boxId, owner, ownerUid, title, description }) => (
          <BoxItem title={title} owner={owner} text={description} ownerUid={ownerUid} key={boxId} />
        ))
      ) : (
        <Flex justifyContent="center" alignItems="center" css={WrapperCss}>
          <Text>{boxFilter === 'joined' ? '아직 참여한 Box가 없습니다.' : '새로운 QnA Box를 만들어 보세요!'}</Text>
        </Flex>
      )}
    </Boxes>
  );
};

export default Board;
