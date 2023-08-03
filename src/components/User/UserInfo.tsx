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
  imgSrc: string;
  email: string;
  name: string;
}

const UserInfo = ({ imgSrc, email, name }: InfoProps) => {
  return (
    <Flex css={userCss.wrapper} flexDirection="column" alignItems="center">
      <Avatar src={imgSrc} size="lg" />
      <Flex css={userCss.subject} flexDirection="column">
        <InfoSubject title="E-mail" body={email} />
        <InfoSubject title="Name" body={name} />
      </Flex>
    </Flex>
  );
};

export default UserInfo;
