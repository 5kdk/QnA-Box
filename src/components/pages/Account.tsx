import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Flex, Note, WideButton } from '../atom';
import { InfoModal } from '../molecules';
import { UserInfo } from '../User';

const tmpData = {
  imgSrc: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg',
  email: 'minjae3@test.com',
  name: ' minjae3',
};

const accountCss = {
  wrapper: css`
    gap: 72px;
    margin: 0 40px;
  `,
  buttons: css`
    gap: 16px;
  `,
};

const Account = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toEditProfile = () => navigate('/account/profile');
  const toEditPassword = () => navigate('/account/password');
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const deleteAccount = () => {};

  return (
    <Flex css={accountCss.wrapper} flexDirection="column">
      <UserInfo {...tmpData} />
      <Flex css={accountCss.buttons} flexDirection="column">
        <WideButton
          text="회원정보 수정"
          color="var(--black)"
          bgColor="var(--white)"
          borderColor="var(--black)"
          onClick={toEditProfile}
        />
        <WideButton text="비밀번호 변경" color="var(--white)" bgColor="var(--black)" onClick={toEditPassword} />
        <Note text="회원 탈퇴" onClick={openModal} />
      </Flex>
      {open && (
        <InfoModal
          title="정말 탈퇴하시겠습니까?"
          text="탈퇴 시 계정 복구가 불가합니다."
          normalBtn={{ text: '회원 탈퇴', onClick: deleteAccount }}
          importantBtn={{ text: '돌아가기', onClick: closeModal }}
        />
      )}
    </Flex>
  );
};

export default Account;
