import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import IconUploadWhite from 'assets/icon_upload_white.svg';

import { media } from 'commons/theme';

import PurchaseList from 'components/PurchaseList';
import PickerList from 'components/PickerList';
import { Wrapper, ControlPanel, Controls, Control } from 'components/SharedElements';

import { loadEmployee } from 'reducers/employee';
import { setDate, setBatch, loadTasks } from 'reducers/purchasing';
import { loadSupplier } from 'reducers/supplier';

import Navigation from '../Navigation';

@connect(
  state => ({ purchasing: state.purchasing, employee: state.employee, supplier: state.supplier }),
  {
    setDate,
    setBatch,
    loadEmployee,
    loadSupplier,
    loadTasks,
  }
)
export default class Purchasing extends Component {
  static propTypes = {
    purchasing: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
    setDate: PropTypes.func.isRequired,
    setBatch: PropTypes.func.isRequired,
    loadEmployee: PropTypes.func.isRequired,
    loadSupplier: PropTypes.func.isRequired,
    loadTasks: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      supplierFilter: 'all',
      typeFilter: 'all',
    };
  }

  componentDidMount() {
    if (this.props.supplier.dry) {
      this.props.loadSupplier();
    }

    if (this.props.employee.dry) {
      this.props.loadEmployee();
    }

    if (this.props.purchasing.dry) {
      this.props.loadTasks();
    }
  }

  render() {
    const { purchasing, employee, supplier } = this.props;

    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control>
              <span>Tanggal:</span>
              <input
                type="date"
                value={purchasing.date}
                onChange={evt => this.props.setDate(evt.target.value)}
                placeholder="tanggal pengaturan"
              />
            </Control>
            <Control flex>
              <span>Batch:</span>
              <button disabled={purchasing.batch === 1} onClick={() => this.props.setBatch(1)}>
                Cut Off 1
              </button>
              <button disabled={purchasing.batch === 2} onClick={() => this.props.setBatch(2)}>
                Cut Off 2
              </button>
              <button disabled={purchasing.batch === 3} onClick={() => this.props.setBatch(3)}>
                Final Cut Off
              </button>
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
              <select
                value={this.state.supplierFilter}
                onChange={evt => this.setState({ supplierFilter: evt.target.value })}
              >
                <option value="all">Semua Supplier</option>
                {supplier.supplier.map(value => (
                  <option key={`${value.id}x${value.name}`} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
            </Control>
            <Control>
              <span>Jenis:</span>
              <button
                disabled={this.state.typeFilter === 'all'}
                onClick={() => this.setState({ typeFilter: 'all' })}
              >
                Semua
              </button>
              <button
                disabled={this.state.typeFilter === 'purchase'}
                onClick={() => this.setState({ typeFilter: 'purchase' })}
              >
                Pembelian
              </button>
              <button
                disabled={this.state.typeFilter === 'cancel'}
                onClick={() => this.setState({ typeFilter: 'cancel' })}
              >
                Pembatalan
              </button>
            </Control>
          </Controls>
        </ControlPanel>
        <PurchaseListWrapper>
          <PurchaseList
            tasks={purchasing.tasks.filter(value => {
              let flag = value.assigned === '';

              if (this.state.supplierFilter !== 'all') {
                flag = flag && value.supplier === this.state.supplierFilter;
              }

              if (this.state.typeFilter !== 'all') {
                flag = flag && value.type === this.state.typeFilter;
              }

              return flag;
            })}
          />
        </PurchaseListWrapper>
        <PickerListWrapper>
          <PickerList
            tasks={purchasing.tasks.filter(value => {
              let flag = value.assigned !== '';

              if (this.state.supplierFilter !== 'all') {
                flag = flag && value.supplier === this.state.supplierFilter;
              }

              if (this.state.typeFilter !== 'all') {
                flag = flag && value.type === this.state.typeFilter;
              }

              return flag;
            })}
            employee={employee.employee.filter(value => {
              let flag = value.type.toLowerCase() === 'picker';

              if (this.state.supplierFilter !== 'all') {
                flag = flag && value.supplier === this.state.supplierFilter;
              }

              return flag;
            })}
          />
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
