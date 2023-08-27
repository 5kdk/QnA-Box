import { Suspense } from 'react';
import { css } from '@emotion/react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { ItemSkeleton, ItemWrapper } from '../molecules';
import { Flex, Text } from '../atom';
import { Comment } from '.';
import { useInfinityCommentQuery } from '../../hooks/query';

const commentCss = css`
  border-bottom: 1px solid var(--gray);
`;

const WrapperCss = css`
  min-height: 6.25rem;
`;

const Comments = ({ ownerId }: { ownerId: string }) => {
  const { data, fetchNextPage, hasNextPage } = useInfinityCommentQuery();

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: !!hasNextPage,
    onLoadMore: () => fetchNextPage(),
    disabled: false,
    rootMargin: '0px 0px 400px 0px',
  });

  const boxcomments = data?.pages.flatMap(page => page.data);

  return (
    <ItemWrapper>
      {boxcomments?.length !== 0 ? (
        boxcomments?.map(comment => (
          <Flex css={commentCss} flexDirection="column" key={`${comment.commentId}`}>
            <Suspense fallback={<ItemSkeleton num={comment.replies.length + 1} />}>
              <Comment ownerId={ownerId} {...comment} />
            </Suspense>
          </Flex>
        ))
      ) : (
        <Flex justifyContent="center" alignItems="center" css={WrapperCss}>
          <Text text="아직 작성된 질문이 없습니다" />
        </Flex>
      )}
      {hasNextPage && <ItemSkeleton ref={sentryRef} num={1} />}
    </ItemWrapper>
  );
};

export default Comments;
