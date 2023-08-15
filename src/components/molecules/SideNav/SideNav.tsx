import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { css } from '@emotion/react';
import { Flex, Logo, WideButton } from '../../atom';
import { UserInfo } from '.';
import { logoutUser } from '../../../services/auth';
import { sideNavState, userState, globalWidthState } from '../../../jotai/atom';
import { CopyLight } from '..';

const SideNavCss = {
  navContainer: (isOpen: boolean, globalWidth: string) => css`
    position: absolute;
    z-index: 999;
    top: 56px;
    right: 0;
    width: ${isOpen ? globalWidth : '0'};
    height: calc(100vh - 56px);
    transition: 1s;
    overflow: hidden;
    background-color: var(--white);
  `,
  wrapper: (globalWidth: string) => css`
    width: ${globalWidth};
    height: 100%;
  `,
  subWrapper: (globalWidth: string) => css`
    width: ${globalWidth};

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
  buttonWrapper: (globalWidth: string) => css`
    width: ${globalWidth};
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
  const globalWidth = useAtomValue(globalWidthState);
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
    <Flex css={SideNavCss.navContainer(isOpen, globalWidth)} flexDirection="column">
      <Flex
        css={SideNavCss.wrapper(globalWidth)}
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
        <Flex css={SideNavCss.subWrapper(globalWidth)} flexDirection="column" alignItems="center">
          <div css={SideNavCss.listWrapper(!!user)}>
            {user ? (
              <button css={SideNavCss.notestyle} onClick={redirectTo('/box')} aria-label="">
                나의 QnA Box목록
              </button>
            ) : (
              <button css={SideNavCss.notestyle} onClick={redirectTo('/signup')}>
                회원가입
              </button>
            )}
            <div css={SideNavCss.notestyle}>서비스 약관</div>
            <div css={SideNavCss.notestyle}>
              <a href="mailto:5kdk.code@gmail.com">서비스 문의</a>
            </div>
          </div>
        </Flex>
        <Flex css={SideNavCss.buttonWrapper(globalWidth)} flexDirection="column" alignItems="center">
          <WideButton
            text={user ? 'Sign out' : 'Sign In'}
            color="var(--white)"
            bgColor="var(--black)"
            onClick={user ? handleSignOutClick : redirectTo('/signin')}
          />
          <br />
          <CopyLight black />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideNav;
