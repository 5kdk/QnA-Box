import { css } from '@emotion/react';
import { Note, Flex } from '../../atom';

const BoxInfoCss = {
  flexstyle: css`
    margin-top: 10px;
  `,
  newsstyle: css`
    font-size: 16px;
    font-weight: bold;
  `,
  container: css`
    padding: 10px 30px 30px 30px;
    padding-bottom: 30px;
    border-bottom: 0.5px solid var(--gray);
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
