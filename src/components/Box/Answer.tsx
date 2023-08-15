import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Avatar, Button, Flex, Note, Text, Toggler } from '../atom';
import { css, keyframes } from '@emotion/react';
import { createComment } from '../../services/comments';
import { globalWidthState, userState } from '../../jotai/atom/';

const Slide = keyframes`
    0%{
        transform : translateX(-50%) translateY(100%);
        
    }
    100%{
        transform : translateX(-50%) translateY(0);
    }
`;

const answerCss = {
  wrapper: (globalWidth: string) => css`
    z-index: 10;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: ${globalWidth};
    padding: 20px;
    gap: 10px;
    background-color: var(--white);
    box-shadow: 0px -10px 10px 1px var(--shadow);
    animation: ${Slide} 0.5s ease-in;
  `,
  inputBox: css`
    display: flex;
    align-items: center;
    padding: 9px;
    gap: 9px;
    border: 2px solid var(--light_gray);
    border-radius: 50px;
    background-color: var(--light_gray);
    &:focus-within {
      border-color: var(--blue);
    }
  `,
  input: css`
    width: 100%;
    border: none;
    outline: none;
    background-color: inherit;
    font-size: 15px;
    &::placeholder {
      color: var(--deep_gray);
    }
  `,
  note: css`
    padding-left: 9px;
  `,
  reply: css`
    color: var(--deep_gray);
    padding-left: 10px;
  `,
};

const Answer = ({ replyUser, replyComment, BoxId }: { replyUser: string; replyComment: string; BoxId: string }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const globalWidth = useAtomValue(globalWidthState);
  const [reply, setreply] = useState('');
  const user = useAtomValue(userState);
  const navigate = useNavigate();

  const handleQustionInput = (e: ChangeEvent<HTMLInputElement>) => setreply(e.target.value);

  const setAnonymous = () => setIsAnonymous(pre => !pre);

  const createReply = () => {
    createComment(BoxId, reply, replyComment, user?.displayName);
  };

  const ToSignin = () => {
    navigate('/signin');
  };

  return (
    <Flex css={answerCss.wrapper(globalWidth)} flexDirection="column">
      <Text css={answerCss.reply}>{`Reply to ${replyUser}`}</Text>
      <label css={answerCss.inputBox}>
        <Avatar src={user!.photoURL} size="sm" />
        <input css={answerCss.input} placeholder="어떤 답변인가요?" onChange={handleQustionInput} />
      </label>
      <Flex justifyContent="space-between" alignItems="center">
        {user ? (
          <Toggler selected={isAnonymous} setSelected={setAnonymous} text="익명으로 답변하기" />
        ) : (
          <Note css={answerCss.note} text="로그인 하기" onClick={ToSignin} />
        )}
        <Button text="답변 등록" color="var(--white)" bgColor="var(--black)" onClick={createReply} />
      </Flex>
    </Flex>
  );
};

export default Answer;
