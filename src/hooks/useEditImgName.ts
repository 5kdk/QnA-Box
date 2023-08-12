import { useAtomValue } from 'jotai';
import { userState } from '../jotai/atom';
import useImgFile from './useImgFile';
import { updateUserAvartar, updateUserDisplayName } from '../services/profile';

const formName = [{ text: 'DisplayName', key: 'displayName', type: 'text' }];
export interface NameType {
  displayName: string;
}

const useEditImgName = () => {
  const user = useAtomValue(userState);
  const { setNewImg, imgBuffer, imgFile } = useImgFile(user!.photoURL);
  const editImgName = async (data: NameType) => {
    if (imgFile && user!.photoURL !== imgBuffer) await updateUserAvartar(imgFile);
    if (user!.displayName !== data.displayName) await updateUserDisplayName(data.displayName);
  };
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
  };

  return { user, setNewImg, imgBuffer, editForm };
};

export default useEditImgName;
