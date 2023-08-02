import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import Flex from '../atom/Flex';
import Avatar from '../atom/Avatar';
import WideButton from '../atom/WideButton';
import Input from '../molecules/Input';
import InfoSubject from '../User/InfoSubject';
import useImgFile from '../../hooks/useImgFile';
import { buttonCss } from '../../styles/buttonCss';

const tmpData = {
  imgSrc: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg',
  email: 'minjae3@test.com',
  name: ' minjae3',
};

const editCss = {
  wrapper: css({
    gap: '3.3rem',
    margin: '0 2.5rem',
    paddingTop: '4rem',
  }),
  account: css({
    gap: '1.3rem',
  }),
  visuallyHidden: css({
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    border: '0',
    padding: '0',
    whiteSpace: 'nowrap',
    clipPath: 'inset(100%)',
    clip: 'rect(0 0 0 0)',
    overflow: 'hidden',
  }),
  btnProps: { color: 'black', bgColor: 'white', borderColor: '#D6D6D6' },
  button: css({
    fontSize: '12px',
    cursor: 'pointer',
  }),
};

const EditAccount = () => {
  const [newName, setNewName] = useState(tmpData.name);
  const [pswdForm, setPswdForm] = useState({ prePswd: '', newPswd: '', ckPswd: '' });
  const { setNewImg, newImgBuffer } = useImgFile(tmpData.imgSrc);
  const { target } = useParams();
  const navigate = useNavigate();

  const handleForm = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setPswdForm({ ...pswdForm, [key]: e.target.value });
  };

  const editAccount = () => {
    if (tmpData.imgSrc === newImgBuffer && tmpData.name === newName) return;

    const data: { imgSrc?: string; name: string } = { imgSrc: '', name: '' };
    data.imgSrc = newImgBuffer || tmpData.imgSrc;
    data.name = newName || tmpData.name;

    console.log(data);
  };

  const editPswd = () => {
    const { prePswd, newPswd, ckPswd } = pswdForm;
    if (newPswd !== ckPswd) return;

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
        <Avatar src={newImgBuffer} size="lg" />
        {target === 'profile' && (
          <>
            <input
              css={editCss.visuallyHidden}
              type="file"
              onChange={e => e.target.files && setNewImg(e.target.files[0])}
              id="attachment"
            />
            <label css={[buttonCss(editCss.btnProps), editCss.button]} htmlFor="attachment">
              이미지 수정
            </label>
          </>
        )}
        <InfoSubject title="E-mail" body={tmpData.email} />
      </Flex>
      <Flex css={editCss.account} flexDirection="column">
        {target === 'profile' ? (
          <Input text="Name" type="text" width="100%" input={newName} handleInput={e => setNewName(e.target.value)} />
        ) : (
          target === 'password' && (
            <>
              <Input
                text="기존 비밀번호"
                type="password"
                width="100%"
                input={pswdForm.prePswd}
                handleInput={handleForm('prePswd')}
              />
              <Input
                text="새 비밀번호"
                type="password"
                width="100%"
                input={pswdForm.newPswd}
                handleInput={handleForm('newPswd')}
              />
              <Input
                text="비밀번호 확인"
                type="password"
                width="100%"
                input={pswdForm.ckPswd}
                handleInput={handleForm('ckPswd')}
              />
            </>
          )
        )}
      </Flex>
      {target === 'profile' ? (
        <WideButton text="회원정보 수정" color="black" bgColor="white" borderColor="black" onClick={editAccount} />
      ) : (
        target === 'password' && <WideButton text="비밀번호 변경" color="white" bgColor="black" onClick={editPswd} />
      )}
    </Flex>
  );
};

export default EditAccount;
