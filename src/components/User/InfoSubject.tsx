import { css } from '@emotion/react';
import Flex from '../atom/Flex';

const subjectCss = css({
  gap: '1rem',
});

interface InfoProps {
  title: string;
  body: string;
}
const InfoSubject = ({ title, body }: InfoProps) => {
  return (
    <Flex css={subjectCss} flexDirection="column" alignItems="center">
      <h3>{title}</h3>
      <p>{body}</p>
    </Flex>
  );
};

export default InfoSubject;
