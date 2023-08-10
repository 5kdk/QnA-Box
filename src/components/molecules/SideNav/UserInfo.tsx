import { css } from '@emotion/react';
import { Avatar, Flex } from '../../atom';
import { IosArrowRight } from '@emotion-icons/fluentui-system-filled/IosArrowRight';

const UserInfoCss = {
  container: css`
    padding: 10px;
    border-top: 0.5px solid var(--gray);
    border-bottom: 0.5px solid var(--gray);
    cursor: pointer;
  `,
  namestyle: css`
    margin-bottom: 10px;
    font-size: 18px;
  `,
  emailstyle: css`
    color: var(--deep_gray);
    opacity: 0.8;
  `,
  flexStyle: css`
    width: 100%;
  `,
  infoStyle: css`
    flex-grow: 0.5;
  `,
};

interface User {
  src: string | null;
  displayName: string;
  email: string;
  toAccount: () => void;
}

const UserInfo = ({ src, displayName, email, toAccount }: User) => {
  return (
    <Flex css={UserInfoCss.container} onClick={toAccount}>
      <Flex css={UserInfoCss.flexStyle} justifyContent="space-between" alignItems="center">
        <Avatar src={src} size="md" />
        <Flex css={UserInfoCss.infoStyle} flexDirection="column">
          <div css={UserInfoCss.namestyle}>{displayName}</div>
          <div css={UserInfoCss.emailstyle}>{email}</div>
        </Flex>
        <IosArrowRight size="20px" />
      </Flex>
    </Flex>
  );
};

export default UserInfo;
