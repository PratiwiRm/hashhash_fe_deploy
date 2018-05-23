import swal from 'sweetalert';
import * as api from 'services/api';

const SET_HELP = 'app/help/SET_HELP';

const initialState = {
  help: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_HELP:
      return {
        ...state,
        help: action.payload,
      };
    default:
      return state;
  }
}

export function setHelp(help) {
  return { type: SET_HELP, payload: help };
}

export function refreshHelp() {
  return async dispatch => {
    try {
      const { body } = await api.pollingBantuanGet();

      dispatch(setHelp(body.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function giveHelp(help) {
  return async dispatch => {
    try {
      await api.pemberianTaskPut(
        help.id_task,
        help.username_manajer,
        help.username_pegawai_lapangan,
        { ...help, status_bantuan: 1 }
      );

      dispatch(refreshHelp());
      swal({
        icon: 'success',
        title: 'Berhasil merespon permintaan bantuan',
        text: 'Silahkan hubungi pegawai lapangan tersebut segera',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error merespon permintaan bantuan',
        text: 'Terjadi kesalahan dalam merespon permintaan bantuan',
      });
      console.log(e);
    }
  };
}
