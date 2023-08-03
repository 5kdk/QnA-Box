import UserInfo from './UserInfo';
import BoxInfo from './BoxInfo';
import Flex from '../../atom/Flex';
import { css, keyframes } from '@emotion/react';
import Note from '../../atom/Note';
import WideButton from '../../atom/WideButton';

const UserData = {
  src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBLxK6kQbI7JhBGVQ_A7pZpu_U9jKIvMulQ&usqp=CAU',
  name: '쬬와규',
  email: 'asdfasf@naver.com',
};
const UserBoxData = [
  { id: 1, box: 'React-query의 모든 것' },
  { id: 2, box: 'FireBase 배워보자' },
];
const Slide = keyframes`
    from {
      transform: translateX(5%);
      opacity: 0.25;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
`;
const navContainer = css`
  background-color: white;
  z-index: 999;
  position: absolute;
  left: 31rem;
  width: 28rem;
  animation: ${Slide} 0.2s ease-in;
`;

const serviceContainer = css`
  border-top: 0.5px solid #515254;
  margin-bottom: 100px;
`;
const notestyle = css`
  margin: 15px 20px 0 20px;
  font-weight: bold;
  color: black;
`;
const teamstyle = css`
  margin-bottom: 20px;
`;

const SideNav = () => {
  return (
    <Flex css={navContainer} flexDirection="column">
      <UserInfo src={UserData.src} name={UserData.name} email={UserData.email} />
      <BoxInfo UserBoxData={UserBoxData} title="새소식" />
      <BoxInfo UserBoxData={UserBoxData} title="최근 살펴본 Box" />
      <Flex css={serviceContainer} flexDirection="column" alignItems="flex-start">
        <Note css={notestyle} text="서비스 소개" onClick={() => {}} />
        <Note css={notestyle} text="서비스 문의" onClick={() => {}} />
      </Flex>
      <Flex flexDirection="column" alignItems="center">
        <Note css={teamstyle} text="by Team 쬬와규" onClick={() => {}} />
        <WideButton text="로그아웃" color="white" bgColor="black" onClick={() => {}} />
      </Flex>
    </Flex>
  );
};

export default SideNav;
