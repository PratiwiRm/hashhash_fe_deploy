import React, { Component } from 'react';
import styled from 'styled-components';

import { Wrapper } from 'components/SharedElements';

import Navigation from '../Navigation';

export default class Home extends Component {
  render() {
    return (
      <Wrapper>
        <Navigation />
        <h1>Welcome to Stoqo Optima</h1>
      </Wrapper>
    );
  }
}
