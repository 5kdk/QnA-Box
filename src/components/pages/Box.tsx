import { useState } from 'react';
import { InfoCircle } from '@emotion-icons/bootstrap';
import { css } from '@emotion/react';
import BoxListController from '../molecules/Controller';
import BoxItem from '../Box/BoxItem';
import Flex from '../atom/Flex';
import Text from '../atom/Text';
import Question from '../molecules/Question';

type Box = {
  id: string;
  owner: string;
  ownerAvatarUrl: string;
  title: string;
  description: string;
  startTime: string;
  questions: Post[];
};

type Post = {
  responder: string;
  responderAvatarUrl: string;
  content: string;
  postTime: string;
  like: number;
  answer: Post[];
};

const boxData: Box = {
  id: '3',
  owner: 'John Doe',
  ownerAvatarUrl: 'https://i.pravatar.cc/150?img=7',
  title: 'React를 활용한 웹 개발 기초',
  description: '이 강연에서는 React를 사용한 웹 개발의 기초에 대해 알아봅니다.',
  startTime: '2023-08-02T14:00:00',
  questions: [
    {
      responder: 'guest456',
      responderAvatarUrl: 'https://i.pravatar.cc/150',
      content: 'React 강의를 수강했는데도 이해가 잘 안되는 부분이 있어요. 도움을 받을 수 있을까요?',
      postTime: '2023-08-02T14:30:00',
      like: 6,
      answer: [],
    },
    {
      responder: 'guest789',
      responderAvatarUrl: 'https://i.pravatar.cc/150',
      content: 'Redux와 상태 관리에 대해 알려주실 수 있을까요?',
      postTime: '2023-08-02T15:00:00',
      like: 0,
      answer: [
        {
          responder: 'John Doe',
          responderAvatarUrl: 'https://i.pravatar.cc/150?img=7',
          content: '물론 가능합니다! Redux에 대해 자세히 설명해드리겠습니다.',
          postTime: '2023-08-02T15:05:00',
          like: 6,
          answer: [],
        },
      ],
    },
    {
      responder: 'guest101',
      responderAvatarUrl: 'https://i.pravatar.cc/150',
      content: 'React Hooks에 대해 어떻게 사용하는지 알려주세요.',
      postTime: '2023-08-02T15:30:00',
      like: 25,
      answer: [
        {
          responder: 'John Doe',
          responderAvatarUrl: 'https://i.pravatar.cc/150?img=7',
          content: '물론입니다! React Hooks를 사용하는 방법과 주의사항에 대해 설명드리겠습니다.',
          postTime: '2023-08-02T15:35:00',
          like: 1,
          answer: [],
        },
      ],
    },
    {
      responder: 'guest202',
      responderAvatarUrl: 'https://i.pravatar.cc/150',
      content: '강연 내용 중 자바스크립트 ES6 문법에 대해 더 알고 싶습니다.',
      postTime: '2023-08-02T16:00:00',
      like: 0,
      answer: [
        {
          responder: 'John Doe',
          responderAvatarUrl: 'https://i.pravatar.cc/150?img=7',
          content: '물론 가능합니다! ES6 문법과 활용법에 대해 자세히 설명드리겠습니다.',
          postTime: '2023-08-02T16:05:00',
          like: 6,
          answer: [],
        },
      ],
    },
  ],
};

const wrapperStyle = css({ padding: '10px 20px 0 20px' });
const infoWrapperStyle = css({ gap: '5px' });
const borderStyle = css({
  border: '1px solid #F0F0F0',
});

const Box = () => {
  const [moreInfo, setMoreInfo] = useState(false);

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" css={wrapperStyle}>
        <h2>{boxData.title}</h2>
        <button aria-label="더 많은 정보 보기">
          <InfoCircle size="16px" onClick={() => setMoreInfo(prev => !prev)} />
        </button>
      </Flex>
      <Flex flexDirection="column" css={[wrapperStyle, infoWrapperStyle]}>
        {moreInfo && (
          <>
            <Text>{boxData.owner}</Text>
            <Text>{boxData.description}</Text>
          </>
        )}
        <Text>마지막 답변 날짜: 2023.07.31</Text>
      </Flex>
      <BoxListController />
      {boxData.questions.map(({ responder, responderAvatarUrl, postTime, content, like, answer }, i) => (
        <Flex css={borderStyle} flexDirection="column" key={`${responder} ${i}`}>
          <BoxItem
            owner={boxData.owner}
            responder={responder}
            content={content}
            postTime={postTime}
            responderAvatarUrl={responderAvatarUrl}
            like={like}
            answer={answer}
          />
        </Flex>
      ))}
      <Question />
    </div>
  );
};

export default Box;
