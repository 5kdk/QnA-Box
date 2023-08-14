import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Flex } from '../atom';
import Note from '../atom/Note';
import { css } from '@emotion/react';
import { useUpdateCommentMutation } from '../../hooks/mutation';

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
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  handleCancle: () => void;
  text: string;
  commentId: string;
};

const EditCommentForm = ({ text, commentId, setIsEdit, handleCancle }: EditProps) => {
  const [input, setInput] = useState(text);
  const { mutate: update } = useUpdateCommentMutation();

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const submitModify = () => {
    update({ commentId, input });
    setIsEdit(false);
  };

  return (
    <Flex flexDirection="column">
      <textarea css={EditFormCss.textarea} onChange={handleInput} value={input} />
      <Flex alignItems="center" justifyContent="flex-end">
        <Note css={EditFormCss.note} text="수정" onClick={submitModify} />
        <Note css={EditFormCss.note} text="취소" onClick={handleCancle} />
      </Flex>
    </Flex>
  );
};

export default EditCommentForm;
