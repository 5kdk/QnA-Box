import { useState } from 'react';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { useMyListQuery } from '../../hooks/query/';
import { BoxItem, Pagenation } from '.';
import { Flex, Text } from '../atom';
import { ItemWrapper } from '../molecules';
import { filterState, searchInputState } from '../../jotai/atom';

const WrapperCss = css`
  min-height: 6.25rem;
`;

const Board = () => {
  const [page, setPage] = useState(1);
  const boxList = useMyListQuery();
  const filter = useAtomValue(filterState);
  const searchInput = useAtomValue(searchInputState);

  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;

  const filterBoxList = () => {
    const sorted =
      filter.subFilter !== '최신순'
        ? boxList.sort((a, b) => a.createdAt - b.createdAt)
        : boxList.sort((a, b) => b.createdAt - a.createdAt);

    if (searchInput) {
      const searchString = searchInput.trim().toLowerCase();
      const regex = new RegExp(searchString);
      return sorted.filter(box => regex.test(box.title.toLowerCase()));
    }

    return sorted;
  };

  const filteredBoxList = filterBoxList();
  const slicedBoxList = filteredBoxList.slice(startIndex, endIndex);

  return (
    <>
      <ItemWrapper>
        {boxList.length !== 0 ? (
          filteredBoxList.length !== 0 ? (
            slicedBoxList.map(box => <BoxItem boxInfo={box} key={box.boxId} />)
          ) : (
            <Flex justifyContent="center" alignItems="center" css={WrapperCss}>
              <Text text="검색 결과가 없습니다." />
            </Flex>
          )
        ) : (
          <Flex justifyContent="center" alignItems="center" css={WrapperCss}>
            <Text
              text={filter.mainFilter === 'joined' ? '아직 참여한 Box가 없습니다' : '새로운 QnA Box를 만들어 보세요!'}
            />
          </Flex>
        )}
      </ItemWrapper>
      {filteredBoxList.length > 5 && (
        <Pagenation itemsLen={filteredBoxList.length} currentPage={page} setPage={setPage} />
      )}
    </>
  );
};

export default Board;
