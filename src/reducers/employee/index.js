import Moment from 'moment';
import swal from 'sweetalert';
import { isEqual } from 'lodash';

import * as api from 'services/api';

const LOADING = 'app/employee/LOADING';
const EMPLOYEE_LOADED = 'app/employee/EMPLOYEE_LOADED';
const EMPLOYEE_ADDED = 'app/employee/EMPLOYEE_ADDED';
const EMPLOYEE_EDITED = 'app/employee/EMPLOYEE_EDITED';

const initialState = {
  loading: false,
  employee: [],
  dry: true,
};

export default function reducer(state = initialState, action) {
  const newEmployeeList = state.employee;

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYEE_LOADED:
      return {
        ...state,
        loading: false,
        employee: action.payload,
        dry: false,
      };
    case EMPLOYEE_ADDED:
      newEmployeeList.push(action.payload);

      return {
        ...state,
        loading: false,
        employee: newEmployeeList,
      };
    case EMPLOYEE_EDITED:
      newEmployeeList[action.index] = action.payload;

      return {
        ...state,
        loading: false,
        employee: newEmployeeList,
      };
    default:
      return state;
  }
}

export function loading() {
  return { type: LOADING };
}

export function employeeLoaded(employee) {
  return { type: EMPLOYEE_LOADED, payload: employee };
}

export function employeeAdded(employee) {
  return { type: EMPLOYEE_ADDED, payload: employee };
}

export function employeeEdited(index, employee) {
  return { type: EMPLOYEE_EDITED, index, payload: employee };
}

export function loadEmployee() {
  return async dispatch => {
    try {
      dispatch(loading());

      let employees = [];
      const resPicker = await api.pickerGet();
      const resDriver = await api.driverGet();

      employees = employees.concat(resPicker.body.data);
      employees = employees.concat(resDriver.body.data);

      dispatch(employeeLoaded(employees));
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menampilkan Data Pegawai',
        text: 'Terjadi kesalahan dalam penamiplan data pegawai',
      });
      console.log(e);
    }
  };
}

export function addEmployee(newEmployee) {
  return async dispatch => {
    try {
      dispatch(loading());

      await api.ktpPost({
        no_ktp: newEmployee.ktp.no_ktp,
        alamat: newEmployee.ktp.alamat,
        tempat_lahir: newEmployee.ktp.tempat_lahir,
        tanggal_lahir: Moment(newEmployee.ktp.tanggal_lahir).toISOString(),
      });

      const employee = {
        username: newEmployee.username,
        password: newEmployee.password,
        nama: newEmployee.nama,
        foto: newEmployee.foto,
        no_ktp: newEmployee.no_ktp,
        ktp: newEmployee.ktp,
        peran: newEmployee.peran,
        tanggal_bergabung: Moment().toISOString(),
      };

      if (newEmployee.peran.toLowerCase() === 'picker') {
        employee.id_supplier = newEmployee.id_supplier;
        await api.pickerPost(employee);
      }

      if (newEmployee.peran.toLowerCase() === 'driver') {
        await api.simPost(newEmployee.sim);

        employee.no_sim = newEmployee.no_sim;
        employee.sim = newEmployee.sim;

        await api.driverPost(employee);
      }

      dispatch(employeeAdded(employee));
      swal({
        icon: 'success',
        title: 'Sukses Menyimpan Data Pegawai',
        text: 'Berhasil melakukan penyimpanan data pegawai',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menyimpan Data Pegawai',
        text: 'Terjadi kesalahan dalam penyimpanan data pegawai',
      });
      console.log(e);
    }
  };
}

export function editEmployee(index, updatedEmployee) {
  return async (dispatch, getState) => {
    try {
      const employees = getState().employee.employee;

      dispatch(loading());

      if (!isEqual(employees[index].ktp, updatedEmployee.ktp)) {
        await api.ktpPut(updatedEmployee.no_ktp, {
          no_ktp: updatedEmployee.ktp.no_ktp,
          alamat: updatedEmployee.ktp.alamat,
          tempat_lahir: updatedEmployee.ktp.tempat_lahir,
          tanggal_lahir: Moment(updatedEmployee.ktp.tanggal_lahir).toISOString(),
        });
      }

      const employee = {
        username: updatedEmployee.username,
        password: updatedEmployee.password,
        nama: updatedEmployee.nama,
        foto: updatedEmployee.foto,
        no_ktp: updatedEmployee.no_ktp,
        ktp: updatedEmployee.ktp,
        peran: updatedEmployee.peran,
        tanggal_bergabung: employees[index].tanggal_bergabung,
      };

      if (updatedEmployee.peran.toLowerCase() === 'picker') {
        employee.id_supplier = updatedEmployee.id_supplier;
        await api.pickerPut(updatedEmployee.username, employee);
      }

      if (updatedEmployee.peran.toLowerCase() === 'driver') {
        if (!isEqual(employees[index].sim, updatedEmployee.sim)) {
          await api.simPut(updatedEmployee.no_sim, updatedEmployee.sim);

          employee.no_sim = updatedEmployee.no_sim;
          employee.sim = updatedEmployee.sim;
        }

        await api.driverPut(updatedEmployee.username, employee);
      }

      dispatch(employeeEdited(index, employee));
      swal({
        icon: 'success',
        title: 'Sukses Mengubah Data Pegawai',
        text: 'Berhasil melakukan pengubahan data pegawai',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Mengubah Data Pegawai',
        text: 'Terjadi kesalahan dalam pengubahan data pegawai',
      });
      console.log(e);
    }
  };
}
