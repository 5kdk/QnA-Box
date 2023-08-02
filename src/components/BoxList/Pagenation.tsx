import { css } from '@emotion/react';
import Flex from '../atom/Flex';

const buttonStyle = css({
  width: '30px',
  height: '40px',
  borderRadius: '7px',
  border: '1px solid  #D6D6D6',
});

const selectedButtonStyle = (isCurrentPage: boolean) => {
  if (isCurrentPage)
    return css({
      backgroundColor: '#000000',
      color: '#fff',
    });
};

interface PagenationProps {
  currentPage: number;
  maxPage: number;
  onClickPageButton: (page: number) => void;
}

const Pagenation = ({ currentPage, maxPage, onClickPageButton }: PagenationProps) => {
  return (
    <Flex justifyContent="space-between" css={css({ margin: '0 20px', padding: '20px 0 30px 0' })}>
      <button css={buttonStyle} disabled={currentPage === 1}>
        {'<'}
      </button>
      <Flex css={css({ gap: '5px' })}>
        {Array.from({ length: maxPage }, (_, i) => {
          return (
            <button
              css={[buttonStyle, selectedButtonStyle(currentPage === i + 1)]}
              onClick={() => onClickPageButton(i + 1)}>
              {i + 1}
            </button>
          );
        })}
      </Flex>
      <button css={buttonStyle} disabled={currentPage === maxPage}>
        {'>'}
      </button>
    </Flex>
  );
};

export default Pagenation;
