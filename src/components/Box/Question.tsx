import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { css, keyframes } from '@emotion/react';
import { Avatar, Button, Flex, Toggler, Note } from '../atom';
import { globalWidthState, userState } from '../../jotai/atom/';
import { useCreateCommentMutation } from '../../hooks/mutation';

const Slide = keyframes`
    0%{
        transform : translateX(-50%) translateY(100%);
        
    }
    100%{
        transform : translateX(-50%) translateY(0);
    }
`;

const questionCss = {
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
};

const Question = () => {
  const user = useAtomValue(userState);
  const isDefaultEnabledForAnonymous = user ? false : true;
  const [isAnonymous, setIsAnonymous] = useState(isDefaultEnabledForAnonymous);

  const [question, setQuestion] = useState('');
  const { mutate: addQuestion } = useCreateCommentMutation();
  const globalWidth = useAtomValue(globalWidthState);
  const navigate = useNavigate();

  const handleQustionInput = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value);

  const toggleAnonymous = () => setIsAnonymous(pre => !pre);

  const createQuestion = () => {
    addQuestion({ question, isAnonymous });
    setQuestion('');
  };

  const ToSignin = () => {
    navigate('/signin');
  };

  return (
    <Flex css={questionCss.wrapper(globalWidth)} flexDirection="column">
      <label css={questionCss.inputBox}>
        <Avatar src={user?.photoURL} size="sm" />
        <input
          css={questionCss.input}
          placeholder="무엇이 궁금한가요?"
          value={question}
          onChange={handleQustionInput}
        />
      </label>
      <Flex justifyContent="space-between" alignItems="center">
        {user ? (
          <Toggler selected={isAnonymous} setSelected={toggleAnonymous} text="익명으로 질문하기" />
        ) : (
          <Note css={questionCss.note} text="로그인 하기" onClick={ToSignin} />
        )}
        <Button text="질문 등록" color="var(--white)" bgColor="var(--black)" onClick={createQuestion} />
      </Flex>
    </Flex>
  );
};

export default Question;
