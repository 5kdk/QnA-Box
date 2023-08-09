import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import { Avatar, Flex } from '../atom';
import { UserEditForm } from '../molecules';
import { InfoSubject } from '../User';
import { userState } from '../../jotai/atom';
import useImgFile from '../../hooks/useImgFile';
import { editPswdSchemaType, editPswdSchema } from '../../registerSchema';
import { getProfile, updateUserAvartar, updateUserDisplayName } from '../../services/profile';
import reqTryCatch from '../../utils/reqTryCatch';
import { buttonCss, visuallyHidden } from '../../styles';

const editCss = {
  wrapper: css`
    margin: 0 40px;
    padding-top: 64px;
    gap: 48px;
  `,
  account: css`
    gap: 22px;
  `,
  btnProps: {
    color: 'var(--black)',
    bgColor: 'var(--white)',
    borderColor: 'var(--gray)',
  },
  button: css`
    cursor: pointer;
    font-size: 12px;
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
  const [user, setUser] = useAtom(userState);
  const { setNewImg, imgBuffer, imgFile } = useImgFile(user.photoURL);
  const { target } = useParams();
  const navigate = useNavigate();

  const editImgName = async (data: NameType) => {
    if (user.photoURL !== imgBuffer || user.displayName !== data.displayName) {
      reqTryCatch(async () => {
        if (imgFile && user.photoURL !== imgBuffer) {
          await updateUserAvartar(user.uid, imgFile);
        }
        if (user.displayName !== data.displayName) await updateUserDisplayName(user.uid, data.displayName);
        const userData = await getProfile(user.uid);
        setUser(userData);
      });
    }
    navigate('/account');
  };

  const editPswd = (data: editPswdSchemaType) => {
    console.log(data, 123);
  };

  useEffect(() => {
    if (target && target !== 'profile' && target !== 'password') {
      navigate('/error');
    }
  }, [target, navigate]);

  return (
    <Flex css={editCss.wrapper} flexDirection="column">
      <Flex css={editCss.account} flexDirection="column" alignItems="center">
        <Avatar src={imgBuffer} size="lg" />
        {target === 'profile' && (
          <>
            <label css={[buttonCss(editCss.btnProps), editCss.button]}>
              <input css={visuallyHidden} type="file" onChange={setNewImg} />
              이미지 수정
            </label>
          </>
        )}
        <InfoSubject title="E-mail" body={user.email} />
      </Flex>
      {target === 'profile' ? (
        <UserEditForm<NameType>
          formElement={formName}
          iniForm={{ displayName: user.displayName }}
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
