import Moment from 'moment';
import { taskStructureTransformator, arrayRearanger, arrayMover } from 'commons/structure';

const SET_DATE = 'app/logistic/SET_DATE';
const SET_BATCH = 'app/logistic/SET_BATCH';
const TASKS_LOADED = 'app/logistic/TASKS_LOADED';
const SWAP_TASK = 'app/logistic/SWAP_TASK';
const MOVE_TASK = 'app/logistic/MOVE_TASK';
const SET_DRAG_FILTER = 'app/logistic/SET_DRAG_FILTER';
const ADD_UNASSIGNED_TASK = 'app/logistic/ADD_UNASSIGNED_TASK';
const ADD_UNASSIGNED_TASKS = 'app/logistic/ADD_UNASSIGNED_TASKS';
const SET_TASK = 'app/logistic/SET_TASK';

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
    case ADD_UNASSIGNED_TASK:
      tasks.unassigned = [...tasks.unassigned, action.payload];

      return {
        ...state,
        tasks,
      };
    case ADD_UNASSIGNED_TASKS:
      tasks.unassigned = [...tasks.unassigned, ...action.payload];

      return {
        ...state,
        tasks,
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
      };
    default:
      return state;
  }
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

export function loadTasks() {
  return (dispatch, getState) => {
    const employees = getState().employee.employee.filter(employee => employee.peran.toLowerCase() === 'driver');

    const dummyTasks = [
      {
        delivery_id: '3442eecf-a75f-41fe-b64b-3e0541366c21',
        assigned: '',
        status: 'pending',
        pick_ups: [
          {
            outlet: 'Sorting Hub',
            address:
              'Jl. Mayjen DI Panjaitan No. 1C, Kebon Pala, Makasar, RT. 001 RW. 006, RT.1/RW.6, Kb. Pala, Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650',
            notes:
              'PICK-UP:\n\n(Van A) #1-A Outlet BacaKopi\n+ Packaging A\n+ Packaging B\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen\n\n(Van A) #2-B Outlet Ayam Geprek Ummat\n+ Packaging C\n\n(Van A) #3-C Outlet Ti Amo Thai Tea\n+ Telur Ayam Negeri 10kg(UNBRANDED) (Krat 10.0 kg); 1 Krat\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen',
            pic: 'Adi',
            contact: '+6281499882354',
          },
        ],
        drop_offs: [
          {
            outlet: 'BacaKopi',
            address: 'Jl. Tanjung Duren Barat I - No. 11',
            notes:
              'DROP-OFF:\n\n(Van A) #1-A Outlet BacaKopi\n+ Packaging A\n+ Packaging B\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen',
            pic: 'Budi',
            contact: '+6282175438756',
          },
          {
            outlet: 'Ayam Geprek Ummat',
            address:
              'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
            notes: 'DROP-OFF:\n\n(Van A) #2-B Outlet Ayam Geprek Ummat\n+ Packaging C',
            pic: 'Candra',
            contact: '+6282175438756',
          },
          {
            outlet: 'Ti Amo Thai Tea',
            address:
              'Jl Masjid Assurur No 59 J RT 09 RW 01 Kel kebon jeruk Kec Kebon Jeruk Kota Jakarta Barat 11530',
            notes:
              'DROP-OFF:\n\n(Van A) #3-C Outlet Ti Amo Thai Tea\n+ Telur Ayam Negeri 10kg(UNBRANDED) (Krat 10.0 kg); 1 Krat\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen',
            pic: 'Dadang',
            contact: '+6282175438756',
          },
        ],
      },
      {
        delivery_id: '2043eeef-a75f-41fe-b64b-3e05413664e5',
        assigned: '',
        status: 'pending',
        pick_ups: [
          {
            outlet: 'Sorting Hub',
            address:
              'Jl. Mayjen DI Panjaitan No. 1C, Kebon Pala, Makasar, RT. 001 RW. 006, RT.1/RW.6, Kb. Pala, Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650',
            notes:
              'PICK-UP:\n\n(Van A) #1-A Outlet BacaKopi\n+ Packaging A\n+ Packaging B\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen\n\n(Van A) #2-B Outlet Ayam Geprek Ummat\n+ Packaging C\n\n(Van A) #3-C Outlet Ti Amo Thai Tea\n+ Telur Ayam Negeri 10kg(UNBRANDED) (Krat 10.0 kg); 1 Krat\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen',
            pic: 'Adi',
            contact: '+6281499882354',
          },
        ],
        drop_offs: [
          {
            outlet: 'BacaKopi',
            address: 'Jl. Tanjung Duren Barat I - No. 11',
            notes:
              'DROP-OFF:\n\n(Van A) #1-A Outlet BacaKopi\n+ Packaging A\n+ Packaging B\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen',
            pic: 'Budi',
            contact: '+6282175438756',
          },
          {
            outlet: 'Ayam Geprek Ummat',
            address:
              'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
            notes: 'DROP-OFF:\n\n(Van A) #2-B Outlet Ayam Geprek Ummat\n+ Packaging C',
            pic: 'Candra',
            contact: '+6282175438756',
          },
          {
            outlet: 'Ti Amo Thai Tea',
            address:
              'Jl Masjid Assurur No 59 J RT 09 RW 01 Kel kebon jeruk Kec Kebon Jeruk Kota Jakarta Barat 11530',
            notes:
              'DROP-OFF:\n\n(Van A) #3-C Outlet Ti Amo Thai Tea\n+ Telur Ayam Negeri 10kg(UNBRANDED) (Krat 10.0 kg); 1 Krat\n+ Minyak Goreng(BIMOLI KLASIK) (Jerigen 18.0 ltr); 2 Jerigen',
            pic: 'Dadang',
            contact: '+6282175438756',
          },
        ],
      },
    ];

    dispatch(tasksLoaded(taskStructureTransformator(dummyTasks, employees)));
  };
}

export function addTask(task) {
  return dispatch => {
    // TODO: POST to Backend
    const newTask = { ...task };
    const randomScalingFactor = max => Math.floor(Math.random() * max);
    newTask.delivery_id = `dummyeef-a75f-41fe-b64b-3e05413664e$${randomScalingFactor(5000)}`;
    newTask.status = 'pending';
    dispatch(addUnassignedTask(newTask));
  };
}

export function addTasks(tasks) {
  return dispatch => {
    // TODO: POST to Backend
    // THIS IS A DUMMY DELIVERY_ID ASSIGNMENT, DELIVERY_ID SHOULD BE PROVIDED BY BACKEND
    const dummyTasks = tasks.map((task, index) => {
      const newTask = { ...task };
      newTask.delivery_id = `dummyeef-a75f-41fe-b64b-3e05413664e${index}`;
      newTask.status = 'pending';

      return task;
    });

    dispatch(addUnassignedTasks(dummyTasks));
  };
}

export function editTask(task, loc, idx) {
  return dispatch => {
    // TODO: POST to Backend
    dispatch(setTask(task, loc, idx));
  };
}
