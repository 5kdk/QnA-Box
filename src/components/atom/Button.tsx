import { ReactNode } from 'react';
import { css } from '@emotion/react';

export interface cssProps {
  minWidth?: string;
  padding?: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  icon?: ReactNode;
}
export const buttonCss = (props: cssProps) =>
  css({
    display: 'flex',
    justifyContent: props.icon ? 'space-between' : 'center',
    alignItems: 'center',
    minWidth: props.minWidth || '6rem',
    padding: props.padding || '10px',
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
const Button = ({ minWidth, padding, text, color, bgColor, borderColor, icon, onClick }: ButtonProps) => {
  return (
    <button css={buttonCss({ minWidth, padding, color, bgColor, borderColor, icon })} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
