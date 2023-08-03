import { css } from '@emotion/react';

const style = (size: SizeType) => css`
  width: ${size === 'md' ? '64px' : size === 'lg' ? '148px' : '35px'};
  height: ${size === 'md' ? '64px' : size === 'lg' ? '148px' : '35px'};
  border-radius: 50%;
  background-color: gray;
  flex-shrink: 0;
  object-fit: cover;
`;

type SizeType = 'lg' | 'md' | 'sm';

interface AvatarProps {
  src?: string;
  size?: SizeType;
}

const Avatar = ({ src, size = 'md' }: AvatarProps) => {
  return <div css={style(size)}>{src && <img src={src} alt="아바타 이미지" css={style(size)} />}</div>;
};

export default Avatar;
