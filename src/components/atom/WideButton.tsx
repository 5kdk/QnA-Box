import Button, { ButtonProps } from './Button';

const WideButton = ({ text, minWidth, color, bgColor, borderColor, icon, onClick }: ButtonProps) => {
  return (
    <Button
      minWidth={minWidth || '320px'}
      padding="16px"
      text={text}
      fontSize="16px"
      color={color}
      bgColor={bgColor}
      borderColor={borderColor}
      icon={icon}
      onClick={onClick}
    />
  );
};

export default WideButton;
