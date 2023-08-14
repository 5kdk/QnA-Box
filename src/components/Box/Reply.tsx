import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Edit, Flex, Text } from '../atom';
import { css } from '@emotion/react';
import EditCommentForm from './EditCommentForm';
import { displayTimeAgo } from '../../utils';
import { CommentData, deleteComment } from '../../services/comments';
import { Reply as ReplyIcon } from 'emotion-icons/boxicons-regular';
import { useUserInfo } from '../../hooks/query';

const boxItemCss = {
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

export interface Comments extends CommentData {
  owner: string;
  setReplyComment: Dispatch<SetStateAction<string>>;
  setReplyUser: Dispatch<SetStateAction<string>>;
  replyComment: string;
}

const Reply = ({
  commentId,
  ownerId,
  authorId,
  content,
  createdAt,
  isAnonymous,
  activateReplyMode,
}: {
  commentId: string;
  ownerId: string;
  authorId: string | undefined;
  isAnonymous: boolean;
  content: string;
  createdAt: number;
  activateReplyMode: (commentOwnerName: string, commentId: string) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const replyAuthor = useUserInfo(authorId);

  const handleModify = () => {
    setIsEdit(prev => !prev);
  };

  const removePost = () => {
    deleteComment(commentId);
  };

  const displayName = `${isAnonymous ? '익명' : replyAuthor?.displayName} 's reply`;

  return (
    <>
      <Flex css={boxItemCss.wrapper(false)} justifyContent="space-between">
        <Flex css={boxItemCss.avatarWrapper} alignItems="center" flexDirection="column">
          <div css={boxItemCss.line}></div>
          <Avatar size="sm" src={isAnonymous ? '' : replyAuthor?.photoURL} />
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
            <EditCommentForm
              text={content}
              commentId={commentId}
              setIsEdit={setIsEdit}
              handleCancle={handleModify}
              isReply={true}
              createdAt={createdAt}
            />
          ) : (
            <Text>{content}</Text>
          )}
          <Flex alignItems="center" css={boxItemCss.like}>
            <button css={boxItemCss.reply} onClick={() => activateReplyMode(displayName!, commentId)}>
              <ReplyIcon size="20px" />
            </button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Reply;
