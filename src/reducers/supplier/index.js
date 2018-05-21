import swal from 'sweetalert';

import * as api from 'services/api';

const LOADING = 'app/supplier/LOADING';
const SUPPLIER_LOADED = 'app/supplier/SUPPLIER_LOADED';
const SUPPLIER_ADDED = 'app/supplier/SUPPLIER_ADDED';
const SUPPLIER_EDITED = 'app/supplier/SUPPLIER_EDITED';

const initialState = {
  loading: false,
  supplier: [],
  dry: true,
};

export default function reducer(state = initialState, action) {
  const newSupplierList = state.supplier;

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUPPLIER_LOADED:
      return {
        ...state,
        supplier: action.payload,
        dry: false,
        loading: false,
      };
    case SUPPLIER_ADDED:
      newSupplierList.push(action.payload);

      return {
        ...state,
        supplier: newSupplierList,
        loading: false,
      };
    case SUPPLIER_EDITED:
      newSupplierList[action.index] = action.payload;

      return {
        ...state,
        supplier: newSupplierList,
        loading: false,
      };
    default:
      return state;
  }
}

export function loading() {
  return { type: LOADING };
}

export function supplierLoaded(supplier) {
  return { type: SUPPLIER_LOADED, payload: supplier };
}

export function supplierAdded(supplier) {
  return { type: SUPPLIER_ADDED, payload: supplier };
}

export function supplierEdited(index, supplier) {
  return { type: SUPPLIER_EDITED, index, payload: supplier };
}

export function loadSupplier() {
  return async dispatch => {
    try {
      dispatch(loading());

      const { body } = await api.supplierGet();

      dispatch(supplierLoaded(body.data));
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menampilkan Data Supplier',
        text: 'Terjadi kesalahan dalam penampilan data supplier',
      });
      console.log(e);
    }
  };
}

export function addSupplier(newSupplier) {
  return async dispatch => {
    try {
      dispatch(loading());

      const { body } = await api.supplierPost(newSupplier);

      dispatch(supplierAdded(body.data));
      swal({
        icon: 'success',
        title: 'Sukses Menyimpan Data Supplier',
        text: 'Berhasil melakukan penyimpanan data supplier',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menyimpan Data Supplier',
        text: 'Terjadi kesalahan dalam penyimpanan data supplier',
      });
      console.log(e);
    }
  };
}

export function editSupplier(index, updatedSupplier) {
  return async dispatch => {
    try {
      dispatch(loading());

      const supplier = { ...updatedSupplier };
      const { id } = updatedSupplier;
      delete supplier.id;

      const { body } = await api.supplierPut(id, supplier);

      dispatch(supplierEdited(index, body.data));
      swal({
        icon: 'success',
        title: 'Sukses Mengubah Data Supplier',
        text: 'Berhasil melakukan pengubahan data supplier',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Mengubah Data Supplier',
        text: 'Terjadi kesalahan dalam pengubahan data supplier',
      });
      console.log(e);
    }
  };
}

export function deleteSupplier(index, updatedSupplier) {
  return async dispatch => {
    try {
      dispatch(loading());

      const supplier = { ...updatedSupplier };
      const { id } = updatedSupplier;

      delete supplier.id;
      supplier.is_active = false;

      const { body } = await api.supplierPut(id, supplier);

      dispatch(supplierEdited(index, body.data));
      swal({
        icon: 'success',
        title: 'Sukses Menghapus Data Supplier',
        text: 'Berhasil melakukan penghapusan data supplier',
      });
    } catch (e) {
      swal({
        icon: 'error',
        title: 'Error Menghapus Data Supplier',
        text: 'Terjadi kesalahan dalam penghapusan data supplier',
      });
      console.log(e);
    }
  };
}
