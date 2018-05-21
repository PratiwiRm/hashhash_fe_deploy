import Moment from 'moment';
import swal from 'sweetalert';

import { isEmpty } from 'lodash';

import { taskStructurize, arrayRearanger, arrayMover } from 'commons/structure';

import * as api from 'services/api';

const LOADING = 'app/purchasing/LOADING';
const SET_DATE = 'app/purchasing/SET_DATE';
const SET_BATCH = 'app/purchasing/SET_BATCH';
const TASKS_LOADED = 'app/purchasing/TASKS_LOADED';
const SWAP_TASK = 'app/purchasing/SWAP_TASK';
const MOVE_TASK = 'app/purchasing/MOVE_TASK';
const SET_DRAG_FILTER = 'app/purchasing/SET_DRAG_FILTER';
const ADD_UNASSIGNED_TASK = 'app/purchasing/ADD_UNASSIGNED_TASK';
const ADD_UNASSIGNED_TASKS = 'app/purchasing/ADD_UNASSIGNED_TASKS';
const SET_TASK = 'app/purchasing/SET_TASK';
const ASSIGN_TASK = 'app/purchasing/ASSIGN_TASK';

const initialState = {
  loading: false,
  batch: {
    tanggal_dibuat: window.localStorage.purchasingTanggalTerakhir
      ? window.localStorage.purchasingTanggalTerakhir
      : Moment()
        .format('YYYY-MM-DD')
        .toString(),
    sesi: window.localStorage.purchasingSesiTerakhir
      ? window.localStorage.purchasingSesiTerakhir
      : 1,
  },
  tasks: {
    unassigned: [],
  },
  dragFilter: '',
  dry: true,
};

export default function reducer(state = initialState, action) {
  const { tasks } = state;
  let swappedTask = [];
  let movedTasks = {};
  let editedTasks = [];

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case TASKS_LOADED:
      return {
        ...state,
        dry: false,
        tasks: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_BATCH:
      return {
        ...state,
        batch: {
          ...action.payload,
          tanggal_dibuat: Moment(action.payload.tanggal_dibuat)
            .format('YYYY-MM-DD')
            .toString(),
        },
        dry: false,
        loading: false,
      };
    case SWAP_TASK:
      if (action.payload.loc !== 'unassigned') {
        swappedTask = arrayRearanger(
          tasks[action.payload.loc].local,
          action.payload.srcIdx,
          action.payload.destIdx
        );
        tasks[action.payload.loc] = { local: swappedTask, ...tasks[action.payload.loc] };
      } else {
        swappedTask = arrayRearanger(
          tasks[action.payload.loc],
          action.payload.srcIdx,
          action.payload.destIdx
        );
        tasks[action.payload.loc] = swappedTask;
      }

      return {
        ...state,
        tasks,
      };
    case MOVE_TASK:
      if (action.payload.srcLoc !== 'unassigned' && action.payload.destLoc !== 'unassigned') {
        movedTasks = arrayMover(
          tasks[action.payload.srcLoc].local,
          action.payload.srcIdx,
          tasks[action.payload.destLoc].local,
          action.payload.destIdx
        );
        tasks[action.payload.srcLoc] = {
          ...tasks[action.payload.srcLoc],
          local: movedTasks.source,
        };
        tasks[action.payload.destLoc] = {
          ...tasks[action.payload.destLoc],
          local: movedTasks.dest,
        };
      } else if (action.payload.srcLoc !== 'unassigned') {
        movedTasks = arrayMover(
          tasks[action.payload.srcLoc].local,
          action.payload.srcIdx,
          tasks[action.payload.destLoc],
          action.payload.destIdx
        );
        tasks[action.payload.srcLoc] = {
          ...tasks[action.payload.srcLoc],
          local: movedTasks.source,
        };
        tasks[action.payload.destLoc] = movedTasks.dest;
      } else if (action.payload.destLoc !== 'unassigned') {
        movedTasks = arrayMover(
          tasks[action.payload.srcLoc],
          action.payload.srcIdx,
          tasks[action.payload.destLoc].local,
          action.payload.destIdx
        );
        tasks[action.payload.srcLoc] = movedTasks.source;
        tasks[action.payload.destLoc] = {
          ...tasks[action.payload.destLoc],
          local: movedTasks.dest,
        };
      }

      return {
        ...state,
        tasks,
      };
    case SET_DRAG_FILTER:
      return {
        ...state,
        dragFilter: action.payload,
      };
    case ADD_UNASSIGNED_TASK:
      tasks.unassigned = [...tasks.unassigned, action.payload];

      return {
        ...state,
        tasks,
        loading: false,
      };
    case ADD_UNASSIGNED_TASKS:
      tasks.unassigned = [...tasks.unassigned, ...action.payload];

      return {
        ...state,
        tasks,
        loading: false,
      };
    case SET_TASK:
      if (action.payload.loc === 'unassigned') {
        editedTasks = [...tasks.unassigned];
        editedTasks.splice(action.payload.idx, 1, action.payload.task);
        tasks.unassigned = [...editedTasks];
      } else {
        editedTasks = [...tasks[action.payload.loc].local];
        editedTasks.splice(action.payload.idx, 1, action.payload.task);
        tasks[action.payload.loc] = {
          ...tasks[action.payload.loc],
          local: [...editedTasks],
        };
      }

      return {
        ...state,
        tasks,
        loading: false,
      };
    case ASSIGN_TASK:
      Object.keys(tasks).forEach(key => {
        if (key !== 'unassigned') {
          tasks[key].signed = tasks[key].signed.concat(tasks[key].local);
          tasks[key].local = [];
        }
      });

      return {
        ...state,
        tasks,
        loading: false,
      };
    default:
      return state;
  }
}

