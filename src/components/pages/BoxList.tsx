import Controller from '../molecules/Controller';
import Buttons from '../BoxList/Buttons';
import Item from '../molecules/Item';

const boxData = [
  {
    id: '2',
    owner: 'Kyusung Jo',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/111227582?s=64&v=4',
    title: '조규성 팬클럽',
    description: '안녕하세요 축구선수 조규성은 아닙니다.',
  },
  {
    id: '3',
    owner: '5kdk',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/86090355?v=4',
    title: 'React를 활용한 웹 개발 기초',
    description: '이 강연에서는 React를 사용한 웹 개발의 기초에 대해 알아봅니다.',
  },
  {
    id: '1',
    owner: 'Yunhee Jo',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/113083398?s=60&v=4',
    title: 'jep을 활용한 협업방법',
    description: 'jep을 활용한 협업을 알아보아요.',
  },
  {
    id: '4',
    owner: 'John Doe',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=32',
    title: 'React를 활용한 웹 개발 기초',
    description: '이 강연에서는 React를 사용한 웹 개발의 기초에 대해 알아봅니다.',
  },
  {
    id: '5',
    owner: 'Jane Smith',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=7',
    title: 'Introduction to HTML and CSS',
    description: 'This lecture covers the basics of HTML and CSS for web development.',
  },
  {
    id: '6',
    owner: 'Mike Johnson',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=9',
    title: 'JavaScript Fundamentals',
    description: 'In this lecture, we will learn the fundamentals of JavaScript.',
  },
  {
    id: '7',
    owner: 'Emily Lee',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=10',
    title: 'React Components and Props',
    description: 'This lecture explores React components and their props.',
  },
  {
    id: '8',
    owner: 'Alex Brown',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=21',
    title: 'State Management with Redux',
    description: 'In this lecture, we will learn how to manage state using Redux.',
  },
  {
    id: '9',
    owner: 'Sarah Johnson',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=10',
    title: 'Introduction to Psychology',
    description: 'This lecture provides an introduction to the basics of psychology.',
  },
  {
    id: '10',
    owner: 'David Lee',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=35',
    title: 'Introduction to Data Science',
    description: 'In this lecture, we will explore the fundamentals of data science.',
  },
  {
    id: '11',
    owner: 'Emily Williams',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=45',
    title: 'Marketing Strategies for Small Businesses',
    description: 'This lecture offers marketing strategies tailored for small businesses.',
  },
  {
    id: '12',
    owner: 'Daniel Brown',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=22',
    title: 'Introduction to Astrophysics',
    description: 'In this lecture, we will delve into the basics of astrophysics and space exploration.',
  },
];

const BoxList = () => {
  return (
    <>
      <Buttons />
      <Controller />
      {boxData.map(({ id, owner, ownerAvatarUrl, title, description }) => (
        <Item title={title} userName={owner} text={description} imgUrl={ownerAvatarUrl} key={id} />
      ))}
    </>
  );
};

export default BoxList;
