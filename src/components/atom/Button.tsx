import { ReactNode } from 'react';
import { buttonCss } from '../../styles/buttonCss';

export interface cssProps {
  minWidth?: string;
  padding?: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  icon?: ReactNode;
  fontWeight?: number;
}
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
