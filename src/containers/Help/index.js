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
import { refreshHelp, giveHelp } from 'reducers/help';
import { loadSupplier } from 'reducers/supplier';

import Navigation from '../Navigation';

@connect(
  state => ({
    auth: state.auth,
    employee: state.employee,
    help: state.help,
    supplier: state.supplier,
  }),
  {
    loadEmployee,
    loadSupplier,
    refreshHelp,
    giveHelp,
  }
)
export default class Help extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    help: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
    loadEmployee: PropTypes.func.isRequired,
    loadSupplier: PropTypes.func.isRequired,
    refreshHelp: PropTypes.func.isRequired,
    giveHelp: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.auth.token) {
      if (this.props.supplier.dry) {
        this.props.loadSupplier();
      }

      if (this.props.employee.dry) {
        this.props.loadEmployee();
      }

      this.props.refreshHelp();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.token && nextProps.auth.token) {
      this.props.loadSupplier();
      this.props.loadEmployee();
      this.props.refreshHelp();
    }
  }

  render() {
    const { employee, help, supplier } = this.props;
    const filteredEmployees = employeesArrToObject(employee.employee);

    return (
      <Wrapper>
        <Navigation />
        {!employee.dry && (
          <HelpList>
            {help.help.map(h => (
              <HelpCard
                data={h}
                respond={this.props.giveHelp}
                employees={filteredEmployees}
                supplier={supplier.supplier}
              />
            ))}
          </HelpList>
        )}
        {help.help.length === 0 && (
          <Empty>Tidak ada pegawai lapangan yang membutuhkan bantuan untuk saat ini</Empty>
        )}
      </Wrapper>
    );
  }
}

// const Divider = styled.button`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-items: center;
//   align-content: center;
//   margin: 0 0 2rem;

//   &:hover,
//   &:focus {
//     h1 {
//       color: ${props => props.theme.color.blue};
//       transition: 0.25s ease all;
//     }
//   }

//   h1 {
//     font-size: 2rem;
//     color: ${props => props.theme.color.gray};
//     transition: 0.25s ease all;
//   }

//   .line {
//     flex: 1;
//     height: 0.1rem;
//     background: ${props => props.theme.color.pegasus};
//     margin: 0 1rem;
//   }
// `;

// const Chevron = styled.img`
//   height: 1rem;
//   margin: 0 0 0 1rem;
//   transform: ${props => (props.show ? 'rotate(180deg)' : 'rotate(0deg)')};
//   transition: 0.25s ease all;
// `;

const HelpList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  & > div {
    margin: 0 0 2rem;
  }
`;

const Empty = styled.h1`
  width: 100%;
  font-size: 1.25rem;
  padding: 5rem 0;
  text-align: center;
  color: ${props => props.theme.color.gray};
`;
