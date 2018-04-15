import React, { Component } from 'react';
import styled from 'styled-components';

import { media } from 'commons/theme';

import EmployeeCard from 'components/EmployeeCard';
import EmployeeModal from 'components/EmployeeModal';
import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import Navigation from '../Navigation';

export default class Employee extends Component {
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
          <PageTitle>Sentra Pegawai</PageTitle>
          <Controls>
            <Control flex>
              <span>Tipe Pegawai:</span>
              <button>Semua</button>
              <button>Picker</button>
              <button>Driver</button>
            </Control>
            <button className="primary blue" onClick={this.toggleAddModal}>
              + Tambah Pegawai
            </button>
          </Controls>
        </ControlPanel>
        <EmployeeList>
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
        </EmployeeList>
        <EmployeeModal create visible={this.state.addModal} close={this.toggleAddModal} />
      </Wrapper>
    );
  }
}

const EmployeeList = styled.div`
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
