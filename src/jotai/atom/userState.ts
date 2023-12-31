import { atom } from 'jotai';
import { UserData } from '../../services/profile';

const userState = atom<UserData | null>(null);

export default userState;
