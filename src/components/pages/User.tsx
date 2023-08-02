import UserInfo from '../User/UserInfo';

const tmpData = {
  imgSrc: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg',
  email: 'minjae3@test.com',
  name: ' minjae3',
};

const User = () => {
  return <UserInfo {...tmpData} />;
};

export default User;
