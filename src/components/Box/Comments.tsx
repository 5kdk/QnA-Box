import { css } from '@emotion/react';
import { Suspense } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { ItemSkeleton, ItemWrapper } from '../molecules';
import { Flex } from '../atom';
import { Comment } from '.';
import { useInfinityCommentQuery } from '../../hooks/query';

const flexStyle = css`
  border-bottom: 1px solid var(--gray);
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
      {boxcomments?.map(({ authorId, commentId, content, likes, replies, createdAt, isAnonymous }, i) => (
        <Flex css={flexStyle} flexDirection="column" key={`${commentId} ${i}`}>
          <Suspense fallback={<ItemSkeleton num={5} />}>
            <Comment
              ownerId={ownerId}
              authorId={authorId}
              content={content}
              createdAt={createdAt}
              commentId={commentId}
              likes={likes}
              isAnonymous={isAnonymous}
              replies={replies}
            />
          </Suspense>
        </Flex>
      ))}
      {hasNextPage && <ItemSkeleton ref={sentryRef} num={1} />}
    </ItemWrapper>
  );
};

export default Comments;
