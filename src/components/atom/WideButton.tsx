import { css } from '@emotion/react';
import { ButtonProps, cssProps } from './Button';

const buttonCss = (props: cssProps) =>
  css({
    minWidth: '20rem',
    padding: '1.2rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    color: props.color,
    backgroundColor: props.bgColor,
    borderColor: props.borderColor || props.bgColor,
  });

const WideButton = ({ text, color, bgColor, borderColor, onClick }: ButtonProps) => {
  return (
    <button css={buttonCss({ color, bgColor, borderColor })} onClick={onClick}>
      {text}
    </button>
  );
};

export default WideButton;
