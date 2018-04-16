import Moment from 'moment';

const SET_DATE = 'app/purchasing/SET_DATE';
const SET_BATCH = 'app/purchasing/SET_BATCH';
const TASKS_LOADED = 'app/purchasing/TASKS_LOADED';

const initialState = {
  loading: false,
  date: Moment()
    .format('YYYY-MM-DD')
    .toString(),
  batch: 1,
  tasks: [],
  dry: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_LOADED:
      return {
        ...state,
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

export function loadTasks() {
  return dispatch => {
    const dummyTasks = [
      {
        orderId: '2043eeef-a75f-41fe-b64b-3e0541366c21',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'BacaKopi',
        produk: 'Kantong Plastik Merah - L (500 g), OTO',
        kemasan: 'Pak (28.0 cm)',
        jumlah: '20',
        assigned: '',
        type: 'purchase',
        supplier: 'Supplier GammaBeta',
      },
      {
        orderId: '94618de7-3428-4ff5-a8fa-b96ce8a8404e',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'Ayam Geprek Ummat',
        produk: 'Minyak Goreng, BIMOLI KLASIK',
        kemasan: 'Jerigen (18.0 ltr)',
        jumlah: '5',
        assigned: '085728333045',
        type: 'purchase',
        supplier: 'Supplier GammaBeta',
      },
      {
        orderId: '94618de7-3428-4ff5-a8fa-b96ce8a8404e',
        delivery_date: '2018/04/20',
        status: 'doing',
        customer: 'Ayam Geprek Ummat',
        produk: 'Minyak Goreng, BIMOLI KLASIK',
        kemasan: 'Jerigen (18.0 ltr)',
        jumlah: '5',
        assigned: '085728333045',
        type: 'purchase',
        supplier: 'Supplier GammaBeta',
      },
      {
        orderId: '94618de7-3428-4ff5-a8fa-b96ce8a8404e',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'Ayam Geprek Ummat',
        produk: 'Mie Goreng - Special (85 g), INDOMIE',
        kemasan: 'Karton (40.0 piece)',
        jumlah: '5',
        assigned: '087832250320',
        type: 'purchase',
        supplier: 'Supplier SigmaInt',
      },
      {
        orderId: '94618de7-3428-4ff5-a8fa-b96ce8a8404e',
        delivery_date: '2018/04/20',
        status: 'pending',
        customer: 'Ayam Geprek Ummat',
        produk: 'Sabun Cuci Piring - Liquid Lime, SUNLIGHT',
        kemasan: 'Kantong (800.0 ml)',
        jumlah: '25',
        assigned: '',
        type: 'cancel',
        supplier: 'Supplier SigmaInt',
      },
      {
        orderId: '94618de7-3428-4ff5-a8fa-b96ce8a8404e',
        delivery_date: '2018/04/20',
        status: 'done',
        customer: 'Ayam Geprek Ummat',
        produk: 'Tepung Terigu, SEGITIGA BIRU',
        kemasan: 'Karung (25.0 kg)',
        jumlah: '4',
        assigned: '087832250320',
        type: 'cancel',
        supplier: 'Supplier SigmaInt',
      },
    ];

    dispatch(tasksLoaded(dummyTasks));
  };
}
