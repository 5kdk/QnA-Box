import { editPswdSchema, editPswdSchemaType } from '../schema';
import { updateUserPassword } from '../services/auth';

const formPassword = [
  { text: '기존 비밀번호', key: 'prePassword', type: 'password' },
  { text: '새 비밀번호', key: 'password', type: 'password' },
  { text: '비밀번호 확인', key: 'passwordCheck', type: 'password' },
];

const useEditPassword = () => {
  const editPswd = (data: editPswdSchemaType) => updateUserPassword(data.prePassword, data.password);
  const editForm = {
    formElement: formPassword,
    formSchema: editPswdSchema,
    btnSettings: { text: '비밀번호 변경', color: 'var(--white)', bgColor: 'var(--black)' },
    submitFunc: editPswd,
  };

  return { editForm };
};

export default useEditPassword;
