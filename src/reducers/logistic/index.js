import Moment from 'moment';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';

import {
  taskStructureTransformator,
  taskStructurize,
  arrayRearanger,
  arrayMover,
} from 'commons/structure';

import * as api from 'services/api';

const LOADING = 'app/logistic/LOADING';
const SET_DATE = 'app/logistic/SET_DATE';
const SET_BATCH = 'app/logistic/SET_BATCH';
const TASKS_LOADED = 'app/logistic/TASKS_LOADED';
const SWAP_TASK = 'app/logistic/SWAP_TASK';
const MOVE_TASK = 'app/logistic/MOVE_TASK';
const SET_DRAG_FILTER = 'app/logistic/SET_DRAG_FILTER';
const ADD_UNASSIGNED_TASK = 'app/logistic/ADD_UNASSIGNED_TASK';
const ADD_UNASSIGNED_TASKS = 'app/logistic/ADD_UNASSIGNED_TASKS';
const SET_TASK = 'app/logistic/SET_TASK';
const ASSIGN_TASK = 'app/logistic/ASSIGN_TASK';

const initialState = {
  loading: false,
  date: Moment()
    .format('YYYY-MM-DD')
    .toString(),
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
        loading: false,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
        loading: false,
      };
    case SET_BATCH:
      return {
        ...state,
        batch: action.payload,
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
          local: movedTasks.source,
          ...tasks[action.payload.srcLoc],
        };
        tasks[action.payload.destLoc] = {
          local: movedTasks.dest,
          ...tasks[action.payload.destLoc],
        };
      } else if (action.payload.srcLoc !== 'unassigned') {
        movedTasks = arrayMover(
          tasks[action.payload.srcLoc].local,
          action.payload.srcIdx,
          tasks[action.payload.destLoc],
          action.payload.destIdx
        );
        tasks[action.payload.srcLoc] = {
          local: movedTasks.source,
          ...tasks[action.payload.srcLoc],
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
          local: movedTasks.dest,
          ...tasks[action.payload.destLoc],
        };
      }

      return {
        ...state,
        tasks,
        loading: false,
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

export function loadTasks() {
  return async (dispatch, getState) => {
    try {
      const employees = getState().employee.employee.filter(employee => employee.peran.toLowerCase() === 'driver');
      dispatch(loading());

      const taskDriverResponse = await api.taskDriverGet();
      const pemberianTaskResponse = await api.pemberianTaskGet();

      const driverTasks = !isEmpty(taskDriverResponse.body.data)
        ? taskDriverResponse.body.data
        : [];
      const signedTasks = !isEmpty(pemberianTaskResponse.body.data)
        ? pemberianTaskResponse.body.data
        : [];

      dispatch(tasksLoaded(taskStructurize(driverTasks, employees, signedTasks)));
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menampilkan Data Tugas Logistik',
        text: 'Terjadi kesalahan dalam penampilan data logistik',
      });
      console.log(e);
    }
  };
}

export function addTask(task, callback) {
  return async (dispatch, getState) => {
    try {
      dispatch(loading());

      const { username } = getState().auth.user;

      let newDriverTask = {
        nama: `[DRIVER] Pengiriman ${task.pick_up
          .map(pickup => pickup.outlite)
          .join('-')} ${task.drop_off.map(pickup => pickup.outlite).join('-')}`,
        status: -2,
        jenis: 1,
        tanggal_dibuat: Moment().toISOString(),
        username_manajer: username,
      };

      const newTaskResponse = await api.taskDriverPost(newDriverTask);
      newDriverTask = newTaskResponse.body.data;

      const pickUps = task.pick_up.map(async node => {
        const { body } = await api.taskDriverPickUpPost(newDriverTask.id, {
          ...node,
          status: -1,
          saran_tanggal_tiba: Moment().toISOString(),
          id_task_driver: newDriverTask.id,
        });
        return body.data;
      });

      Promise.all(pickUps).then(newPickUps => {
        newDriverTask.pick_up = newPickUps;

        const dropOffs = task.drop_off.map(async node => {
          const { body } = await api.taskDriverDropOffPost(newDriverTask.id, {
            ...node,
            status: -1,
            id_task_driver: newDriverTask.id,
          });
          return body.data;
        });

        Promise.all(dropOffs).then(newDropOffs => {
          newDriverTask.drop_off = newDropOffs;

          dispatch(addUnassignedTask(newDriverTask));
          swal({
            icon: 'success',
            title: 'Sukses Menambahkan Data Tugas Logistik',
            text: 'Berhasil melakukan penambahan data logistik',
          });
          callback();
        });
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menambahkan Data Tugas Logistik',
        text: 'Terjadi kesalahan dalam penambahan data logistik',
      });
      console.log(e);
    }
  };
}

