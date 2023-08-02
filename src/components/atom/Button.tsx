import { ReactNode } from 'react';
import { css } from '@emotion/react';

export interface cssProps {
  minWidth?: string;
  padding?: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  icon?: ReactNode;
  fontWeight?: number;
}
const buttonCss = (props: cssProps) =>
  css({
    display: 'flex',
    justifyContent: props.icon ? 'space-between' : 'center',
    alignItems: 'center',
    minWidth: props.minWidth || '6rem',
    padding: props.padding || '10px',
    fontWeight: props.fontWeight || 'bold',
    color: props.color,
    backgroundColor: props.bgColor,
    borderRadius: '10px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: props.borderColor || props.bgColor,
  });
export interface ButtonProps extends cssProps {
  text: string;
  onClick: () => void;
}
const Button = ({ minWidth, padding, text, color, bgColor, borderColor, fontWeight, icon, onClick }: ButtonProps) => {
  return (
    <button css={buttonCss({ minWidth, padding, color, bgColor, borderColor, fontWeight, icon })} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
