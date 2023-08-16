import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { Reply as ReplyIcon } from 'emotion-icons/boxicons-regular';
import { Avatar, Edit, Flex, Text } from '../atom';
import { Reply, EditCommentForm, LinkToUser } from '.';
import { userState } from '../../jotai/atom';
import { useUserInfo } from '../../hooks/query';
import { useRemoveCommentMutation } from '../../hooks/mutation';
import { displayTimeAgo } from '../../utils';
import { CommentData } from '../../services/comments';

const commentCss = {
  wrapper: (reply: boolean) => css`
    min-height: 100px;
    padding: 12px 24px;
    gap: 15px;
    background-color: ${reply ? 'var(--gray)' : 'white'};
  `,
  question: css`
    width: 100%;
  `,
  subText: css`
    margin-right: 5px;
    font-size: 12px;
    font-weight: 400;
    color: var(--deep_gray);
  `,
  like: css`
    margin: 10px 0 12px 0;
    gap: 5px;
  `,
  reply: css`
    rotate: 180deg;
    padding-bottom: 3px;
  `,
};

interface CommentProps extends CommentData {
  ownerId: string;
  activateReplyMode: (commentOwnerName: string, commentId: string) => void;
}

const Comment = ({
  ownerId,
  authorId,
  commentId,
  content,
  createdAt,
  isAnonymous,
  replies = [],
  activateReplyMode,
}: CommentProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenReply, setIsOpenReply] = useState(false);
  const user = useAtomValue(userState);
  const commentOwner = useUserInfo(authorId);
  const { mutate: remove } = useRemoveCommentMutation();

  const handleEditForm = () => setIsEditMode(prev => !prev);
  const removeComment = () => remove(commentId);
  const toggleReply = () => setIsOpenReply(prev => !prev);

  const displayName = isAnonymous ? '익명' : commentOwner?.displayName;

  return (
    <>
      <Flex css={commentCss.wrapper(false)} justifyContent="space-between">
        <Avatar size="sm" src={isAnonymous ? '' : commentOwner?.photoURL} />
        <Flex flexDirection="column" css={commentCss.question}>
          <LinkToUser name={displayName} uid={authorId} color={!isAnonymous && ownerId === authorId && 'blue'} />
          {isEditMode ? (
            <EditCommentForm text={content} commentId={commentId} handleForm={handleEditForm} />
          ) : (
            <Text>{content}</Text>
          )}
          <Flex alignItems="center" css={commentCss.like}>
            <button title="답글 달기" css={commentCss.reply} onClick={() => activateReplyMode(displayName!, commentId)}>
              <ReplyIcon size="20px" />
            </button>
            {replies.length !== 0 && <button onClick={toggleReply}>{!isOpenReply ? '답글 열기' : '답글 닫기'}</button>}
          </Flex>
        </Flex>
        <Flex alignItems="baseline">
          <span css={commentCss.subText}>{displayTimeAgo(createdAt)}</span>
          {user?.uid === authorId && <Edit edit={handleEditForm} remove={removeComment} />}
        </Flex>
      </Flex>
      {isOpenReply &&
        replies.map((reply, i) => (
          <Reply
            key={`${commentId} ${i}`}
            commentId={commentId}
            ownerId={ownerId}
            activateReplyMode={activateReplyMode}
            {...reply}
          />
        ))}
    </>
  );
};

export default Comment;
