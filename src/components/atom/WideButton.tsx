import Button, { ButtonProps } from './Button';

const WideButton = ({ text, color, bgColor, borderColor, icon, onClick }: ButtonProps) => {
  return (
    <Button
      minWidth="320px"
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
