import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Flex from '../atom/Flex';
import Note from '../atom/Note';
import WideButton from '../atom/WideButton';
import InfoModal from '../molecules/InfoModal';
import UserInfo from '../User/UserInfo';

const tmpData = {
  imgSrc: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg',
  email: 'minjae3@test.com',
  name: ' minjae3',
};

const accountCss = {
  wrapper: css({
    gap: '4.5rem',
    margin: '0 2.5rem',
  }),
  buttons: css({
    gap: '1rem',
  }),
};

const Account = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex css={accountCss.wrapper} flexDirection="column">
      <UserInfo {...tmpData} />
      <Flex css={accountCss.buttons} flexDirection="column">
        <WideButton
          text="회원정보 수정"
          color="black"
          bgColor="white"
          borderColor="black"
          onClick={() => navigate('/account/pofile')}
        />
        <WideButton text="비밀번호 변경" color="white" bgColor="black" onClick={() => navigate('/account/password')} />
        <Note text="회원 탈퇴" onClick={() => setOpen(true)} />
      </Flex>
      {open && (
        <InfoModal
          title="정말 탈퇴하시겠습니까?"
          text="탈퇴 시 계정 복구가 불가합니다."
          normalBtn={{ text: '회원 탈퇴', onClick: () => {} }}
          importantBtn={{ text: '돌아가기', onClick: () => setOpen(false) }}
        />
      )}
    </Flex>
  );
};

export default Account;
