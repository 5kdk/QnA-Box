import Item from '../molecules/Item';

function getRandomDate(daysInRange: number, future: boolean = false): string {
  const currentTime: Date = new Date();
  const randomDays: number = Math.floor(Math.random() * daysInRange);
  const randomMilliseconds: number = randomDays * 24 * 60 * 60 * 1000;

  if (future) {
    currentTime.setTime(currentTime.getTime() + randomMilliseconds);
  } else {
    currentTime.setTime(currentTime.getTime() - randomMilliseconds);
  }

  return currentTime.toISOString();
}

const randomDate1 = getRandomDate(365); // 최대 1년 전 임의 시간 생성
const randomDate2 = getRandomDate(30); // 최대 1개월 전 임의 시간 생성
const randomDate3 = getRandomDate(7); // 최대 1주 전 임의 시간 생성
const randomDate4 = getRandomDate(1); // 최대 1일 전 임의 시간 생성
const randomDate5 = getRandomDate(2); // 최대 2일 전 임의 시간 생성
const randomDate6 = getRandomDate(90); // 최대 3개월 전 임의 시간 생성

const Qna = () => {
  return (
    <div>
      <Item
        userName="User1"
        text="질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐"
        postTime={randomDate4}
      />
      <Item
        userName="User1"
        text="질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐"
        isLike={true}
        postTime={randomDate5}
      />
      <Item
        userName="User1"
        text="질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐"
        postTime={randomDate3}
      />
      <Item
        userName="User1"
        text="질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐"
        like={15}
        postTime={randomDate2}
      />
      <Item
        userName="User1"
        text="질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐"
        postTime={randomDate6}
      />
      <Item
        userName="User1"
        text="질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐질문입니다람쥐"
        like={6}
        postTime={randomDate1}
      />
    </div>
  );
};

export default Qna;
