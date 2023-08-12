import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Avatar, Flex } from '../components/atom';
import { InfoSubject } from '../components/User';
import { AttachFile, UserEditForm } from '../components/Account';
import { editPswdSchemaType } from '../schema';
import { NameType } from '../hooks/useEditImgName';
import { useEditImgName, useEditPassword } from '../hooks';

const editCss = {
  wrapper: css`
    margin: 0 40px;
    padding-top: 64px;
    gap: 48px;
  `,
  account: css`
    gap: 22px;
  `,
};

const EditAccount = () => {
  const { target } = useParams();
  const { user, setNewImg, imgBuffer, editForm: editName } = useEditImgName();
  const { editForm: editPassword } = useEditPassword();

  return (
    <Flex css={editCss.wrapper} flexDirection="column">
      <Flex css={editCss.account} flexDirection="column" alignItems="center">
        <Avatar src={imgBuffer} size="lg" />
        {target === 'profile' && <AttachFile onChange={setNewImg} />}
        <InfoSubject title="E-mail" body={user!.email} />
      </Flex>
      {target === 'profile' ? (
        <UserEditForm<NameType> {...editName} />
      ) : (
        target === 'password' && <UserEditForm<editPswdSchemaType> {...editPassword} />
      )}
    </Flex>
  );
};

export default EditAccount;
