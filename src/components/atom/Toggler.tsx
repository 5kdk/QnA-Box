import { css } from '@emotion/react';

const toggleCss = ({ selected }: { selected: boolean }) =>
  css({
    position: 'relative',
    width: '41px',
    height: '19px',
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
  });

interface TogglerProps {
  selected: boolean;
  setSelected: (b: boolean) => void;
}
const Toggler = ({ selected, setSelected }: TogglerProps) => {
  return <div css={toggleCss({ selected })} onClick={() => setSelected(!selected)} />;
};

export default Toggler;
