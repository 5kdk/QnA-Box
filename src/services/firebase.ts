import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// 구글 로그인 추가 예정
// export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
