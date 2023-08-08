import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Avatar, Flex } from '../atom';
import { UserEditForm } from '../molecules';
import { InfoSubject } from '../User';
import useImgFile from '../../hooks/useImgFile';
import { editPswdSchemaType, editPswdSchema } from '../../registerSchema';
import { buttonCss, visuallyHidden } from '../../styles';

const tmpData = {
  imgSrc: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg',
  email: 'minjae3@test.com',
  name: ' minjae3',
};

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

const formName = [{ text: 'Name', key: 'newName', type: 'text' }];
interface NameType {
  name: string;
}

const EditAccount = () => {
  const { setNewImg, imgBuffer } = useImgFile(tmpData.imgSrc);
  const { target } = useParams();
  const navigate = useNavigate();

  const editImgName = (data: NameType) => {
    if (tmpData.imgSrc === imgBuffer && tmpData.name === data.name) return;
    const newData: { imgSrc: string; name: string } = { imgSrc: imgBuffer || tmpData.imgSrc, name: data.name };
    console.log(newData);
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
        <InfoSubject title="E-mail" body={tmpData.email} />
      </Flex>
      {target === 'profile' ? (
        <UserEditForm<NameType>
          formElement={formName}
          iniForm={{ name: tmpData.name }}
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
