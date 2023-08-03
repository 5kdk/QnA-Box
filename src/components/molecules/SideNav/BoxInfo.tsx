import { css } from '@emotion/react';
import Note from '../../atom/Note';
import Flex from '../../atom/Flex';

const BoxInfoCss = {
  flexstyle: css`
    margin-top: 10px;
    margin-left: 20px;
  `,
  newsstyle: css`
    margin: 10px 20px 0 20px;
    font-size: 16px;
    font-weight: bold;
  `,
  container: css`
    margin-bottom: 30px;
    border-top: 0.5px solid #515254;
  `,
  boxstyle: css`
    padding: 3px 0;
  `,
};

interface BoxData {
  id: number;
  box: string;
}

const BoxInfo = ({ title, UserBoxData }: { title: string; UserBoxData: BoxData[] }) => {
  return (
    <Flex css={BoxInfoCss.container} flexDirection="column">
      <div css={BoxInfoCss.newsstyle}>{title}</div>
      <Flex css={BoxInfoCss.flexstyle} flexDirection="column" justifyContent="center" alignItems="flex-start">
        {UserBoxData.map(el => (
          <Note key={el.id} css={BoxInfoCss.boxstyle} text={el.box} onClick={() => {}} />
        ))}
      </Flex>
    </Flex>
  );
};

export default BoxInfo;
