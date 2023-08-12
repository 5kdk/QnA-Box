import { atom } from 'jotai';

type FilterType = { mainFilter: 'my' | 'joined'; subFilter: '최신순' | '오래된순' };

const filterState = atom<FilterType>({ mainFilter: 'my', subFilter: '최신순' });

export default filterState;
