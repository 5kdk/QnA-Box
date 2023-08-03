import { css } from '@emotion/react';
import { Flex } from '../atom';

const subjectCss = css`
  gap: 16px;
`;

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
