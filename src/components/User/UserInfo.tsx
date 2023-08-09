import { css } from '@emotion/react';
import { Flex, Avatar } from '../atom';
import { InfoSubject } from '.';
import logo from '../../assets/images/qa-logo.png';

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
  photoURL: string;
  email: string;
  displayName: string;
}

const UserInfo = ({ photoURL, email, displayName }: InfoProps) => {
  return (
    <Flex css={userCss.wrapper} flexDirection="column" alignItems="center">
      <Avatar src={photoURL || logo} size="lg" />
      <Flex css={userCss.subject} flexDirection="column">
        <InfoSubject title="E-mail" body={email} />
        <InfoSubject title="DisplayName" body={displayName} />
      </Flex>
    </Flex>
  );
};

export default UserInfo;
