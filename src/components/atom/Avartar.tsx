import { css } from '@emotion/react';

type SizeType = 'lg' | 'md' | 'sm';

const imgStyle = (size: SizeType) =>
  css({
    width: size === 'md' ? '64px' : size === 'lg' ? '100px' : '35px',
    height: size === 'md' ? '64px' : size === 'lg' ? '100px' : '35px',
    borderRadius: '50%',
  });

interface AvartarProps {
  src: string;
  size?: SizeType;
}

const Avartar = ({ src, size = 'md' }: AvartarProps) => {
  return (
    <div>
      <img src={src} alt="아바타 이미지" css={imgStyle(size)} />
    </div>
  );
};

export default Avartar;
