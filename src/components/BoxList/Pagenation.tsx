import { css } from '@emotion/react';
import { Flex } from '../atom';
import { Dispatch, SetStateAction } from 'react';

const PagenationCss = {
  buttonStyle: css`
    width: 30px;
    height: 40px;
    border-radius: 7px;
    border: 1px solid var(--gray);
  `,
  selectedButtonStyle: css`
    background-color: var(--black);
    color: var(--white);
  `,
  containerFlex: css`
    margin: 0 20px;
    padding: 20px 0 30px 0;
    height: 100%;
  `,
  buttonFlex: css`
    gap: 5px;
  `,
};

interface PagenationProps {
  itemsLen: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const itemsPerPage = 5;
const maxButtons = 5;

const Pagenation = ({ itemsLen, currentPage, setPage }: PagenationProps) => {
  const totalPages = Math.ceil(itemsLen / itemsPerPage);
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  const handleClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  return (
    <Flex justifyContent="space-between" css={PagenationCss.containerFlex}>
      <button
        css={PagenationCss.buttonStyle}
        aria-label="첫 페이지"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}>
        {'<'}
      </button>
      <Flex css={PagenationCss.buttonFlex}>
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
              css={[PagenationCss.buttonStyle, pageNumber === currentPage ? PagenationCss.selectedButtonStyle : null]}>
              {pageNumber}
            </button>
          );
        })}
      </Flex>
      <button
        css={PagenationCss.buttonStyle}
        aria-label="다음 페이지"
        disabled={currentPage === endPage}
        onClick={() => handleClick(currentPage + 1)}>
        {'>'}
      </button>
    </Flex>
  );
};

export default Pagenation;
