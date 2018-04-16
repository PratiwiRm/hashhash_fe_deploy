import Moment from 'moment';

const SET_DATE = 'app/purchasing/SET_DATE';
const SET_BATCH = 'app/purchasing/SET_BATCH';

const initialState = {
  loading: false,
  date: Moment()
    .format('YYYY-MM-DD')
    .toString(),
  batch: 1,
  dry: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
