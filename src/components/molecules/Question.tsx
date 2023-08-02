import { useState } from 'react';
import { css } from '@emotion/react';
import Toggler from '../atom/Toggler';
import Button from '../atom/Button';
import Flex from '../atom/Flex';
import Avartar from '../atom/Avartar';
import loading from '../../assets/images/loading.png';

const inputCss = css({
  gap: '9px',
  backgroundColor: '#F0F0F0',
  borderRadius: '50px',
  padding: '9px',
  '> input': {
    width: '100%',
    border: 'none',
    backgroundColor: 'inherit',
    fontSize: '15px',
    outline: 'none',
  },
});

const questionCss = css({
  position: 'fixed',
  bottom: '0',
  zIndex: '10',
  width: '100%',
  gap: '10px',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0px -10px 10px 1px rgba(0, 0, 0, 0.10)',
});

const Question = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [question, setQuestion] = useState('');

  return (
    <Flex css={questionCss} flexDirection="column">
      <Flex css={inputCss} alignItems="center">
        <Avartar src={loading} size="sm" />
        <input placeholder="무엇이 궁금한가요?" onChange={e => setQuestion(e.target.value)} />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Toggler selected={isAnonymous} setSelected={setIsAnonymous} text="익명으로 질문하기" />
        <Button text="질문 등록" color="white" bgColor="black" onClick={() => console.log(question)} />
      </Flex>
    </Flex>
  );
};

export default Question;
