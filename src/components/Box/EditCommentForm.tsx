import { ChangeEvent, useState } from 'react';
import { Flex, Note } from '../atom';
import { css } from '@emotion/react';
import { useUpdateCommentMutation, useUpdateReplyMutaion } from '../../hooks/mutation';

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
  handleForm: () => void;
  text: string;
  commentId: string;
  isReply?: boolean;
  createdAt?: number;
};

const EditCommentForm = ({ text, commentId, handleForm, isReply = false, createdAt }: EditProps) => {
  const [input, setInput] = useState(text);
  const { mutate: updateComment } = useUpdateCommentMutation();
  const { mutate: updateReply } = useUpdateReplyMutaion();

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const submitModify = () => {
    if (isReply && createdAt) {
      updateReply({ commentId, input, createdAt });
    } else {
      updateComment({ commentId, input });
    }
    handleForm();
  };

  return (
    <Flex flexDirection="column">
      <textarea css={EditFormCss.textarea} onChange={handleInput} value={input} />
      <Flex alignItems="center" justifyContent="flex-end">
        <Note css={EditFormCss.note} text="수정" onClick={submitModify} />
        <Note css={EditFormCss.note} text="취소" onClick={handleForm} />
      </Flex>
    </Flex>
  );
};

export default EditCommentForm;
