import { atom } from 'jotai';
import { User } from 'firebase/auth';

export const authState = atom<User | null>(null);
export default authState;
