import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';
import IconDownloadWhite from 'assets/icon_download_white.svg';

import { employeesArrToObject } from 'commons/utils';

import HelpCard from 'components/HelpCard';
import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import { loadEmployee } from 'reducers/employee';
import { loadSupplier } from 'reducers/supplier';

import Navigation from '../Navigation';

@connect(state => ({ auth: state.auth, employee: state.employee, supplier: state.supplier }), {
  loadEmployee,
  loadSupplier,
})
export default class Help extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    supplier: PropTypes.array.isRequired,
    loadEmployee: PropTypes.func.isRequired,
    loadSupplier: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      showActive: true,
      showResolved: false,
    };
  }

  componentDidMount() {
    if (this.props.auth.token) {
      if (this.props.supplier.dry) {
        this.props.loadSupplier();
      }

      if (this.props.employee.dry) {
        this.props.loadEmployee();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.token && nextProps.auth.token) {
      this.props.loadSupplier();
      this.props.loadEmployee();
    }
  }

  render() {
    const { showActive, showResolved } = this.state;
    const { employee, supplier } = this.props;
    // TODO FILTER ONLY RELATED EMPLOYEE
    const filteredEmployees = employeesArrToObject(employee.employee);

    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control flex>
              <span>Tanggal:</span>
              <input type="date" placeholder="tanggal pengaturan" />
            </Control>
            <button className="primary blue">
              <img src={IconDownloadWhite} alt="upload" />Download Riwayat
            </button>
          </Controls>
        </ControlPanel>
        <Divider onClick={() => this.setState({ showActive: !this.state.showActive })}>
          <h1>Aktif</h1>
          <div className="line" />
          <h1>5</h1>
          <Chevron show={this.state.showActive} src={IconChevronBlue} alt="Chevron" />
        </Divider>
        {!employee.dry && (
          <HelpList show={showActive}>
            <HelpCard
              data={{ employee: '085728333074' }}
              employees={filteredEmployees}
              supplier={supplier.supplier}
            />
            <HelpCard
              data={{ employee: '089601107931' }}
              employees={filteredEmployees}
              supplier={supplier.supplier}
            />
            <HelpCard
              data={{ employee: '085728333074' }}
              employees={filteredEmployees}
              supplier={supplier.supplier}
            />
          </HelpList>
        )}
        <Divider onClick={() => this.setState({ showResolved: !this.state.showResolved })}>
          <h1>Terselesaikan</h1>
          <div className="line" />
          <h1>102</h1>
          <Chevron show={this.state.showResolved} src={IconChevronBlue} alt="Chevron" />
        </Divider>
        {!employee.dry && (
          <HelpList show={showResolved}>
            <HelpCard
              data={{ employee: '089601107931' }}
              employees={filteredEmployees}
              supplier={supplier.supplier}
            />
            <HelpCard
              data={{ employee: '085728333074' }}
              employees={filteredEmployees}
              supplier={supplier.supplier}
            />
            <HelpCard
              data={{ employee: '089601107931' }}
              employees={filteredEmployees}
              supplier={supplier.supplier}
            />
          </HelpList>
        )}
      </Wrapper>
    );
  }
}

const Divider = styled.button`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 0 0 2rem;

  &:hover,
  &:focus {
    h1 {
      color: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }

  h1 {
    font-size: 2rem;
    color: ${props => props.theme.color.gray};
    transition: 0.25s ease all;
  }

  .line {
    flex: 1;
    height: 0.1rem;
    background: ${props => props.theme.color.pegasus};
    margin: 0 1rem;
  }
`;

const Chevron = styled.img`
  height: 1rem;
  margin: 0 0 0 1rem;
  transform: ${props => (props.show ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: 0.25s ease all;
`;

const HelpList = styled.div`
  width: 100%;
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  & > div {
    margin: 0 0 2rem;
  }
`;
