import React from 'react';
import styled from 'styled-components';

import { media } from 'commons/theme';

import Navigation from '../Navigation';

const NotFound = () => (
  <Wrapper>
    <Navigation />
    <h1>404, Not Found :(</h1>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  margin: 0 auto;
  padding: 0 0 5rem;

  ${media('smallDesktop')} {
    padding: 0 2rem 5rem;
  }
`;

export default NotFound;
