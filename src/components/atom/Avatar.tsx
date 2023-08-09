import { css } from '@emotion/react';
import logo from '../../assets/images/qa-logo.png';

const avatarCss = (size: SizeType) => css`
  flex-shrink: 0;
  object-fit: cover;
  width: ${size === 'md' ? '64px' : size === 'lg' ? '148px' : '35px'};
  height: ${size === 'md' ? '64px' : size === 'lg' ? '148px' : '35px'};
  border-radius: 50%;
  background-color: var(--gray);
`;

type SizeType = 'lg' | 'md' | 'sm';

interface AvatarProps {
  src?: string;
  size?: SizeType;
}

const Avatar = ({ src, size = 'md' }: AvatarProps) => {
  return (
    <div css={avatarCss(size)}>
      <img src={src || logo} alt="아바타 이미지" css={avatarCss(size)} />
    </div>
  );
};

export default Avatar;
