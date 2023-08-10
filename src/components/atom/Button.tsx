import { ReactNode } from 'react';
import { buttonCss } from '../../styles';

export interface cssProps {
  minWidth?: string;
  padding?: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  fontWeight?: number;
  icon?: ReactNode;
}
export interface ButtonProps extends cssProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ minWidth, padding, text, color, bgColor, borderColor, fontWeight, icon, onClick }: ButtonProps) => {
  return (
    <button
      css={buttonCss({ minWidth, padding, color, bgColor, borderColor, fontWeight, icon })}
      aria-label={text}
      onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
