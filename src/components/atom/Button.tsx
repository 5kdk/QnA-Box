import { ReactNode } from 'react';
import { css } from '@emotion/react';

export interface cssProps {
  color: string;
  bgColor: string;
  borderColor?: string;
  icon?: ReactNode;
}
const buttonCss = {
  base: (props: cssProps) =>
    css({
      minWidth: '6rem',
      padding: '10px',
      borderRadius: '10px',
      fontWeight: 'bold',
      color: props.color,
      backgroundColor: props.bgColor,
      borderColor: props.borderColor || props.bgColor,
    }),
  flex: css({
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
};

export interface ButtonProps extends cssProps {
  text: string;
  onClick: () => void;
}
const Button = ({ text, color, bgColor, borderColor, icon, onClick }: ButtonProps) => {
  return (
    <button css={[buttonCss.base({ color, bgColor, borderColor }), icon && buttonCss.flex]} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
