import Moment from 'moment';
import { pickerTaskTransformator, arrayRearanger, arrayMover } from 'commons/structure';

const SET_DATE = 'app/purchasing/SET_DATE';
const SET_BATCH = 'app/purchasing/SET_BATCH';
const TASKS_LOADED = 'app/purchasing/TASKS_LOADED';
const SWAP_TASK = 'app/purchasing/SWAP_TASK';
const MOVE_TASK = 'app/purchasing/MOVE_TASK';
const SET_DRAG_FILTER = 'app/purchasing/SET_DRAG_FILTER';
const ADD_UNASSIGNED_TASKS = 'app/purchasing/ADD_UNASSIGNED_TASKS';

const initialState = {
  loading: false,
  date: Moment()
    .format('YYYY-MM-DD')
    .toString(),
  batch: 1,
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

  switch (action.type) {
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
        batch: action.payload,
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
      };
    case SET_DRAG_FILTER:
      return {
        ...state,
        dragFilter: action.payload,
      };
    case ADD_UNASSIGNED_TASKS:
      tasks.unassigned = [...tasks.unassigned, ...action.payload];

      return {
        ...state,
        tasks,
      };
    default:
      return state;
  }
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

export function addUnassignedTasks(tasks) {
  return { type: ADD_UNASSIGNED_TASKS, payload: tasks };
}

export function loadTasks() {
  return (dispatch, getState) => {
    const employees = getState().employee.employee.filter(employee => employee.type.toLowerCase() === 'picker');

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
        packaging: 'Pak (28.0 cm)',
        quantity: '20',
        assigned: '',
        type: 'purchase',
        supplier: 'Supplier GammaBeta',
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
        packaging: 'Jerigen (18.0 ltr)',
        quantity: '5',
        assigned: '085728333045',
        type: 'purchase',
        supplier: 'Supplier GammaBeta',
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
        packaging: 'Jerigen (18.0 ltr)',
        quantity: '5',
        assigned: '085728333045',
        type: 'purchase',
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
        packaging: 'Karton (40.0 piece)',
        quantity: '5',
        assigned: '087832250320',
        type: 'purchase',
        supplier: 'Supplier SigmaInt',
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
        packaging: 'Kantong (800.0 ml)',
        quantity: '25',
        assigned: '',
        type: 'cancel',
        supplier: 'Supplier SigmaInt',
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
        packaging: 'Karung (25.0 kg)',
        quantity: '4',
        assigned: '087832250320',
        type: 'cancel',
        supplier: 'Supplier SigmaInt',
      },
    ];

    dispatch(tasksLoaded(pickerTaskTransformator(dummyTasks, employees)));
  };
}

export function addTasks(tasks) {
  return dispatch => {
    // TODO: POST to Backend
    dispatch(addUnassignedTasks(tasks));
  };
}
