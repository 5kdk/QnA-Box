import { css } from '@emotion/react';
import Flex from '../atom/Flex';

interface PagenationProps {
  currentPage: number;
  maxPage: number;
  onClickPageButton: (page: number) => void;
}

const PagenationCss = {
  buttonStyle: css`
    width: 30px;
    height: 40px;
    border-radius: 7px;
    border: 1px solid var(--gray);
  `,
  selectedButtonStyle: (isCurrenPage: boolean) => {
    if (isCurrenPage)
      return css`
        background-color: var(--black);
        color: var(--white);
      `;
  },
  containerFlex: css`
    margin: 0 20px;
    padding: 20px 0 30px 0;
  `,
  buttonFlex: css`
    gap: 5px;
  `,
};

const Pagenation = ({ currentPage, maxPage, onClickPageButton }: PagenationProps) => {
  return (
    <Flex justifyContent="space-between" css={PagenationCss.containerFlex}>
      <button css={PagenationCss.buttonStyle} disabled={currentPage === 1}>
        {'<'}
      </button>
      <Flex css={PagenationCss.buttonFlex}>
        {Array.from({ length: maxPage }, (_, i) => {
          return (
            <button
              key={i}
              css={[PagenationCss.buttonStyle, PagenationCss.selectedButtonStyle(currentPage === i + 1)]}
              onClick={() => onClickPageButton(i + 1)}>
              {i + 1}
            </button>
          );
        })}
      </Flex>
      <button css={PagenationCss.buttonStyle} disabled={currentPage === maxPage}>
        {'>'}
      </button>
    </Flex>
  );
};

export default Pagenation;
