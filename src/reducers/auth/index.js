import { push } from 'react-router-redux';
import request, * as api from 'services/api';
import SITEMAP from 'commons/sitemap';

const SET_AUTH = 'app/auth/set_auth';
const SET_ERROR = 'app/auth/set_error';
export const CLEAR_AUTH = 'app/auth/logout';
const LOADING = 'app/auth/loading';

const initialState = {
  login: false,
  loading: false,
  token: '',
  user: {},
  error: '',
  dry: true,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
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
export function logout() {
  return dispatch => {
    // side-effect, clear token
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    request.set('Authorization', null);
    dispatch(clearAuth());
    dispatch(push(SITEMAP.login));
  };
}

export function reloadAuth() {
  return async dispatch => {
    try {
      const { token, user } = window.localStorage;
      if (token) {
        request.set('Authorization', `Token ${token}`);
        dispatch(setAuth({ token, user }));
      } else {
        dispatch(logout());
      }
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
}

export function login(username, password) {
  return async dispatch => {
    try {
      dispatch(loading());
      const { body } = await api.loginPost(username, password);
      window.localStorage.setItem('token', body.data.token);
      window.localStorage.setItem('user', body.data.pegawai);
      request.set('Authorization', `Token ${body.data.token}`);
      dispatch(push(SITEMAP.index));
      dispatch(setAuth({ token: body.data.token, user: body.data.pegawai }));
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
}
