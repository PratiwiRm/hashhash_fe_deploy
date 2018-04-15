import React, { Component } from 'react';
import styled from 'styled-components';

import IconUploadWhite from 'assets/icon_upload_white.svg';

import DeliveryList from 'components/DeliveryList';
import DriverList from 'components/DriverList';
import { Wrapper, ControlPanel, Controls, Control } from 'components/SharedElements';

import Navigation from '../Navigation';

export default class Logistic extends Component {
  render() {
    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control>
              <span>Tanggal:</span>
              <input type="date" />
            </Control>
            <Control>
              <span>Data:</span>
              <button className="blue">
                <img src={IconUploadWhite} alt="upload" />Upload CSV
              </button>
            </Control>
          </Controls>
        </ControlPanel>
        <DeliveryListWrapper>
          <DeliveryList />
        </DeliveryListWrapper>
        <DriverListWrapper>
          <DriverList />
        </DriverListWrapper>
      </Wrapper>
    );
  }
}

const DeliveryListWrapper = styled.div`
  width: 20rem;
  height: 64rem;
  margin: 0 4rem 0 0;
`;

const DriverListWrapper = styled.div`
  width: calc(100% - 24rem);
  height: 64rem;
`;
