import { css } from '@emotion/react';

const togglerCss = {
  button: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  }),
  toggle: ({ selected }: { selected: boolean }) =>
    css({
      position: 'relative',
      width: '40px',
      height: '20px',
      backgroundColor: selected ? '#FC6D1C' : '#8E8E8E',
      borderRadius: '50px',
      '&:before': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: selected ? 'calc(95% - 15px)' : '5%',
        transition: 'all 0.5s ease',
        content: '""',
        width: '15px',
        height: '15px',
        backgroundColor: 'white',
        borderRadius: '50px',
      },
    }),
  label: css({
    fontSize: '14px',
    letterSpacing: '-0.32px',
  }),
};

interface TogglerProps {
  selected: boolean;
  setSelected: (b: boolean) => void;
  text: string;
}

const Toggler = ({ selected, setSelected, text }: TogglerProps) => {
  return (
    <button css={togglerCss.button} onClick={() => setSelected(!selected)}>
      <div css={togglerCss.toggle({ selected })} />
      <p css={togglerCss.label}>{text}</p>
    </button>
  );
};

export default Toggler;
