import { css } from '@emotion/react';
import Flex from './Flex';

const toggleCss = ({ selected }: { selected: boolean }) =>
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
  });

const togglerCss = css({
  gap: '0.5rem',
  '> p': {
    letterSpacing: '-0.32px',
  },
});

interface TogglerProps {
  selected: boolean;
  setSelected: (b: boolean) => void;
  text: string;
}
const Toggler = ({ selected, setSelected, text }: TogglerProps) => {
  return (
    <Flex css={togglerCss}>
      <div css={toggleCss({ selected })} onClick={() => setSelected(!selected)} />
      <p>{text}</p>
    </Flex>
  );
};

export default Toggler;
