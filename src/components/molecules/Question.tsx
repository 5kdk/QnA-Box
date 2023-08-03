import { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';
import { Avatar, Button, Flex, Toggler } from '../atom';
import loading from '../../assets/images/loading.png';

const questionCss = {
  wrapper: css`
    z-index: 10;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 448px;
    padding: 20px;
    gap: 10px;
    background-color: var(--white);
    box-shadow: 0px -10px 10px 1px var(--shadow);
  `,
  inputBox: css`
    display: flex;
    align-items: center;
    padding: 9px;
    gap: 9px;
    border: 2px solid var(--white);
    border-radius: 50px;
    background-color: var(--white);
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
  `,
};

const Question = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [question, setQuestion] = useState('');

  const handleQustionInput = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value);
  const setAnonymous = () => setIsAnonymous(pre => !pre);
  const createQuestion = () => console.log(question);

  return (
    <Flex css={questionCss.wrapper} flexDirection="column">
      <label css={questionCss.inputBox}>
        <Avatar src={loading} size="sm" />
        <input css={questionCss.input} placeholder="무엇이 궁금한가요?" onChange={handleQustionInput} />
      </label>
      <Flex justifyContent="space-between" alignItems="center">
        <Toggler selected={isAnonymous} setSelected={setAnonymous} text="익명으로 질문하기" />
        <Button text="질문 등록" color="var(--white)" bgColor="var(--black)" onClick={createQuestion} />
      </Flex>
    </Flex>
  );
};

export default Question;
