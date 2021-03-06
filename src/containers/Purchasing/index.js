import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
import { isEqual, isEmpty } from 'lodash';
import swal from 'sweetalert';
import { saveAs } from 'file-saver';

import IconUploadWhite from 'assets/icon_upload_white.svg';
import IconDownloadWhite from 'assets/icon_download_white.svg';

import { media } from 'commons/theme';
import {
  PICKER_TASK_HEADER_FIELDS,
  PICKER_TASK_TEMPLATE,
  countDuplicatedPickerTasks,
  removeUnsignedTasks,
} from 'commons/structure';
import { modalBodyScroll } from 'commons/utils';

import PurchaseList from 'components/PurchaseList';
import PurchaseModal from 'components/PurchaseModal';
import PurchaseConfirmation from 'components/PurchaseConfirmation';
import PickerList from 'components/PickerList';
import { Wrapper, ControlPanel, Controls, Control } from 'components/SharedElements';

import { loadEmployee } from 'reducers/employee';
import {
  queryBatch,
  addTask,
  addTasks,
  editTask,
  assignTasks,
  getPemberianTasks,
  beriRating,
} from 'reducers/purchasing';
import { loadSupplier } from 'reducers/supplier';

import Navigation from '../Navigation';

@connect(
  state => ({
    auth: state.auth,
    purchasing: state.purchasing,
    employee: state.employee,
    supplier: state.supplier,
  }),
  {
    queryBatch,
    loadEmployee,
    loadSupplier,
    addTask,
    addTasks,
    editTask,
    assignTasks,
    getPemberianTasks,
    beriRating,
  }
)
export default class Purchasing extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    purchasing: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
    queryBatch: PropTypes.func.isRequired,
    loadEmployee: PropTypes.func.isRequired,
    loadSupplier: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    addTasks: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    assignTasks: PropTypes.func.isRequired,
    getPemberianTasks: PropTypes.func.isRequired,
    beriRating: PropTypes.func.isRequired,
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
      confirmationModal: false,
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

      this.props.queryBatch(
        this.props.purchasing.batch.tanggal_dibuat,
        this.props.purchasing.batch.sesi
      );
      this.props.getPemberianTasks();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.token && nextProps.auth.token) {
      this.props.loadSupplier();
      this.props.loadEmployee();
      this.props.getPemberianTasks();
    }
  }

  componentDidUpdate() {
    if (
      !isEmpty(this.props.employee.employee) &&
      this.props.purchasing.dry &&
      !this.props.purchasing.loading
    ) {
      this.props.queryBatch(
        this.props.purchasing.batch.tanggal_dibuat,
        this.props.purchasing.batch.sesi
      );
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

  downloadHistory = () => {
    const blob = new Blob(
      [Papa.unparse(removeUnsignedTasks(this.props.purchasing.tasks), { header: true })],
      {
        type: 'data:text/csv;charset=utf-8',
      }
    );
    saveAs(
      blob,
      `stoqo_optima_purchasing_history_${this.props.purchasing.date}_batch_${
        this.props.purchasing.batch
      }.csv`
    );
  };

  downloadTemplate = () => {
    const blob = new Blob([Papa.unparse(PICKER_TASK_TEMPLATE, { header: true })], {
      type: 'data:text/csv;charset=utf-8',
    });
    saveAs(blob, 'stoqo_optima_purchasing_template.csv');
  };

  saveAdd = task => {
    this.props.addTask(task);
    this.toggleAddModal();
  };

  saveEdit = task => {
    this.props.editTask(task, this.state.editCategory, this.state.editIndex);
    this.closeEditModal();
  };

  toggleAddModal = () => {
    modalBodyScroll(!this.state.addModal);
    this.setState({ addModal: !this.state.addModal });
  };

  openEditModal = (category, index) => {
    this.setState({ editModal: true, editCategory: category, editIndex: index });
    modalBodyScroll(true);
  };

  closeEditModal = () => {
    this.setState({ editModal: false, editCategory: '', editIndex: -1 });
    modalBodyScroll(false);
  };

  toggleConfirmationModal = () => {
    modalBodyScroll(!this.state.confirmationModal);
    this.setState({ confirmationModal: !this.state.confirmationModal });
  };

  query = (tanggal, sesi) => {
    this.props.queryBatch(tanggal, sesi);
  };

  render() {
    const { purchasing, employee, supplier, queryBatch } = this.props;

    let isAssigningDisabled = true;

    Object.keys(purchasing.tasks).forEach(key => {
      if (key !== 'unassigned') {
        if (!isEmpty(purchasing.tasks[key].local)) {
          isAssigningDisabled = false;
        }
      }
    });

    if (purchasing.tasks.unassigned.length > 0) {
      isAssigningDisabled = true;
    }

    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control>
              <span>Tanggal:</span>
              <input
                type="date"
                value={purchasing.batch.tanggal_dibuat}
                onChange={evt => queryBatch(evt.target.value, purchasing.batch.sesi)}
                placeholder="tanggal pengaturan"
              />
            </Control>
            <Control flex>
              <span>Batch:</span>
              <button
                disabled={purchasing.batch.sesi === 1}
                onClick={() => queryBatch(purchasing.batch.tanggal_dibuat, 1)}
              >
                Cut Off 1
              </button>
              <button
                disabled={purchasing.batch.sesi === 2}
                onClick={() => queryBatch(purchasing.batch.tanggal_dibuat, 2)}
              >
                Cut Off 2
              </button>
              <button
                disabled={purchasing.batch.sesi === 3}
                onClick={() => queryBatch(purchasing.batch.tanggal_dibuat, 3)}
              >
                Final Cut Off
              </button>
            </Control>
            <button
              className="primary blue"
              onClick={this.props.assignTasks}
              disabled={isAssigningDisabled}
            >
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
              <button onClick={this.downloadHistory} className="blue">
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
                {supplier.supplier.filter(s => s.is_active).map(value => (
                  <option key={`${value.id}x${value.nama}`} value={value.id}>
                    {value.nama}
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
                onClick={() => this.setState({ typeFilter: 1 })}
              >
                Pembelian
              </button>
              <button
                disabled={this.state.typeFilter === 'cancel'}
                onClick={() => this.setState({ typeFilter: 0 })}
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
            supplier={supplier.supplier}
            tasks={purchasing.tasks.unassigned.filter(value => {
              let flag = true;

              if (
                this.state.typeFilter !== 'all' &&
                this.state.typeFilter !== value.jenis_sub_task
              ) {
                flag = false;
              }

              if (
                this.state.supplierFilter !== 'all' &&
                this.state.supplierFilter != value.id_supplier
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
            openConfirmation={this.toggleConfirmationModal}
            tasks={purchasing.tasks}
            dragFilter={purchasing.dragFilter}
            typeFilter={this.state.typeFilter}
            employees={employee.employee.filter(value => {
              let flag = value.peran.toLowerCase() === 'picker';

              if (
                this.state.supplierFilter !== 'all' &&
                this.state.supplierFilter != value.id_supplier
              ) {
                flag = false;
              }

              return flag;
            })}
            supplier={supplier.supplier}
            pemberianTasks={purchasing.pemberianTasks}
            beriRating={this.props.beriRating}
          />
        </PickerListWrapper>
        {this.state.addModal && (
          <PurchaseModal
            create
            supplier={supplier.supplier}
            save={this.saveAdd}
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
            save={this.saveEdit}
            close={this.closeEditModal}
          />
        )}
        {this.state.confirmationModal && (
          <PurchaseConfirmation close={this.toggleConfirmationModal} />
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
