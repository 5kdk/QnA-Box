import { useRef } from 'react';
import { useAtom } from 'jotai';
import { userState } from '../jotai/atom';
import useImgFile from './useImgFile';
import { UserData, updateUserAvartar, updateUserDisplayName } from '../services/profile';

const formName = [{ text: 'DisplayName', key: 'displayName', type: 'text' }];
export interface NameType {
  displayName: string;
}

const useEditImgName = () => {
  const [user, setUser] = useAtom(userState);
  const prevUser = useRef<UserData>(user);
  const { setNewImg, imgBuffer, imgFile } = useImgFile(user!.photoURL);
  const editImgName = async (data: NameType) => {
    if (imgFile && prevUser.current!.photoURL !== imgBuffer) await updateUserAvartar(imgFile);
    if (prevUser.current!.displayName !== data.displayName) await updateUserDisplayName(data.displayName);
  };
  const onMutate = (data: NameType) =>
    user && setUser({ ...user, photoURL: imgBuffer || user.photoURL, displayName: data.displayName });
  const editForm = {
    formElement: formName,
    defaultValues: { displayName: user!.displayName },
    btnSettings: {
      text: '회원정보 수정',
      color: 'var(--black)',
      bgColor: 'var(--white)',
      borderColor: 'var(--black)',
    },
    submitFunc: editImgName,
    onMutate,
  };

  return { user, setNewImg, imgBuffer, editForm };
};

export default useEditImgName;
