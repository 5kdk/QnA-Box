import { ReactNode } from 'react';
import { buttonCss } from '../../styles';

export interface cssProps {
  minWidth?: string;
  padding?: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: number;
  icon?: ReactNode;
}
export interface ButtonProps extends cssProps {
  text: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const Button = ({
  minWidth,
  padding,
  color,
  bgColor,
  borderColor,
  fontSize,
  fontWeight,
  icon,
  text,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      css={buttonCss({ minWidth, padding, fontSize, color, bgColor, borderColor, fontWeight, icon })}
      aria-label={text}
      onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
