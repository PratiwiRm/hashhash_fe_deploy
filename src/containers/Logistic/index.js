import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';
import { isEqual } from 'lodash';
import swal from 'sweetalert';
import { saveAs } from 'file-saver';

import IconUploadWhite from 'assets/icon_upload_white.svg';
import IconDownloadWhite from 'assets/icon_download_white.svg';

import {
  DRIVER_TASK_HEADER_FIELDS,
  DRIVER_TASK_TEMPLATE,
  countDuplicatedDriverTasks,
  driverTaskCsvStructureTransformator,
  destructurizeDriverTasks,
  removeUnsignedTasks,
} from 'commons/structure';
import { modalBodyScroll } from 'commons/utils';

import DeliveryList from 'components/DeliveryList';
import DeliveryModal from 'components/DeliveryModal';
import DriverList from 'components/DriverList';
import { Wrapper, ControlPanel, Controls, Control } from 'components/SharedElements';

import { loadEmployee } from 'reducers/employee';
import { setDate, loadTasks, addTask, addTasks, editTask } from 'reducers/logistic';

import Navigation from '../Navigation';

@connect(state => ({ logistic: state.logistic, employee: state.employee }), {
  setDate,
  loadEmployee,
  loadTasks,
  addTask,
  addTasks,
  editTask,
})
export default class Logistic extends Component {
  static propTypes = {
    logistic: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    setDate: PropTypes.func.isRequired,
    loadEmployee: PropTypes.func.isRequired,
    loadTasks: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    addTasks: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      addModal: false,
      editModal: false,
      editCategory: '',
      editIndex: -1,
    };
  }

  componentDidMount() {
    if (this.props.employee.dry) {
      this.props.loadEmployee();
    }

    if (this.props.logistic.dry) {
      this.props.loadTasks();
    }
  }

  handleCSV = event => {
    event.preventDefault();
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const { fields } = results.meta;

        if (isEqual([...fields].sort(), [...DRIVER_TASK_HEADER_FIELDS].sort())) {
          const data = driverTaskCsvStructureTransformator(results.data);
          const dupeCount = countDuplicatedDriverTasks(this.props.logistic.tasks, data);

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
      [
        Papa.unparse(destructurizeDriverTasks(removeUnsignedTasks(this.props.logistic.tasks)), {
          header: true,
        }),
      ],
      {
        type: 'data:text/csv;charset=utf-8',
      }
    );
    saveAs(blob, `stoqo_optima_logistic_history_${this.props.logistic.date}.csv`);
  };

  downloadTemplate = () => {
    const blob = new Blob([Papa.unparse(DRIVER_TASK_TEMPLATE, { header: true })], {
      type: 'data:text/csv;charset=utf-8',
    });
    saveAs(blob, 'stoqo_optima_logistic_template.csv');
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

  render() {
    const { logistic, employee } = this.props;

    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control>
              <span>Tanggal:</span>
              <input
                type="date"
                value={logistic.date}
                onChange={evt => this.props.setDate(evt.target.value)}
                placeholder="tanggal pengaturan"
              />
            </Control>
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
            <button className="primary blue" disabled>
              Assign Tugas
            </button>
          </Controls>
        </ControlPanel>
        <DeliveryListWrapper>
          <DeliveryList
            addTask={this.toggleAddModal}
            editTask={this.openEditModal}
            tasks={logistic.tasks.unassigned}
          />
        </DeliveryListWrapper>
        <DriverListWrapper>
          <DriverList
            editTask={this.openEditModal}
            tasks={logistic.tasks}
            dragFilter={logistic.dragFilter}
            employees={employee.employee.filter(value => value.type.toLowerCase() === 'driver')}
          />
        </DriverListWrapper>
        {this.state.addModal && (
          <DeliveryModal create save={this.saveAdd} close={this.toggleAddModal} />
        )}
        {this.state.editModal && (
          <DeliveryModal
            data={
              this.state.editCategory === 'unassigned'
                ? logistic.tasks.unassigned[this.state.editIndex]
                : logistic.tasks[this.state.editCategory].local[this.state.editIndex]
            }
            save={this.saveEdit}
            close={this.closeEditModal}
          />
        )}
      </Wrapper>
    );
  }
}

const DeliveryListWrapper = styled.div`
  width: 20rem;
  height: 64rem;
  margin: 0 4rem 0 0;
  padding: 0 0 2.1rem;
`;

const DriverListWrapper = styled.div`
  width: calc(100% - 24rem);
  height: 64rem;
`;
