import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { Reply as ReplyIcon } from 'emotion-icons/boxicons-regular';
import { Avatar, Edit, Flex, Text } from '../atom';
import { EditCommentForm, LinkToUser } from '.';
import { userState } from '../../jotai/atom';
import { useUserInfo } from '../../hooks/query';
import { useRemoveCommentMutation, useRemoveReplyMutation } from '../../hooks/mutation';
import { displayTimeAgo } from '../../utils';
import { ReplyData } from '../../services/comments';

const commentCss = {
  wrapper: (reply: boolean) => css`
    min-height: 100px;
    padding: 12px 24px;
    gap: 15px;
    background-color: ${reply ? 'var(--gray)' : 'white'};
  `,
  avatarWrapper: css`
    position: relative;
  `,
  line: css`
    position: absolute;
    top: -70px;
    width: 1.5px;
    height: 50px;
    margin: 10px 0;
    background-color: var(--gray);
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

interface CommentProps extends ReplyData {
  commentId: string;
  ownerId: string;
  replies?: ReplyData[];
  activateReplyMode: (commentOwnerName: string, commentId: string) => void;
}

const Comment = ({
  ownerId,
  authorId,
  commentId,
  content,
  createdAt,
  isAnonymous,
  replies,
  activateReplyMode,
}: CommentProps) => {
  const user = useAtomValue(userState);
  const [editMode, setEditMode] = useState(false);
  const { mutate: removeComment } = useRemoveCommentMutation();
  const { mutate: removeReply } = useRemoveReplyMutation();

  const authorInfo = useUserInfo(authorId);

  const handleEditForm = () => setEditMode(prev => !prev);
  const removeContent = () => (replies ? removeComment(commentId) : removeReply({ commentId, createdAt }));

  const displayName = `${isAnonymous ? '익명' : authorInfo?.displayName}${!replies ? " 's reply" : ''}`;
  const setReplyMode = () => activateReplyMode(displayName!, commentId);

  const [isOpenReply, setIsOpenReply] = useState(false);
  const toggleReply = () => setIsOpenReply(prev => !prev);
  return (
    <>
      <Flex css={commentCss.wrapper(false)} justifyContent="space-between">
        <Flex css={commentCss.avatarWrapper} alignItems="center" flexDirection="column">
          {!replies && <div css={commentCss.line} />}
          <Avatar size="sm" src={isAnonymous ? '' : authorInfo?.photoURL} />
        </Flex>
        <Flex flexDirection="column" css={commentCss.question}>
          <LinkToUser name={displayName} uid={authorId} color={!isAnonymous && ownerId === authorId && 'blue'} />
          {editMode ? (
            <EditCommentForm
              text={content}
              commentId={commentId}
              handleForm={handleEditForm}
              isReply={!replies}
              createdAt={!replies ? createdAt : undefined}
            />
          ) : (
            <Text>{content}</Text>
          )}
          <Flex alignItems="center" css={commentCss.like}>
            <button title="답글 달기" css={commentCss.reply} onClick={setReplyMode}>
              <ReplyIcon size="20px" />
            </button>
            {replies && replies.length !== 0 && (
              <button onClick={toggleReply}>{!isOpenReply ? '답글 열기' : '답글 닫기'}</button>
            )}
          </Flex>
        </Flex>
        <Flex alignItems="baseline">
          <span css={commentCss.subText}>{displayTimeAgo(createdAt)}</span>
          {user?.uid === authorId && <Edit edit={handleEditForm} remove={removeContent} />}
        </Flex>
      </Flex>
      {isOpenReply &&
        replies?.map((reply, i) => (
          <Comment
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
