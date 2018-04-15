import { injectGlobal } from 'styled-components';
import theme, { media } from 'commons/theme';

import 'sanitize.css/sanitize.css';
import './assets/fonts/cerebri.css';

injectGlobal`
  html {
    font-family: ${theme.font.body};
    font-size: 16px;
    background: ${theme.color.white};
    color: ${theme.color.black};
    min-height: 100vh;
  }

  body {
    box-sizing: border-box;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.font.heading};
    margin: 0;
    line-height: 1;
  }

  p {
    margin: 0;
  }

  button {
    margin: 0;
    padding: 0;
    font-family: ${theme.font.heading};
    border: none;

    &:hover,
    &:focus {
      cursor: pointer;
      outline: none;
    }
  }

  input {
    font-family: ${theme.font.heading};
  }
`;
