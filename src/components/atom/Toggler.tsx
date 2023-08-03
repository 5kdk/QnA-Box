import { css } from '@emotion/react';

const togglerCss = {
  button: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  toggle: ({ selected }: { selected: boolean }) => css`
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 50px;
    background-color: ${selected ? 'var(--orange)' : 'var(--gray)'};

    &:before {
      position: absolute;
      content: '';
      top: 50%;
      width: 15px;
      height: 15px;
      left: ${selected ? 'calc(95% - 15px)' : '5%'};
      border-radius: 50px;
      transform: translateY(-50%);
      transition: all 0.5s ease;
      background-color: var(--white);
    }
  `,
  label: css`
    font-size: 14px;
    letter-spacing: -0.32px;
  `,
};

interface TogglerProps {
  selected: boolean;
  setSelected: () => void;
  text: string;
}

const Toggler = ({ selected, setSelected, text }: TogglerProps) => {
  return (
    <button css={togglerCss.button} onClick={setSelected}>
      <div css={togglerCss.toggle({ selected })} />
      <p css={togglerCss.label}>{text}</p>
    </button>
  );
};

export default Toggler;