export function addTasks(tasks) {
  return async (dispatch, getState) => {
    try {
      dispatch(loading());

      const { username } = getState().auth.user;

      const newTasks = [];

      const posts = tasks.map(async task => {
        let newDriverTask = {
          nama: `[DRIVER] Pengiriman ${task.pick_up
            .map(pickup => pickup.outlite)
            .join('-')} ${task.drop_off.map(pickup => pickup.outlite).join('-')}`,
          status: -2,
          jenis: 1,
          tanggal_dibuat: Moment().toISOString(),
          username_manajer: username,
        };

        const newTaskResponse = await api.taskDriverPost(newDriverTask);
        newDriverTask = newTaskResponse.body.data;

        const pickUps = task.pick_up.map(async node => {
          const { body } = await api.taskDriverPickUpPost(newDriverTask.id, {
            ...node,
            status: -1,
            saran_tanggal_tiba: Moment().toISOString(),
            id_task_driver: newDriverTask.id,
          });
          return body.data;
        });

        return Promise.all(pickUps).then(newPickUps => {
          newDriverTask.pick_up = newPickUps;

          const dropOffs = task.drop_off.map(async node => {
            const { body } = await api.taskDriverDropOffPost(newDriverTask.id, {
              ...node,
              status: -1,
              id_task_driver: newDriverTask.id,
            });
            return body.data;
          });

          return Promise.all(dropOffs).then(newDropOffs => {
            newDriverTask.drop_off = newDropOffs;

            newTasks.push(newDriverTask);
            return newTasks;
          });
        });
      });

      Promise.all(posts).then(() => {
        dispatch(addUnassignedTasks(newTasks));
        swal({
          icon: 'success',
          title: 'Sukses Menambahkan Tugas Logistik dari File CSV',
          text:
            'Berhasil melakukan penambahan semua data yang ada pada file CSV sebagai tugas logistik',
        });
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menambahkan Tugas Logistik dari File CSV',
        text:
          'Terjadi kesalahan dalam melakukan penambahan semua data yang ada pada file CSV sebagai tugas logistik',
      });
    }
  };
}

export function editTask(task, loc, idx) {
  return async (dispatch, getState) => {
    try {
      dispatch(loading());

      const oldTask =
        loc === 'unassigned'
          ? getState().logistic.tasks.unassigned[idx]
          : getState().logistic.tasks[loc].local[idx];

      let newDriverTask = { ...task };
      delete newDriverTask.id;
      delete newDriverTask.pick_up;
      delete newDriverTask.drop_off;

      const newTaskResponse = await api.taskDriverPut(task.id, newDriverTask);
      newDriverTask = newTaskResponse.body.data;

      const pickUpResponse = await api.taskDriverPickUpPut(
        task.id,
        task.pick_up[0].id,
        task.pick_up[0]
      );

      newDriverTask.pick_up = [pickUpResponse.body.data];

      const removedDropOffs = oldTask.drop_off.filter(node =>
        isEmpty(task.drop_off.find(e => node.id === e.id)));

      const removeDropOffs = removedDropOffs.map(async node => {
        await api.taskDriverDropOffDelete(task.id, node.id);
      });

      Promise.all(removeDropOffs).then(() => {
        const newDropOffs = task.drop_off.filter(e => e.id === null || e.id === undefined);

        const postDropOffs = newDropOffs.map(async node => {
          const { body } = await api.taskDriverDropOffPost(task.id, {
            ...node,
            status: -1,
            id_task_driver: task.id,
          });
          return body.data;
        });

        Promise.all(postDropOffs).then(additionalDropOffs => {
          const editedDropOffs = task.drop_off.filter(e => e.id !== null && e.id !== undefined);

          const putDropOffs = editedDropOffs.map(async node => {
            const { body } = await api.taskDriverDropOffPut(task.id, node.id, node);
            return body.data;
          });

          Promise.all(putDropOffs).then(setDropOffs => {
            const finalDropOffs = [...setDropOffs, ...additionalDropOffs];
            newDriverTask.drop_off = finalDropOffs;

            dispatch(setTask(newDriverTask, loc, idx));
            swal({
              icon: 'success',
              title: 'Sukses Mengubah Data Tugas Logistik',
              text: 'Berhasil melakukan pengubahan data logistik',
            });
          });
        });
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Mengubah Data Tugas Logistik',
        text: 'Terjadi kesalahan dalam pengubahan data logistik',
      });
      console.log(e);
    }
  };
}

export function assignTasks() {
  return async (dispatch, getState) => {
    dispatch(loading());

    const { username } = getState().auth.user;
    const tasks = { ...getState().logistic.tasks };
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
    });
  };
}
