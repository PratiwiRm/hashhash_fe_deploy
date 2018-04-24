const theme = {
  breakpoint: {
    smallMobile: '20rem',
    mobile: '48rem',
    tablet: '64rem',
    smallDesktop: '80rem',
  },

  font: {
    heading: 'Cerebri Sans',
    body: 'Nunito Sans',
  },

  color: {
    pure: '#FFFFFF',
    light: '#FEFEFE',
    white: '#FAFAFA',
    whiteRGBA: a => `rgba(250, 250, 250, ${a})`,
    ivory: '#EEEEEE',
    gray: '#9A9A9A',
    black: '#3A3A3A',
    dark: '#5A5A5A',
    blue: '#005BEA',
    blueAlt: '#07689F',
    green: '#9BE15D',
    red: '#F15A2C',
  },

  shadow: {
    lite: '0 0.25rem 0.25rem rgba(58, 58, 58, 0.15)',
    regular: '0 0.5rem 1rem rgba(58, 58, 58, 0.15)',
  },

  sizing: {
    containerMaxWidth: '80rem',
    radius: {
      small: '0.25rem',
      regular: '0.5rem',
      card: '0.75rem',
    },
  },

  zindex: {
    modal: '1000',
    overhead: '100',
  },
};

export const media = breakpoint => `@media screen and (max-width: ${theme.breakpoint[breakpoint]})`;

export default theme;
