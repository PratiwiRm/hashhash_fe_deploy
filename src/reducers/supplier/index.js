import swal from 'sweetalert';

import * as api from 'services/api';

const SUPPLIER_LOADED = 'app/employee/SUPPLIER_LOADED';
const SUPPLIER_ADDED = 'app/employee/SUPPLIER_ADDED';
const SUPPLIER_EDITED = 'app/employee/SUPPLIER_EDITED';

const initialState = {
  loading: false,
  supplier: [],
  dry: true,
};

export default function reducer(state = initialState, action) {
  const newSupplierList = state.supplier;

  switch (action.type) {
    case SUPPLIER_LOADED:
      return {
        ...state,
        supplier: action.payload,
        dry: false,
      };
    case SUPPLIER_ADDED:
      newSupplierList.push(action.payload);

      return {
        ...state,
        supplier: newSupplierList,
      };
    case SUPPLIER_EDITED:
      newSupplierList[action.index] = action.payload;

      return {
        ...state,
        supplier: newSupplierList,
      };
    default:
      return state;
  }
}

export function supplierLoaded(employee) {
  return { type: SUPPLIER_LOADED, payload: employee };
}

export function supplierAdded(employee) {
  return { type: SUPPLIER_ADDED, payload: employee };
}

export function supplierEdited(index, employee) {
  return { type: SUPPLIER_EDITED, index, payload: employee };
}

export function loadSupplier() {
  return async dispatch => {
    try {
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
      const { body } = await api.supplierPost(newSupplier);

      dispatch(supplierAdded(body.data));
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
      const supplier = { ...updatedSupplier };
      const { id } = updatedSupplier;
      delete supplier.id;

      const { body } = await api.supplierPut(id, supplier);

      dispatch(supplierEdited(index, body.data));
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