export function loading() {
  return { type: LOADING };
}

export function setDate(date) {
  return { type: SET_DATE, payload: date };
}

export function setBatch(batch) {
  return { type: SET_BATCH, payload: batch };
}

export function tasksLoaded(tasks) {
  return { type: TASKS_LOADED, payload: tasks };
}

export function swapTask(loc, srcIdx, destIdx) {
  return { type: SWAP_TASK, payload: { loc, srcIdx, destIdx } };
}

export function moveTask(srcLoc, destLoc, srcIdx, destIdx) {
  return {
    type: MOVE_TASK,
    payload: {
      srcLoc,
      destLoc,
      srcIdx,
      destIdx,
    },
  };
}

export function setDragFilter(dragFilter) {
  return { type: SET_DRAG_FILTER, payload: dragFilter };
}

export function addUnassignedTask(task) {
  return { type: ADD_UNASSIGNED_TASK, payload: task };
}

export function addUnassignedTasks(tasks) {
  return { type: ADD_UNASSIGNED_TASKS, payload: tasks };
}

export function setTask(task, loc, idx) {
  return { type: SET_TASK, payload: { task, loc, idx } };
}

export function assign() {
  return { type: ASSIGN_TASK };
}

export function queryBatch(tanggal, sesi) {
  return async (dispatch, getState) => {
    try {
      dispatch(loading());
      const dateMoment = Moment(tanggal);

      window.localStorage.setItem(
        'purchasingTanggalTerakhir',
        dateMoment.format('YYYY-MM-DD').toString()
      );
      window.localStorage.setItem('purchasingSesiTerakhir', sesi);

      const employees = getState().employee.employee.filter(employee => employee.peran.toLowerCase() === 'picker');

      const pemberianTaskResponse = await api.pemberianTaskGet();

      const signedTasks = !isEmpty(pemberianTaskResponse.body.data)
        ? pemberianTaskResponse.body.data
        : [];

      console.log(signedTasks);

      const existingBatches = await api.batchGet();

      const existing = existingBatches.body.data.find(b => dateMoment.isSame(b.tanggal_dibuat, 'day') && sesi == b.sesi);

      if (existing) {
        dispatch(setBatch(existing));
        dispatch(tasksLoaded(taskStructurize(existing.task_picker, employees, signedTasks)));
      } else {
        const { body } = await api.batchPost({
          tanggal_dibuat: dateMoment.toISOString(),
          sesi,
        });

        dispatch(setBatch(body.data));
        dispatch(tasksLoaded(taskStructurize(body.data.task_picker, employees, signedTasks)));
      }
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Mengatur Batch',
        text: 'Terjadi kesalahan dalam pengaturan batch',
      });
      console.log(e);
    }
  };
}

export function loadTasks() {
  return async (dispatch, getState) => {
    const { body } = await api.taskPickerGet();
    console.log(body);

    dispatch(tasksLoaded(taskStructureTransformator(dummyTasks, employees)));
  };
}

