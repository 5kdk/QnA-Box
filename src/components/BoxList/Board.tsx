import { css } from '@emotion/react';
import useMyListQuery from '../../hooks/query/useMyListQuery';
import { BoxItem } from '.';
import { MainFilter } from '../pages/BoxList';
import { Flex, Text } from '../atom';
import { ItemWrapper } from '../molecules';
import { filterState, searchInputState } from '../../jotai/atom';
import { useAtomValue } from 'jotai';

const WrapperCss = css`
  min-height: 6.25rem;
`;

interface BoxListBodyProps {
  boxFilter: MainFilter;
}

const Board = ({ boxFilter }: BoxListBodyProps) => {
  const boxList = useMyListQuery(boxFilter);
  const filter = useAtomValue(filterState);
  const searchInput = useAtomValue(searchInputState);

  const filteredBoxList = () => {
    const sorted =
      filter === '최신순'
        ? boxList.sort((a, b) => a.createdAt - b.createdAt)
        : boxList.sort((a, b) => b.createdAt - a.createdAt);

    if (searchInput) {
      const searchString = searchInput.trim().toLowerCase();
      const regex = new RegExp(searchString);
      return sorted.filter(box => regex.test(box.title.toLowerCase()) || regex.test(box.owner.toLowerCase()));
    }

    return sorted;
  };

  return (
    <ItemWrapper>
      {boxList?.length !== 0 ? (
        filteredBoxList().length !== 0 ? (
          filteredBoxList().map(({ boxId, owner, ownerUid, title, description }) => (
            <BoxItem title={title} owner={owner} text={description} ownerUid={ownerUid} key={boxId} />
          ))
        ) : (
          <Flex justifyContent="center" alignItems="center" css={WrapperCss}>
            <Text>검색 결과가 없습니다.</Text>
          </Flex>
        )
      ) : (
        <Flex justifyContent="center" alignItems="center" css={WrapperCss}>
          <Text>{boxFilter === 'joined' ? '아직 참여한 Box가 없습니다.' : '새로운 QnA Box를 만들어 보세요!'}</Text>
        </Flex>
      )}
    </ItemWrapper>
  );
};

export default Board;
