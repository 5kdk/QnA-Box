import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { Flex, Note, WideButton } from '../components/atom';
import { InfoModal } from '../components/molecules';
import { UserInfo } from '../components/User';
import { userState } from '../jotai/atom';
import useReqTryCatch from '../hooks/useReqTryCatch';
import { deregisterUser } from '../services/auth';

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
  const [deregisterCheck, setDeregisterCheck] = useState(false);
  const user = useAtomValue(userState);
  const navigate = useNavigate();
  const reqTryCatch = useReqTryCatch();

  const toEditProfile = () => navigate('/account/profile');
  const toEditPassword = () => navigate('/account/password');
  const openModal = () => setDeregisterCheck(true);
  const closeModal = () => setDeregisterCheck(false);
  const deleteAccount = () => reqTryCatch(deregisterUser);

  return (
    <Flex css={accountCss.wrapper} flexDirection="column">
      <UserInfo {...user} />
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
      {deregisterCheck && (
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