export function addTask(task, batch) {
  return async (dispatch, getState) => {
    // TODO: POST to Backend
    //  {
    //   id: 11,
    //   nama: 'Membeli Susu Bayi',
    //   status: 0,
    //   jenis: 0,
    //   tanggal_dibuat: '2018-05-21T15:24:01Z',
    //   tanggal_mulai: '2018-05-21T15:24:03Z',
    //   tanggal_selesai: '2018-05-21T17:00:00Z',
    //   username_manajer: '081234567892',
    //   foto_konfirmasi_barang: [],
    //   pembeli: [],
    //   jenis_sub_task: 0,
    //   tanggal_konfirmasi: '2018-05-21T16:00:00Z',
    //   tanggal_penyelesaian: '2018-05-21T16:05:00Z',
    //   foto_contoh_barang: 'Null',
    //   no_sku_barang: '022222222',
    //   total_jumlah: 40,
    //   nama_barang: 'Susu Bayi',
    //   out_of_stock_barang: 0,
    //   foto_close_up: 'Null',
    //   batch: 1,
    //   id_supplier: 1
    // }
    try {
      dispatch(loading());

      const { username } = getState().auth.user;
      const { id } = getState().purchasing.batch;

      const newTask = {
        ...task,
        nama: '[PICKER TASK]',
        status: 0,
        jenis: 0,
        tanggal_dibuat: Moment().toISOString(),
        tanggal_mulai: Moment().toISOString(),
        tanggal_selesai: Moment().toISOString(),
        username_manajer: username,
        no_sku_barang: '0xx00xxx00xx',
        out_of_stock_barang: 0,
        batch: id,
      };

      const { body } = await api.taskPickerPost(newTask);

      dispatch(addUnassignedTask(body.data));
      swal({
        icon: 'success',
        title: 'Sukses Menambahkan Tugas',
        text: 'Berhasil melakukan penambahan tugas',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menambahkan Tugas',
        text: 'Terjadi kesalahan dalam penambahan tugas',
      });
      console.log(e);
    }
  };
}

export function addTasks(tasks) {
  return async (dispatch, getState) => {
    // TODO: POST to Backend{
    try {
      dispatch(loading());

      const { username } = getState().auth.user;
      const { id } = getState().purchasing.batch;
      const newTasks = [];

      const postTasks = tasks.map(async task => {
        console.log(task);

        const newTask = {
          ...task,
          nama: '[PICKER TASK]',
          status: 0,
          jenis: 0,
          tanggal_dibuat: Moment().toISOString(),
          tanggal_mulai: Moment().toISOString(),
          tanggal_selesai: Moment().toISOString(),
          username_manajer: username,
          no_sku_barang: '0xx00xxx00xx',
          out_of_stock_barang: 0,
          batch: id,
        };

        const { body } = await api.taskPickerPost(newTask);
        newTasks.push(body.data);
      });

      Promise.all(postTasks).then(() => {
        dispatch(addUnassignedTasks(newTasks));
        swal({
          icon: 'success',
          title: 'Sukses Menambahkan Tugas',
          text: 'Berhasil melakukan penambahan tugas',
        });
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menambahkan Tugas',
        text: 'Terjadi kesalahan dalam penambahan tugas',
      });
      console.log(e);
    }
  };
}

export function editTask(task, loc, idx) {
  return async dispatch => {
    // TODO: POST to Backend
    try {
      dispatch(loading());

      const { body } = await api.taskPickerPut(task.id, task);

      dispatch(setTask(body.data, loc, idx));
      swal({
        icon: 'success',
        title: 'Sukses Merubah Tugas',
        text: 'Berhasil melakukan pengubahan tugas',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Merubah Tugas',
        text: 'Terjadi kesalahan dalam pengubahan tugas',
      });
      console.log(e);
    }
  };
}

export function assignTasks() {
  return async (dispatch, getState) => {
    try {
      dispatch(loading());

      const { username } = getState().auth.user;
      const tasks = { ...getState().purchasing.tasks };
      delete tasks.unassigned;

      const parent = Object.keys(tasks).map(async key => {
        const assigning = tasks[key].local.map(async task => {
          const { body } = await api.pemberianTaskPost({
            id_task: task.id,
            username_manajer: username,
            username_pegawai_lapangan: key,
          });

          return body;
        });

        return Promise.all(assigning).then(res => res);
      });

      Promise.all(parent).then(() => {
        dispatch(assign());
        swal({
          icon: 'success',
          title: 'Sukses Mengassign Tugas Pembelian',
          text: 'Berhasil membagikan tugas pembelian',
        });
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Mengassing Tugas Pembelian',
        text: 'Gagal membagikan tugas pembelian',
      });
    }
  };
}
