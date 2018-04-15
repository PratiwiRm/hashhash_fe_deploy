import React, { Component } from 'react';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';
import IconChevronWhite from 'assets/icon_chevron_white.svg';
import IconChevronInvertedWhite from 'assets/icon_chevron_inverted_white.svg';
import IconUploadWhite from 'assets/icon_upload_white.svg';

import { media } from 'commons/theme';

import PurchaseList from 'components/PurchaseList';
import PickerList from 'components/PickerList';
import { Wrapper, ControlPanel, Controls, Control } from 'components/SharedElements';

import Navigation from '../Navigation';

export default class Purchasing extends Component {
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
            <Control flex>
              <span>Batch:</span>
              <button>Cut Off 1</button>
              <button disabled>Cut Off 2</button>
              <button>Final Cut Off</button>
            </Control>
            <button className="primary blue" disabled>
              Mulai Batch
            </button>
          </Controls>
          <Controls>
            <Control flex>
              <span>Data:</span>
              <button className="blue">
                <img src={IconUploadWhite} alt="upload" />Upload CSV
              </button>
            </Control>
            <Control>
              <span>Supplier:</span>
              <select>
                <option>Semua Supplier</option>
                <option>Supplier Lotte Mart 123</option>
                <option>Supplier Lotte Mart 123</option>
                <option>Supplier Lotte Mart 123</option>
                <option>Supplier Lotte Mart 123</option>
                <option>Supplier Lotte Mart 123</option>
              </select>
            </Control>
            <Control>
              <span>Jenis:</span>
              <button>Pembelian</button>
              <button>Pembatalan</button>
            </Control>
          </Controls>
        </ControlPanel>
        <PurchaseListWrapper>
          <PurchaseList />
        </PurchaseListWrapper>
        <PickerListWrapper>
          <PickerList />
        </PickerListWrapper>
      </Wrapper>
    );
  }
}

const PurchaseListWrapper = styled.div`
  width: 20rem;
  height: 64rem;
  margin: 0 4rem 0 0;
`;

const PickerListWrapper = styled.div`
  width: calc(100% - 24rem);
  height: 64rem;
`;
