import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
import { isEqual } from 'lodash';
import swal from 'sweetalert';
import { saveAs } from 'file-saver';

import IconUploadWhite from 'assets/icon_upload_white.svg';
import IconDownloadWhite from 'assets/icon_download_white.svg';

import { media } from 'commons/theme';
import {
  PICKER_TASK_HEADER_FIELDS,
  PICKER_TASK_TEMPLATE,
  countDuplicatedPickerTasks,
} from 'commons/structure';

import PurchaseList from 'components/PurchaseList';
import PurchaseModal from 'components/PurchaseModal';
import PickerList from 'components/PickerList';
import { Wrapper, ControlPanel, Controls, Control } from 'components/SharedElements';

import { loadEmployee } from 'reducers/employee';
import { setDate, setBatch, loadTasks, addTasks } from 'reducers/purchasing';
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
    addTasks,
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
    addTasks: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      supplierFilter: 'all',
      typeFilter: 'all',
      addModal: false,
      editModal: false,
      editCategory: '',
      editIndex: -1,
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

  handleCSV = event => {
    event.preventDefault();
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const { data, meta } = results;
        const { fields } = meta;

        if (isEqual([...fields].sort(), [...PICKER_TASK_HEADER_FIELDS].sort())) {
          const dupeCount = countDuplicatedPickerTasks(this.props.purchasing.tasks, data);

          if (dupeCount === 0) {
            this.props.addTasks(data);
          } else {
            swal({
              icon: 'error',
              title: `${dupeCount} Duplicated Data Found!`,
              text: `Terdapat ${dupeCount} data baru yang terdeteksi sama dengan data tugas yang sudah ada, pastikan tidak ada data duplikat!`,
            });
          }
        } else {
          swal({
            icon: 'error',
            title: 'Data Format Error',
            text:
              'Format data CSV salah, pastikan baris pertama berisikan header data dan sesuai dengan template yang sudah ditentukan',
          });
        }
        this.csvInput.value = '';
      },
      error: () => {
        swal({
          icon: 'error',
          title: 'CSV Parsing Error',
          text: 'Terjadi kesalahan parsing file CSV, pastikan file benar dan tidak rusak.',
        });
        this.csvInput.value = '';
      },
    });
  };

  downloadTemplate = () => {
    const blob = new Blob([Papa.unparse(PICKER_TASK_TEMPLATE, { header: true })], {
      type: 'data:text/csv;charset=utf-8',
    });
    saveAs(blob, 'stoqo_optima_purchasing_template.csv');
  };

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };

  openEditModal = (category, index) => {
    this.setState({ editModal: true, editCategory: category, editIndex: index });
  };

  closeEditModal = () => {
    this.setState({ editModal: false, editCategory: '', editIndex: -1 });
  };

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
              <label htmlFor="purchasing-csv">
                <img src={IconUploadWhite} alt="upload" />CSV
                <input
                  ref={e => (this.csvInput = e)}
                  type="file"
                  id="purchasing-csv"
                  onChange={this.handleCSV}
                  accept=".csv"
                />
              </label>
              <button onClick={this.downloadTemplate} className="blue">
                <img src={IconDownloadWhite} alt="upload" />Template
              </button>
              <button onClick={this.downloadTemplate} className="blue">
                <img src={IconDownloadWhite} alt="upload" />Riwayat
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
            addTask={this.toggleAddModal}
            editTask={this.openEditModal}
            tasks={purchasing.tasks.unassigned.filter(value => {
              let flag = true;

              if (this.state.typeFilter !== 'all' && this.state.typeFilter !== value.type) {
                flag = false;
              }

              if (
                this.state.supplierFilter !== 'all' &&
                this.state.supplierFilter !== value.supplier
              ) {
                flag = false;
              }

              return flag;
            })}
          />
        </PurchaseListWrapper>
        <PickerListWrapper>
          <PickerList
            editTask={this.openEditModal}
            tasks={purchasing.tasks}
            dragFilter={purchasing.dragFilter}
            typeFilter={this.state.typeFilter}
            employees={employee.employee.filter(value => {
              let flag = value.type.toLowerCase() === 'picker';

              if (
                this.state.supplierFilter !== 'all' &&
                this.state.supplierFilter !== value.supplier
              ) {
                flag = false;
              }

              return flag;
            })}
          />
        </PickerListWrapper>
        {this.state.addModal && (
          <PurchaseModal
            create
            supplier={supplier.supplier}
            save={this.toggleAddModal}
            close={this.toggleAddModal}
          />
        )}
        {this.state.editModal && (
          <PurchaseModal
            data={
              this.state.editCategory === 'unassigned'
                ? purchasing.tasks.unassigned[this.state.editIndex]
                : purchasing.tasks[this.state.editCategory].local[this.state.editIndex]
            }
            supplier={supplier.supplier}
            save={this.closeEditModal}
            close={this.closeEditModal}
          />
        )}
      </Wrapper>
    );
  }
}

const PurchaseListWrapper = styled.div`
  width: 20rem;
  height: 64rem;
  margin: 0 4rem 0 0;
  padding: 0 0 2.1rem;
`;

const PickerListWrapper = styled.div`
  width: calc(100% - 24rem);
  height: 64rem;
`;
