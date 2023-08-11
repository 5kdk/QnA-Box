import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Flex, Logo, WideButton } from '../../atom';
import { UserInfo } from '.';
import { logoutUser } from '../../../services/auth';
import { sideNavState, userState } from '../../../jotai/atom';
import { CopyLight } from '..';

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
    border: 0.2px solid var(--gray);
  `,
  wrapper: css`
    width: var(--app_width);
    height: 100%;
  `,
  subWrapper: css`
    width: var(--app_width);
    flex: 2;
    padding: 10px 30px;
  `,
  listWrapper: (isLogin: boolean) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    align-items: ${isLogin ? 'flex-start' : 'center'};
  `,
  logostyle: css`
    flex: 2;
  `,
  notestyle: css`
    font-size: 16px;
    font-weight: bold;
    color: var(--black);
    cursor: pointer;

    & a {
      text-decoration: none;
      color: var(--black);
    }
  `,
  buttonWrapper: css`
    width: var(--app_width);
    flex: 1;
    padding: 10px 30px;
  `,
  teamstyle: css`
    display: flex;
    align-self: center;
    margin: 100px 0 20px;
    text-align: center;
  `,
};

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

  const handleSignInClick = () => {
    navigate('/signin');
    setSideNavState(false);
  };

  const handleMyBoxClick = () => {
    navigate('/box');
    setSideNavState(false);
  };

  const handleSignUpClick = () => {};

  return (
    <Flex css={SideNavCss.navContainer(isOpen)} flexDirection="column">
      <Flex
        css={SideNavCss.wrapper}
        flexDirection="column"
        alignItems={user ? 'stretch' : 'center'}
        justifyContent="space-between">
        {user ? (
          <UserInfo
            src={user.photoURL}
            displayName={user.displayName}
            email={user.email}
            toAccount={redirectTo('/account')}
          />
        ) : (
          <Logo css={SideNavCss.logostyle} size="lg" />
        )}
        <Flex css={SideNavCss.subWrapper} flexDirection="column" alignItems="center">
          <div css={SideNavCss.listWrapper(user)}>
            {user ? (
              <button css={SideNavCss.notestyle} onClick={handleMyBoxClick} aria-label="">
                나의 QnA Box목록
              </button>
            ) : (
              <button css={SideNavCss.notestyle} onClick={handleSignUpClick}>
                회원가입
              </button>
            )}
            <div css={SideNavCss.notestyle}>서비스 약관</div>
            <div css={SideNavCss.notestyle}>
              <a href="mailto:5kdk.code@gmail.com">서비스 문의</a>
            </div>
          </div>
        </Flex>
        <Flex css={SideNavCss.buttonWrapper} flexDirection="column" alignItems="center">
          <WideButton
            text={user ? 'Sign out' : 'Sign In'}
            color="var(--white)"
            bgColor="var(--black)"
            minWidth="100%"
            onClick={user ? handleSignOutClick : handleSignInClick}
          />
          <br />
          <CopyLight black />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideNav;
