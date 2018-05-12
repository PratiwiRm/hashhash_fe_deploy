import { injectGlobal } from 'styled-components';
import theme, { media } from 'commons/theme';
import Chart from 'chart.js';

import 'sanitize.css/sanitize.css';
import 'assets/fonts/cerebri.css';

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

  input,
  textarea {
    font-family: ${theme.font.heading};
  }

  .swal-overlay {
    background-color: rgba(55, 55, 55, 0.75);
  }

  .swal-modal {
    background-color: ${theme.color.pure};
  }

  .swal-title,
  .swal-text {
    font-family: ${theme.font.heading};
    text-align: center;
  }

  .swal-button-container,
  .swal-button {
    width: 100%;
  }

  .swal-footer {
    background: ${theme.color.white};
  }

  .swal-button {
    background: ${theme.color.blue};
  }
`;

// Chart.js Global Styling Overides
Chart.defaults.global.layout = {
  ...Chart.defaults.global.layout,
  padding: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

Chart.defaults.global.title = {
  ...Chart.defaults.global.title,
  fontSize: 32,
  fontFamily: theme.font.heading,
  fontColor: theme.color.black,
  lineHeight: 1,
  padding: 32,
};

Chart.defaults.global.legend = {
  ...Chart.defaults.global.legend,
  position: 'bottom',
  labels: {
    ...Chart.defaults.global.legend.labels,
    fontSize: 16,
    fontFamily: theme.font.heading,
    fontColor: theme.color.black,
    fontStyle: 'bold',
    padding: 16,
    boxWidth: 64,
  },
};

Chart.defaults.global.tooltips = {
  ...Chart.defaults.global.tooltips,
  mode: 'index',
  position: 'nearest',
  titleFontFamily: theme.font.heading,
  titleFontSize: 16,
  titleMarginBottom: 16,
  bodyFontFamily: theme.font.body,
  bodyFontSize: 14,
  background: 'rgba(55, 55, 55, 0.50)',
  xPadding: 16,
  yPadding: 16,
  cornerRadius: 8,
};

Chart.defaults.global.elements.point = {
  ...Chart.defaults.global.elements.point,
  hitRadius: 24,
  radius: 8,
  borderWidth: 2,
  hoverRadius: 12,
  hoverBorderWidth: 4,
};

Chart.defaults.global.elements.line = {
  ...Chart.defaults.global.elements.line,
  tension: 0,
  borderWidth: 4,
};
