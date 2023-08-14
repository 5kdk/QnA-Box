import { useState } from 'react';
import { Avatar, Edit, Flex, Text } from '../atom';
import { css } from '@emotion/react';
// import { Reply } from '@emotion-icons/boxicons-regular/';
import EditCommentForm from './EditCommentForm';
import { displayTimeAgo } from '../../utils';
import { useUserInfo } from '../../hooks/query';
import { useRemoveCommentMutation } from '../../hooks/mutation';
import { Reply as ReplyIcon } from 'emotion-icons/boxicons-regular';

const boxItemCss = {
  wrapper: (reply: boolean) => css`
    min-height: 100px;
    padding: 12px 24px;
    gap: 15px;
    background-color: ${reply ? 'var(--gray)' : 'white'};
  `,
  line: css`
    width: 1.5px;
    height: calc(100% + 30px);
    margin-top: 10px;
    margin-bottom: -10px;
    background-color: var(--gray);
  `,
  question: css`
    width: 100%;
  `,
  name: css`
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 14px;
    color: var(--deep_gray);
  `,
  ownerName: css`
    color: var(--blue);
  `,
  menuWrapper: css`
    position: relative;
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

interface CommentProps {
  commentId: string;
  authorId: string | undefined;
  ownerId: string;
  content: string;
  likes: number;
  createdAt: number;
  replies: [];
  isAnonymous: boolean;
  activateReplyMode: (commentOwnerName: string, commentId: string) => void;
}

const Comment = ({
  ownerId,
  authorId,
  commentId,
  content,
  likes,
  createdAt,
  isAnonymous,
  replies = [],
  activateReplyMode,
}: CommentProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const commentOwner = useUserInfo(authorId);
  const { mutate: remove } = useRemoveCommentMutation();

  const handleModify = () => {
    setIsEdit(prev => !prev);
  };

  const removePost = () => {
    remove(commentId);
  };

  const displayName = isAnonymous ? '익명' : commentOwner?.displayName;

  return (
    <>
      <Flex css={boxItemCss.wrapper(false)} justifyContent="space-between">
        <Flex alignItems="center" flexDirection="column">
          <Avatar size="sm" src={isAnonymous ? '' : commentOwner?.photoURL} />
          {replies.length !== 0 && <div css={boxItemCss.line}></div>}
        </Flex>
        <Flex flexDirection="column" css={boxItemCss.question}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Flex>
              <span
                css={!isAnonymous && ownerId === authorId ? [boxItemCss.name, boxItemCss.ownerName] : boxItemCss.name}>
                {displayName}
              </span>
            </Flex>
            <Flex alignItems="center" css={boxItemCss.menuWrapper}>
              <span css={boxItemCss.subText}>{displayTimeAgo(createdAt)}</span>
              {ownerId === authorId && <Edit edit={handleModify} remove={removePost} />}
            </Flex>
          </Flex>
          {isEdit ? (
            <EditCommentForm text={content} commentId={commentId} setIsEdit={setIsEdit} handleCancle={handleModify} />
          ) : (
            <Text>{content}</Text>
          )}
          <Flex alignItems="center" css={boxItemCss.like}>
            {likes !== 0 && <span css={boxItemCss.subText}>{`${likes} likes`}</span>}
            <button css={boxItemCss.reply} onClick={() => activateReplyMode(displayName!, commentId)}>
              <ReplyIcon size="20px" />
            </button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Comment;
