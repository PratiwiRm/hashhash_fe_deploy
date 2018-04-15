import React from 'react';
import styled from 'styled-components';

import { media } from 'commons/theme';

import DriverCard from 'components/DriverCard';

const DriverList = () => (
  <Wrapper>
    <div className="container">
      <DriverCard />
      <DriverCard />
      <DriverCard />
      <DriverCard />
      <DriverCard />
      <DriverCard />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 0 1.25rem 0;

  .container {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    white-space: nowrap;
    position: relative;

    & > div {
      white-space: normal;
      margin: 0 2rem 0 0;
    }
  }
`;

export default DriverList;
