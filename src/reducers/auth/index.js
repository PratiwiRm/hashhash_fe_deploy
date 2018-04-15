// import { push } from 'react-router-redux';
// import request, * as api from '../../services/api';
// import { LOGIN_PATH } from '../../common/routing';

const SET_AUTH = 'app/auth/set_auth';
const SET_ERROR = 'app/auth/set_error';
export const CLEAR_AUTH = 'app/auth/logout';
const LOADING = 'app/auth/loading';

const initialState = {
  login: false,
  loading: false,
  token: '',
  error: '',
  dry: true,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        loading: false,
        login: true,
        error: '',
        dry: false,
        ...action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        dry: false,
      };
    case LOADING:
      return { ...state, loading: true, dry: false };
    case CLEAR_AUTH:
      return { ...initialState, dry: false };
    default:
      return state;
  }
}

// Action Creator
export function setAuth(payload) {
  return { type: SET_AUTH, payload };
}

export function setError(payload) {
  return { type: SET_ERROR, payload };
}

export function clearAuth() {
  return { type: CLEAR_AUTH };
}

export function loading() {
  return { type: LOADING };
}

// Thunk
// export function logout() {
//   return dispatch => {
//     // side-effect, clear token
//     window.localStorage.removeItem('token');
//     request.set('Authorization', null);
//     dispatch(clearAuth());
//     dispatch(push(LOGIN_PATH));
//   };
// }

// export function reloadAuth() {
//   return async dispatch => {
//     try {
//       const { token } = window.localStorage;
//       if (token) {
//         request.set('Authorization', `JWT ${token}`);
//         dispatch(setAuth({ token }));
//       } else {
//         dispatch(logout());
//       }
//     } catch (e) {
//       dispatch(setError(e.message));
//     }
//   };
// }

// export function login(email, password) {
//   return async dispatch => {
//     try {
//       dispatch(loading());
//       const { body } = await api.login(email, password);
//       window.localStorage.setItem('token', body.token);
//       request.set('Authorization', `JWT ${body.token}`);
//       dispatch(setAuth({ token: body.token }));
//     } catch (e) {
//       dispatch(setError(e.message));
//     }
//   };
// }
