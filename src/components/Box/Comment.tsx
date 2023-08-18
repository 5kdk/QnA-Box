import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { Reply as ReplyIcon } from '@emotion-icons/boxicons-regular';
import { FolderOpen as FolderOpenIcon } from '@emotion-icons/fa-regular';
import { Folder as FolderIcon } from '@emotion-icons/fa-solid';
import { Avatar, Edit, Flex, Text } from '../atom';
import { InfoModal } from '../molecules';
import { EditCommentForm, LinkToUser } from '.';
import { replyForState, userState } from '../../jotai/atom';
import { useUserInfo } from '../../hooks/query';
import { useRemoveCommentMutation, useRemoveReplyMutation } from '../../hooks/mutation';
import { displayTimeAgo } from '../../utils';
import { ReplyData } from '../../services/comments';

const commentCss = {
  wrapper: (reply: boolean) => css`
    position: relative;
    min-height: 80px;
    padding: 12px 24px;
    gap: 15px;
    background-color: ${reply ? 'var(--gray)' : 'white'};
  `,
  line: css`
    position: absolute;
    top: 47px;
    left: 41.5px;
    width: 1.5px;
    height: 100%;
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
  `,
  replyOpen: css`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    font-size: 14px;
  `,
};

interface CommentProps extends ReplyData {
  commentId: string;
  ownerId: string;
  replies?: ReplyData[];
  connectLine?: boolean;
}

const Comment = ({
  ownerId,
  authorId,
  commentId,
  content,
  createdAt,
  isAnonymous,
  replies,
  connectLine = false,
}: CommentProps) => {
  const user = useAtomValue(userState);
  const [replyFor, setReplyFor] = useAtom(replyForState);
  const [editMode, setEditMode] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [isOpenReply, setIsOpenReply] = useState(false);
  const { mutate: removeComment } = useRemoveCommentMutation();
  const { mutate: removeReply } = useRemoveReplyMutation();

  const authorInfo = useUserInfo(authorId);

  const handleEditForm = () => setEditMode(prev => !prev);
  const handleRemoveModal = () => setRemoveModal(pre => !pre);
  const removeContent = () => (replies ? removeComment(commentId) : removeReply({ commentId, createdAt }));

  const displayName = `${isAnonymous ? '익명' : authorInfo?.displayName}${replies ? '' : " 's reply"}`;
  const selectedComment = (replies && replyFor?.commentId === commentId) || false;
  const switchToCreateReply = () => setReplyFor({ commentAuthorName: displayName, commentId });
  const toggleReply = () => setIsOpenReply(prev => !prev);

  return (
    <>
      <Flex css={commentCss.wrapper(selectedComment)} justifyContent="space-between">
        {removeModal && (
          <InfoModal
            title={`${replies ? '질문' : '답글'}을 삭제하시겠습니까?`}
            text="삭제 시 복구가 불가합니다."
            normalBtn={{ text: '삭제', onClick: removeContent }}
            importantBtn={{ text: '취소', onClick: handleRemoveModal }}
          />
        )}
        {(connectLine || (replies && isOpenReply)) && <div css={commentCss.line} />}
        <Avatar size="sm" src={isAnonymous ? '' : authorInfo?.photoURL} />
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
            {replies && (
              <>
                <button css={commentCss.reply} title="답글 달기" onClick={switchToCreateReply}>
                  <ReplyIcon size="24px" color="var(--deep_gray)" />
                </button>
                {replies.length !== 0 && (
                  <span css={commentCss.replyOpen}>
                    <button title={!isOpenReply ? '답글 열기' : '답글 닫기'} onClick={toggleReply}>
                      {!isOpenReply ? (
                        <FolderIcon size={18} color="var(--deep_gray)" />
                      ) : (
                        <FolderOpenIcon size={18} color="var(--deep_gray)" />
                      )}
                    </button>
                    {replies.length}
                  </span>
                )}
              </>
            )}
          </Flex>
        </Flex>
        <Flex alignItems="baseline">
          <span css={commentCss.subText}>{displayTimeAgo(createdAt)}</span>
          {user?.uid === authorId && <Edit edit={handleEditForm} remove={handleRemoveModal} />}
        </Flex>
      </Flex>
      {isOpenReply &&
        replies?.map((reply, i) => (
          <Comment
            key={`${commentId} ${i}`}
            commentId={commentId}
            ownerId={ownerId}
            {...reply}
            connectLine={i !== replies.length - 1}
          />
        ))}
    </>
  );
};

export default Comment;
