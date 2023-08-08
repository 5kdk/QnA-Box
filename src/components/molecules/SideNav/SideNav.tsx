import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Flex, Note, WideButton } from '../../atom';
import { UserInfo, BoxInfo } from '.';
import { logoutUser } from '../../../services/auth';
import sideNavState from '../../../jotai/atom/sideNavState';

const SideNavCss = {
  navContainer: (isOpen: boolean) => css`
    position: absolute;
    z-index: 999;
    top: 56px;
    left: ${isOpen ? '0' : 'var(--app_width)'};
    width: ${isOpen ? 'var(--app_width)' : '0'};
    height: calc(100vh - 56px);
    transition: 1s;
    overflow: hidden;
    white-space: nowrap;
    background-color: var(--white);
    box-shadow: -1px 5px 5px 0px var(--shadow);
  `,
  wrapper: css`
    width: var(--app_width);
  `,
  serviceContainer: css`
    margin-bottom: 100px;
    border-top: 0.5px solid var(--gray);
  `,
  notestyle: css`
    margin: 15px 20px 0 20px;
    font-weight: bold;
    color: var(--black);
  `,
  teamstyle: css`
    margin-bottom: 20px;
  `,
};
const UserData = {
  src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBLxK6kQbI7JhBGVQ_A7pZpu_U9jKIvMulQ&usqp=CAU',
  displayName: '쬬와규',
  email: 'asdfasf@naver.com',
};
const UserBoxData = [
  { id: 1, box: 'React-query의 모든 것' },
  { id: 2, box: 'FireBase 배워보자' },
];

interface SideNavProps {
  isOpen: boolean;
}

const SideNav = ({ isOpen }: SideNavProps) => {
  const setSideNavState = useSetAtom(sideNavState);
  const navigate = useNavigate();

  const redirectTo = (path: string) => () => {
    navigate(path);
    setSideNavState(false);
  };
  const handleSignOutClick = async () => {
    await logoutUser();
    setSideNavState(false);
  };

  return (
    <Flex css={SideNavCss.navContainer(isOpen)} flexDirection="column">
      <Flex css={SideNavCss.wrapper} flexDirection="column">
        <UserInfo
          src={UserData.src}
          displayName={UserData.displayName}
          email={UserData.email}
          toAccount={redirectTo('/account')}
        />
        <BoxInfo UserBoxData={UserBoxData} title="새소식" />
        <BoxInfo UserBoxData={UserBoxData} title="최근 살펴본 Box" />
        <Flex css={SideNavCss.serviceContainer} flexDirection="column" alignItems="flex-start">
          <Note css={SideNavCss.notestyle} text="서비스 소개" onClick={() => {}} />
          <Note css={SideNavCss.notestyle} text="서비스 문의" onClick={() => {}} />
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Note css={SideNavCss.teamstyle} text="by Team 쬬와규" onClick={() => {}} />
          <WideButton text="로그아웃" color="var(--white)" bgColor="var(--black)" onClick={handleSignOutClick} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideNav;
