import Avatar from '../../atom/Avatar';
import Flex from '../../atom/Flex';
import { css } from '@emotion/react';
import { IosArrowRight } from '@emotion-icons/fluentui-system-filled/IosArrowRight';

interface User {
  src: string;
  name: string;
  email: string;
}
const container = css`
  border-top: 0.5px solid #515254;
  padding: 10px;
`;
const namestyle = css`
  font-size: 18px;
  margin-bottom: 10px;
`;
const emailstyle = css`
  color: #515254;
  opacity: 0.8;
`;
const UserInfo = ({ src, name, email }: User) => {
  return (
    <Flex css={container}>
      <Flex css={{ width: '100%' }} justifyContent="space-between" alignItems="center">
        <Avatar src={src} size="md" />
        <Flex css={{ flexGrow: '0.5' }} flexDirection="column">
          <div css={namestyle}>{name}</div>
          <div css={emailstyle}>{email}</div>
        </Flex>
        <IosArrowRight size="20px" />
      </Flex>
    </Flex>
  );
};

export default UserInfo;
