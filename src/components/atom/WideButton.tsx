import Button, { ButtonProps } from './Button';

const WideButton = ({ text, color, bgColor, borderColor, icon, type, onClick }: ButtonProps) => {
  return (
    <Button
      minWidth="320px"
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
