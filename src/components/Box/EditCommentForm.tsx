import { ChangeEvent, useState } from 'react';
import { Flex } from '../atom';
import Note from '../atom/Note';
import { css } from '@emotion/react';

const EditFormCss = {
  textarea: css`
    padding: 5px;
    height: 100px;
    border: 0.5px solid var(--gray);
    border-radius: 5px;
    resize: none;
    background-color: var(--light_gray);
    :focus {
      outline: none;
    }
  `,
  note: css`
    font-size: 13px;
    margin: 5px;
  `,
};

type EditProps = {
  handleModify: () => void;
  handleCancle: () => void;
  text: string;
};

const EditCommentForm = ({ text, handleModify, handleCancle }: EditProps) => {
  const [input, setInput] = useState(text);
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  return (
    <Flex flexDirection="column">
      <textarea css={EditFormCss.textarea} onChange={handleInput} value={input} />
      <Flex alignItems="center" justifyContent="flex-end">
        <Note css={EditFormCss.note} text="수정" onClick={handleModify} />
        <Note css={EditFormCss.note} text="취소" onClick={handleCancle} />
      </Flex>
    </Flex>
  );
};

export default EditCommentForm;
