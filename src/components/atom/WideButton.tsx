import Button, { ButtonProps } from './Button';

const WideButton = ({ minWidth, color, bgColor, borderColor, icon, text, type, onClick }: ButtonProps) => {
  return (
    <Button
      minWidth={minWidth || '320px'}
      padding="16px"
      color={color}
      bgColor={bgColor}
      borderColor={borderColor}
      fontSize="16px"
      icon={icon}
      text={text}
      type={type}
      onClick={onClick}
    />
  );
};

export default WideButton;
