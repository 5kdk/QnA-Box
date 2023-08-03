import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Avatar, Flex, WideButton } from '../atom';
import { Input } from '../molecules';
import { InfoSubject } from '../User';
import { buttonCss } from '../../styles/buttonCss';
import useImgFile from '../../hooks/useImgFile';

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
  visuallyHidden: css`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
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

const formElement = [
  { text: '기존 비밀번호', key: 'prePswd' },
  { text: '새 비밀번호', key: 'newPswd' },
  { text: '비밀번호 확인', key: 'ckPswd' },
];

interface PswdFormElement {
  [key: string]: string;
  prePswd: string;
  newPswd: string;
  ckPswd: string;
}

const EditAccount = () => {
  const [newName, setNewName] = useState(tmpData.name);
  const [pswdForm, setPswdForm] = useState<PswdFormElement>({ prePswd: '', newPswd: '', ckPswd: '' });
  const { setNewImg, imgBuffer } = useImgFile(tmpData.imgSrc);
  const { target } = useParams();
  const navigate = useNavigate();

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value);

  const handlePswdForm = (key: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setPswdForm({ ...pswdForm, [key]: e.target.value });

  const editAccount = () => {
    if (tmpData.imgSrc === imgBuffer && tmpData.name === newName) return;

    const data: { imgSrc?: string; name: string } = { imgSrc: '', name: '' };
    data.imgSrc = imgBuffer || tmpData.imgSrc;
    data.name = newName || tmpData.name;

    console.log(data);
  };

  const editPswd = () => {
    const { prePswd, newPswd, ckPswd } = pswdForm;
    if (prePswd && newPswd && newPswd !== ckPswd) return;

    console.log({ prePswd, newPswd });
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
            <input css={editCss.visuallyHidden} type="file" onChange={setNewImg} id="attachment" />
            <label css={[buttonCss(editCss.btnProps), editCss.button]} htmlFor="attachment">
              이미지 수정
            </label>
          </>
        )}
        <InfoSubject title="E-mail" body={tmpData.email} />
      </Flex>
      <Flex css={editCss.account} flexDirection="column">
        {target === 'profile' ? (
          <Input text="Name" type="text" width="100%" input={newName} handleInput={handleNameInput} />
        ) : (
          target === 'password' && (
            <>
              {formElement.map(({ text, key }) => (
                <Input key={key} text={text} type="password" input={pswdForm[key]} handleInput={handlePswdForm(key)} />
              ))}
            </>
          )
        )}
      </Flex>
      {target === 'profile' ? (
        <WideButton
          text="회원정보 수정"
          color="var(--black)"
          bgColor="var(--white)"
          borderColor="var(--black)"
          onClick={editAccount}
        />
      ) : (
        target === 'password' && (
          <WideButton text="비밀번호 변경" color="var(--white)" bgColor="var(--black)" onClick={editPswd} />
        )
      )}
    </Flex>
  );
};

export default EditAccount;
