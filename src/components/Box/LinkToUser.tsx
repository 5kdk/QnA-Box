import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const linkToUserCss = (color?: 'blue' | false) => css`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: var(--${color || 'black'});
`;

interface LinkUserProps {
  name?: string;
  uid: string;
  color?: 'blue' | false;
}
const LinkToUser = ({ name, uid, color }: LinkUserProps) => {
  return (
    <Link css={linkToUserCss(color)} to={`/user/${uid}`}>
      {name}
    </Link>
  );
};

export default LinkToUser;
