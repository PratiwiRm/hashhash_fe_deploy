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

export function queryBatch(tanggal, sesi) {
  return async (dispatch, getState) => {
    try {
      dispatch(loading());
      const employees = getState().employee.employee.filter(employee => employee.peran.toLowerCase() === 'picker');

      const pemberianTaskResponse = await api.pemberianTaskGet();

      const signedTasks = !isEmpty(pemberianTaskResponse.body.data)
        ? pemberianTaskResponse.body.data
        : [];

      const existingBatches = await api.batchGet();
      const dateMoment = Moment(tanggal);

      const existing = existingBatches.body.data.find(b => dateMoment.isSame(b.tanggal_dibuat, 'day') && sesi == b.sesi);

      if (existing) {
        dispatch(setBatch(existing));
        dispatch(tasksLoaded(taskStructurize(existing.task_picker, employees, signedTasks)));
        console.log(existing.task_picker);
      } else {
        const { body } = await api.batchPost({
          tanggal_dibuat: dateMoment.toISOString(),
          sesi,
        });

        dispatch(setBatch(body.data));
        dispatch(tasksLoaded(taskStructurize(body.data.task_picker, employees, signedTasks)));
        console.log(body.data.task_picker);
      }

      window.localStorage.setItem(
        'purchasingTanggalTerakhir',
        dateMoment.format('YYYY-MM-DD').toString()
      );
      window.localStorage.setItem('purchasingSesiTerakhir', sesi);
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
    const dummyTasks = [
      {
        order_id: '2043eeef-a75f-41fe-b64b-3e0541366c21',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'BacaKopi',
        address:
          'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
        address_guide: '',
        product: 'Kantong Plastik Merah - L (500 g), OTO',
        product_img:
          'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
        packaging: 'Pak (28.0 cm)',
        quantity: '20',
        assigned: '',
        type: 'purchase',
        id_supplier: 2,
      },
      {
        order_id: '94618de7-3428-4ff5-a8fa-b96ce8a8404e',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'Ayam Geprek Ummat',
        address:
          'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
        address_guide: '',
        product: 'Minyak Goreng, BIMOLI KLASIK',
        product_img:
          'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
        packaging: 'Jerigen (18.0 ltr)',
        quantity: '5',
        assigned: '',
        type: 'purchase',
        id_supplier: 3,
      },
      {
        order_id: '94618de7-3428-4ff5-a8fa-b96ce8a8404d',
        delivery_date: '2018/04/20',
        status: 'doing',
        customer: 'Ayam Geprek Ummat',
        address:
          'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
        address_guide: '',
        product: 'Minyak Goreng, BIMOLI KLASIK',
        product_img:
          'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
        packaging: 'Jerigen (18.0 ltr)',
        quantity: '5',
        assigned: '089601107931',
        type: 'purchase',
        id_supplier: 1,
        supplier: 'Supplier GammaBeta',
      },
      {
        order_id: '94618de7-3428-4ff5-a8fa-b96ce8a8404f',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'Ayam Geprek Ummat',
        address:
          'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
        address_guide: '',
        product: 'Mie Goreng - Special (85 g), INDOMIE',
        product_img:
          'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
        packaging: 'Karton (40.0 piece)',
        quantity: '5',
        assigned: '089601107931',
        type: 'purchase',
        id_supplier: 1,
      },
      {
        order_id: '94618de7-3428-4ff5-a8fa-b96ce8a8404a',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'Ayam Geprek Ummat',
        address:
          'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
        address_guide: '',
        product: 'Sabun Cuci Piring - Liquid Lime, SUNLIGHT',
        product_img:
          'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
        packaging: 'Kantong (800.0 ml)',
        quantity: '25',
        assigned: '',
        type: 'cancel',
        id_supplier: 2,
      },
      {
        order_id: '94618de7-3428-4ff5-a8fa-b96ce8a8404x',
        delivery_date: '2018/04/20',
        status: 'done',
        customer: 'Ayam Geprek Ummat',
        address:
          'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
        address_guide: '',
        product: 'Tepung Terigu, SEGITIGA BIRU',
        product_img:
          'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
        packaging: 'Karung (25.0 kg)',
        quantity: '4',
        assigned: '089601107931',
        type: 'cancel',
        id_supplier: 1,
      },
      {
        nama: 'Megambil Mangkok Indomie Ke-8',
        nama_barang: 'Leptop R 201.8',
        no_sku_barang: '12345678910sku',
        total_jumlah: 51,
        status: 2,
        jenis: 0,
        id: 9,
        id_supplier: 1,
        batch: 1,
        tanggal_dibuat: '2018-05-12T19:15:48+07:00',
        tanggal_mulai: '2018-05-12T19:15:48+07:00',
        tanggal_selesai: '2018-06-12T19:15:48+07:00',
        tanggal_konfirmasi: '2018-06-12T19:15:48+07:00',
        tanggal_penyelesaian: '2018-07-12T19:15:48+07:00',
        username_manajer: '099999999999',
        jenis_sub_task: 1,
        foto_contoh_barang:
          'https://images10.newegg.com/NeweggImage/ProductImage/34-234-781-V09.jpg',
        out_of_stock_barang: null,
        foto_close_up: null,
      },
    ];

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
  };
}

export function addTasks(tasks) {
  return async (dispatch, getState) => {
    // TODO: POST to Backend{
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
    });
  };
}

export function editTask(task, loc, idx) {
  return dispatch => {
    // TODO: POST to Backend
    dispatch(setTask(task, loc, idx));
  };
}
