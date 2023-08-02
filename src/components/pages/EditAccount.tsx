import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import Flex from '../atom/Flex';
import Avatar from '../atom/Avatar';
import Button from '../atom/Button';
import WideButton from '../atom/WideButton';
import Input from '../molecules/Input';
import InfoSubject from '../User/InfoSubject';

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
};

const EditAccount = () => {
  const [newName, setNewName] = useState(tmpData.name);
  const [pswdForm, setPswdForm] = useState({ prePswd: '', newPswd: '', ckPswd: '' });
  const { target } = useParams();
  const navigate = useNavigate();

  const handleForm = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setPswdForm({ ...pswdForm, [key]: e.target.value });
  };

  useEffect(() => {
    if (target && target !== 'profile' && target !== 'password') {
      navigate('/error');
    }
  }, [target, navigate]);

  return (
    <Flex css={editCss.wrapper} flexDirection="column">
      <Flex css={editCss.account} flexDirection="column" alignItems="center">
        <Avatar src={tmpData.imgSrc} size="lg" />
        {target === 'profile' && (
          <Button text="이미지 수정" color="black" bgColor="white" borderColor="#D6D6D6" onClick={() => {}} />
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
        <WideButton text="회원정보 수정" color="black" bgColor="white" borderColor="black" onClick={() => {}} />
      ) : (
        target === 'password' && <WideButton text="비밀번호 변경" color="white" bgColor="black" onClick={() => {}} />
      )}
    </Flex>
  );
};

export default EditAccount;
