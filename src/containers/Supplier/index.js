import React, { Component } from 'react';
import styled from 'styled-components';

import { media } from 'commons/theme';

import SupplierCard from 'components/SupplierCard';
import SupplierModal from 'components/SupplierModal';
import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import Navigation from '../Navigation';

export default class Supplier extends Component {
  constructor() {
    super();

    this.state = {
      addModal: false,
    };
  }

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };

  render() {
    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control flex>
              <PageTitle nomargin>Sentra Supplier</PageTitle>
            </Control>
            <button className="primary blue" onClick={this.toggleAddModal}>
              + Tambah Supplier
            </button>
          </Controls>
        </ControlPanel>
        <SupplierList>
          <SupplierCard />
          <SupplierCard />
          <SupplierCard />
          <SupplierCard />
          <SupplierCard />
          <SupplierCard />
          <SupplierCard />
        </SupplierList>
        <SupplierModal create visible={this.state.addModal} close={this.toggleAddModal} />
      </Wrapper>
    );
  }
}

const SupplierList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;

  & > button {
    width: calc((100% - 8rem) / 5);
    margin: 0 2rem 2rem 0;

    &:nth-of-type(5n) {
      margin: 0 0 2rem;
    }

    ${media('smallDesktop')} {
      width: calc((100% - 6rem) / 4);

      &:nth-of-type(4n) {
        margin: 0 0 2rem;
      }

      &:nth-of-type(5n) {
        margin: 0 2rem 2rem 0;
      }
    }
  }
`;
