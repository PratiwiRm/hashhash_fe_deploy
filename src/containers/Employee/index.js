import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import IconDownloadWhite from 'assets/icon_download_white.svg';

import { media } from 'commons/theme';

import EmployeeCard from 'components/EmployeeCard';
import EmployeeModal from 'components/EmployeeModal';
import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import { loadEmployee, addEmployee, editEmployee } from 'reducers/employee';
import { loadSupplier } from 'reducers/supplier';

import Navigation from '../Navigation';

@connect(
  state => ({
    auth: state.auth,
    employee: state.employee,
    supplier: state.supplier,
  }),
  {
    loadEmployee,
    addEmployee,
    editEmployee,
    loadSupplier,
  }
)
export default class Employee extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
    loadEmployee: PropTypes.func.isRequired,
    addEmployee: PropTypes.func.isRequired,
    editEmployee: PropTypes.func.isRequired,
    loadSupplier: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      activeFilter: 0,
      addModal: false,
      editModal: false,
      editIndex: -1,
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

  setFilter = filter => {
    this.setState({ activeFilter: filter });
  };

  downloadEmployeeData = () => {
    const blob = new Blob([Papa.unparse(this.props.employee.employee, { header: true })], {
      type: 'data:text/csv;charset=utf-8',
    });
    saveAs(blob, 'stoqo_optima_employee_profiles.csv');
  };

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };

  openEditModal = index => {
    this.setState({ editModal: true, editIndex: index });
  };

  closeEditModal = () => {
    this.setState({ editModal: false, editIndex: -1 });
  };

  render() {
    const { employee, supplier } = this.props;

    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control>
              <span>Tipe Pegawai:</span>
              <button onClick={() => this.setFilter(0)} disabled={this.state.activeFilter === 0}>
                Semua
              </button>
              <button onClick={() => this.setFilter(1)} disabled={this.state.activeFilter === 1}>
                Picker
              </button>
              <button onClick={() => this.setFilter(2)} disabled={this.state.activeFilter === 2}>
                Driver
              </button>
            </Control>
            <Control flex>
              <span>Data:</span>
              <button onClick={this.downloadEmployeeData} className="blue">
                <img src={IconDownloadWhite} alt="upload" />Daftar Pegawai
              </button>
            </Control>
            <button className="primary blue" onClick={this.toggleAddModal}>
              + Tambah Pegawai
            </button>
          </Controls>
        </ControlPanel>
        <EmployeeList>
          {employee.employee
            .filter(value => {
              if (this.state.activeFilter === 0) {
                return true;
              } else if (this.state.activeFilter === 1 && value.peran.toLowerCase() === 'picker') {
                return true;
              } else if (this.state.activeFilter === 2 && value.peran.toLowerCase() === 'driver') {
                return true;
              }

              return false;
            })
            .map((value, index) => (
              <EmployeeCard
                key={`${value.nama}x${value.username}`}
                data={value}
                supplier={
                  value.peran.toLowerCase() === 'picker' &&
                  supplier.supplier.find(el => el.id == value.id_supplier)
                }
                onClick={() => this.openEditModal(index)}
              />
            ))}
        </EmployeeList>
        {this.state.addModal && (
          <EmployeeModal
            create
            supplier={supplier.supplier}
            save={this.props.addEmployee}
            close={this.toggleAddModal}
          />
        )}
        {this.state.editModal && (
          <EmployeeModal
            data={employee.employee[this.state.editIndex]}
            supplier={supplier.supplier}
            save={newEmployeeData => this.props.editEmployee(this.state.editIndex, newEmployeeData)}
            close={this.closeEditModal}
          />
        )}
      </Wrapper>
    );
  }
}

const EmployeeList = styled.div`
  width: 100%;
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
