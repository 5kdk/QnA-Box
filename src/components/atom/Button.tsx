import { ReactNode } from 'react';
import { css } from '@emotion/react';

export interface cssProps {
  color: string;
  bgColor: string;
  borderColor?: string;
  icon?: ReactNode;
}
const buttonCss = (props: cssProps) =>
  css({
    display: 'flex',
    justifyContent: props.icon ? 'space-between' : 'stretch',
    alignItems: 'center',
    minWidth: '6rem',
    padding: '10px',
    borderRadius: '10px',
    fontWeight: 'bold',
    color: props.color,
    backgroundColor: props.bgColor,
    borderColor: props.borderColor || props.bgColor,
  });
export interface ButtonProps extends cssProps {
  text: string;
  onClick: () => void;
}
const Button = ({ text, color, bgColor, borderColor, icon, onClick }: ButtonProps) => {
  return (
    <button css={buttonCss({ color, bgColor, borderColor, icon })} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
