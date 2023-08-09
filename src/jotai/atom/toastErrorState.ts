import { atom } from 'jotai';

type ErrorType = string | string[];

const toastErrorState = atom<ErrorType>('');

export default toastErrorState;
