import { css } from '@emotion/react';
import { Flex, Avatar } from '../atom';
import { InfoSubject } from '.';

const userCss = {
  wrapper: css`
    padding-top: 64px;
    gap: 54px;
  `,
  subject: css`
    gap: 34px;
  `,
};

interface InfoProps {
  photoURL?: string | null;
  email?: string;
  displayName?: string;
}

const UserInfo = ({ photoURL, email, displayName }: InfoProps) => {
  if (!email || !displayName) return;

  return (
    <Flex css={userCss.wrapper} flexDirection="column" alignItems="center">
      <Avatar src={photoURL} size="lg" />
      <Flex css={userCss.subject} flexDirection="column">
        <InfoSubject title="E-mail" body={email} />
        <InfoSubject title="DisplayName" body={displayName} />
      </Flex>
    </Flex>
  );
};

export default UserInfo;
