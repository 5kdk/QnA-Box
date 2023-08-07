import { Global, css } from '@emotion/react';

const style = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family:
      'Pretendard',
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Ubuntu,
      Cantarell,
      Noto Sans,
      sans-serif,
      BlinkMacSystemFont,
      'Segoe UI',
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol';
  }

  body {
    background-color: #e2e8f0;
  }

  ul,
  li {
    list-style: none;
  }

  button,
  textarea,
  input {
    font-family:
      'Pretendard',
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Ubuntu,
      Cantarell,
      Noto Sans,
      sans-serif,
      BlinkMacSystemFont,
      'Segoe UI',
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol';
  }

  button {
    border: none;
    background: inherit;
    cursor: pointer;
  }

  :root {
    --black: #000000;
    --white: #ffffff;
    --gray: #d6d6d6;
    --light_gray: #f0f0f0;
    --deep_gray: #515254;
    --blue: #1c56fc;
    --orange: #fc6d1c;
    --kakao: #fee500;
    --shadow: rgba(0, 0, 0, 0.2);
    --modal: rgba(0, 0, 0, 0.5);
    --app_width: 448px;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
