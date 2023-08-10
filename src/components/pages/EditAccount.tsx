import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { Avatar, Flex } from '../atom';
import { InfoSubject } from '../User';
import { AttachFile, UserEditForm } from '../Account';
import { userState } from '../../jotai/atom';
import useImgFile from '../../hooks/useImgFile';
import { editPswdSchemaType, editPswdSchema } from '../../schema';
import { updateUserAvartar, updateUserDisplayName } from '../../services/profile';
import { updateUserPassword } from '../../services/auth';

const editCss = {
  wrapper: css`
    margin: 0 40px;
    padding-top: 64px;
    gap: 48px;
  `,
  account: css`
    gap: 22px;
  `,
};

const formPassword = [
  { text: '기존 비밀번호', key: 'prePassword', type: 'password' },
  { text: '새 비밀번호', key: 'password', type: 'password' },
  { text: '비밀번호 확인', key: 'passwordCheck', type: 'password' },
];

const formName = [{ text: 'DisplayName', key: 'displayName', type: 'text' }];
interface NameType {
  displayName: string;
}

const EditAccount = () => {
  const user = useAtomValue(userState);
  const { setNewImg, imgBuffer, imgFile } = useImgFile(user!.photoURL);
  const { target } = useParams();
  const navigate = useNavigate();
  const editImgName = async (data: NameType) => {
    if (imgFile && user!.photoURL !== imgBuffer) await updateUserAvartar(user!.uid, imgFile);
    if (user!.displayName !== data.displayName) await updateUserDisplayName(user!.uid, data.displayName);
  };

  const editPswd = (data: editPswdSchemaType) => updateUserPassword(data.prePassword, data.password);

  useEffect(() => {
    if (target && target !== 'profile' && target !== 'password') {
      navigate('/error');
    }
  }, [target, navigate]);

  return (
    <Flex css={editCss.wrapper} flexDirection="column">
      <Flex css={editCss.account} flexDirection="column" alignItems="center">
        <Avatar src={imgBuffer} size="lg" />
        {target === 'profile' && <AttachFile onChange={setNewImg} />}
        <InfoSubject title="E-mail" body={user!.email} />
      </Flex>
      {target === 'profile' ? (
        <UserEditForm<NameType>
          formElement={formName}
          defaultValues={{ displayName: user!.displayName }}
          btnSettings={{
            text: '회원정보 수정',
            color: 'var(--black)',
            bgColor: 'var(--white)',
            borderColor: 'var(--black)',
          }}
          submitFunc={editImgName}
        />
      ) : (
        target === 'password' && (
          <UserEditForm<editPswdSchemaType>
            formElement={formPassword}
            formSchema={editPswdSchema}
            btnSettings={{ text: '비밀번호 변경', color: 'var(--white)', bgColor: 'var(--black)' }}
            submitFunc={editPswd}
          />
        )
      )}
    </Flex>
  );
};

export default EditAccount;
