import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Flex, Logo, Note, WideButton } from '../../atom';
import { UserInfo, BoxInfo } from '.';
import { logoutUser } from '../../../services/auth';
import { sideNavState, userState } from '../../../jotai/atom';

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
    height: 100%;
  `,
  logostyle: css`
    flex-grow: 0.4;
  `,
  notestyle: css`
    margin: 15px 20px 0 20px;
    font-weight: bold;
    color: var(--black);
  `,
  teamstyle: css`
    display: flex;
    align-self: center;
    margin: 100px 0 20px;
    text-align: center;
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
  const user = useAtomValue(userState);
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
      <Flex css={SideNavCss.wrapper} flexDirection="column" alignItems={user ? 'stretch' : 'center'}>
        {user ? (
          <>
            <UserInfo
              src={UserData.src}
              displayName={UserData.displayName}
              email={UserData.email}
              toAccount={redirectTo('/account')}
            />
            <BoxInfo UserBoxData={UserBoxData} title="새소식" />
            <BoxInfo UserBoxData={UserBoxData} title="최근 살펴본 Box" />
          </>
        ) : (
          <Logo css={SideNavCss.logostyle} size="lg" />
        )}
        <Flex flexDirection="column" alignItems="flex-start">
          <Note css={SideNavCss.notestyle} text="서비스 소개" onClick={() => {}} />
          <Note css={SideNavCss.notestyle} text="서비스 문의" onClick={() => {}} />
          <Note css={SideNavCss.teamstyle} text="by Team 쬬와규" onClick={() => {}} />
        </Flex>
        {user && (
          <Flex flexDirection="column" alignItems="center">
            <WideButton text="로그아웃" color="var(--white)" bgColor="var(--black)" onClick={handleSignOutClick} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SideNav;
