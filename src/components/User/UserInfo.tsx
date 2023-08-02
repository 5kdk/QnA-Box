import { css } from '@emotion/react';
import InfoSubject from '../User/InfoSubject';
import Avatar from '../atom/Avatar';
import Flex from '../atom/Flex';

const userCss = {
  wrapper: css({
    paddingTop: '4rem',
    gap: '3.3rem',
  }),
  subject: css({
    gap: '2.2rem',
  }),
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
