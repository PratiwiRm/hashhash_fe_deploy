import swal from 'sweetalert';

import * as api from 'services/api';

const LOADING = 'app/performance/LOADING';
const SET_PERFORMANCE = 'app/performance/SET_PERFORMANCE';

const initialState = {
  loading: false,
  data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PERFORMANCE:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}

export function loading() {
  return { type: LOADING };
}

export function setPerformance(data) {
  return { type: SET_PERFORMANCE, payload: data };
}

export function getPerformance() {
  return async dispatch => {
    try {
      dispatch(loading());

      const { body } = await api.performanceGet();

      dispatch(setPerformance(body.data.detail));
      swal({
        icon: 'success',
        title: 'Berhasil menampilkan data performa',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Gagal menampilkan data performa',
      });
      console.log(e);
    }
  };
}
