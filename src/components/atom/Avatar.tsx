import { css } from '@emotion/react';

type SizeType = 'lg' | 'md' | 'sm';

const style = (size: SizeType) =>
  css({
    width: size === 'md' ? '64px' : size === 'lg' ? '148px' : '35px',
    height: size === 'md' ? '64px' : size === 'lg' ? '148px' : '35px',
    borderRadius: '50%',
    backgroundColor: 'gray',
    flexShrink: 0,
    objectFit: 'cover',
  });

interface AvatarProps {
  src?: string;
  size?: SizeType;
}

const Avatar = ({ src, size = 'md' }: AvatarProps) => {
  return <div css={style(size)}>{src && <img src={src} alt="아바타 이미지" css={style(size)} />}</div>;
};

export default Avatar;
