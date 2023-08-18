#  QnA Box



<div align="center">
  <img src="./src/assets/images/qa-logo.png" />
  <h3> 더 깊은 이해, 강연자와 함께 나누는 QnA Box! </h3>

### [📦💬 배포 페이지](https://qna-box.web.app)

| Test ID | PW |
| :---: | :---: |
| test1@gmail.com |a12341234! |

</div>


<br/>

## 프로젝트 개요

- QnA Box - 질문과 답변 공간 제공 서비스
- 프로젝트 기간: 2023.08.01 ~ 리팩토링 진행 중
- 팀원 소개 :

    | [김동규](https://github.com/5kdk) | [조규성](https://github.com/operat04) | [조윤희](https://github.com/YUNH7) |
    | :---: | :---: | :---: |
    | <img src="https://github.com/p-c-w/universe/assets/86090355/29941c7f-ac9b-4569-afd3-b87c7b04cbcf" style="width: 150px"> | <img src="https://github.com/pre-onboarding-team-6/.github/assets/86090355/a72357cc-dbdb-4e3d-a5d5-7d7c53c086cd" style="width: 150px"> | <img src="https://avatars.githubusercontent.com/u/113083398?v=4" style="width: 150px"> |


- 기술 스택:
  
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
    <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white">
    <img src="https://img.shields.io/badge/jotai-white?style=for-the-badge&logo=[]&logoColor=white"/>
    <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white"/>
    <img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
    <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=react%20hook%20form&logoColor=white"/>
    <img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"/>
    <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
    <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black">
    <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
    <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
    <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>
    <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=black"/>

- Documents  

  - [노션 협업 로그](https://5kdk.notion.site/b21eb7590ab7408ca0983a5b386c3de0?v=b5c686ffadc84e86a049e690e8acbbb1&pvs=4)  
  - [Figma UI 프로토타입](https://www.figma.com/file/jJDbPxKLTVXr4QfbpiQj40/Q%26A-ROOM-UI?type=design&node-id=0%3A1&mode=design&t=H8KLMB7GrpiFak1R-1)


<br />

## 기획 배경

### **Problems:**

👨‍🏫 **강연자** 
- 강의 도중 질문에 답변할 경우 강의의 흐름이 끊길 수 있음
- 질문을 모두 받기에 강의 시간이 부족할 수 있음
- 같은 질문을 여러번 답변하는 경우가 생길 수 있음

🙋‍♂️ **피 강연자**
- 강의 중간 궁금한 점이 생길 경우 질문할 타이밍을 놓칠 수 있음
- 다음 강의로 이동해야하는 경우 시간이 없어 질문하지 못할 수 있음
- 여러 사람들 앞에서 질문하기 어려워하는 경우

### **Solutions:**
- **강연별 Q&A를 관리할 수 있는 웹 서비스 공간 제공**
- **질문의 기명, 익명 원하는 설정으로 질문 가능**
- **강의 중 실시간으로 질문, 강의 종료 후에도 질의응답 가능한 폼 제작**

<br />

## 구현 시 고려한 사항
### 프로젝트 기능
#### 🏃 User
- 로그인
- 로그아웃
- 회원 정보 수정
- 회원 탈퇴

#### 📦 Box
- Box CRUD
- 페이지네이션 및 필터링

#### 💬 Comment/Reply(질문/답변)
- 질문/답변 CRUD
- 무한스크롤 및 필터링
- 참여하기 기능 (북마크 기능)
- 링크 공유

</br>

## 개발 이슈




---