import { css } from '@emotion/react';

type SizeType = 'lg' | 'md' | 'sm';

const style = (size: SizeType) =>
  css({
    width: size === 'md' ? '64px' : size === 'lg' ? '100px' : '35px',
    height: size === 'md' ? '64px' : size === 'lg' ? '100px' : '35px',
    borderRadius: '50%',
    backgroundColor: 'gray',
    flexShrink: 0,
  });

interface AvartarProps {
  src?: string;
  size?: SizeType;
}

const Avartar = ({ src, size = 'md' }: AvartarProps) => {
  return <div css={style(size)}>{src && <img src={src} alt="아바타 이미지" css={style(size)} />}</div>;
};

export default Avartar;
