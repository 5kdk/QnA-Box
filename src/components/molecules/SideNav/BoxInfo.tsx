import Note from '../../atom/Note';
import Flex from '../../atom/Flex';
import { css } from '@emotion/react';

interface BoxData {
  id: number;
  box: string;
}

const flexstyle = css`
  margin-top: 10px;
  margin-left: 20px;
`;
const newsstyle = css`
  margin: 10px 20px 0 20px;
  font-size: 16px;
  font-weight: bold;
`;
const container = css`
  border-top: 0.5px solid #515254;
  margin-bottom: 30px;
`;
const boxstyle = css`
  padding: 3px 0;
`;
const BoxInfo = ({ title, UserBoxData }: { title: string; UserBoxData: BoxData[] }) => {
  return (
    <Flex css={container} flexDirection="column">
      <div css={newsstyle}>{title}</div>
      <Flex css={flexstyle} flexDirection="column" justifyContent="center" alignItems="flex-start">
        {UserBoxData.map(el => (
          <Note key={el.id} css={boxstyle} text={el.box} onClick={() => {}} />
        ))}
      </Flex>
    </Flex>
  );
};

export default BoxInfo;
