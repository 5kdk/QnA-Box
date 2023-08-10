import { atom } from 'jotai';

type FilterType = '최신순' | '오래된순';

const filterState = atom<FilterType>('최신순');

export default filterState;
