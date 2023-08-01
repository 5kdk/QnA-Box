import Button, { ButtonProps } from './Button';

const WideButton = ({ text, color, bgColor, borderColor, onClick }: ButtonProps) => {
  return (
    <Button
      minWidth="20rem"
      padding="1.2rem"
      text={text}
      color={color}
      bgColor={bgColor}
      borderColor={borderColor}
      onClick={onClick}
    />
  );
};

export default WideButton;
