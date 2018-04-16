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
  return dispatch => {
    const dummySupplier = [
      {
        id: '1',
        name: 'Supplier SigmaInt',
        address:
          'Jl. Mayjen DI Panjaitan No. 1C, Kebon Pala, Makasar, RT. 001 RW. 006, RT.1/RW.6, Kb. Pala, Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650',
      },
      {
        id: '2',
        name: 'Supplier UltraKappa',
        address:
          'Jl. Mayjen DI Panjaitan No. 1C, Kebon Pala, Makasar, RT. 001 RW. 006, RT.1/RW.6, Kb. Pala, Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650',
      },
      {
        id: '3',
        name: 'Supplier GammaBeta',
        address:
          'Jl. Mayjen DI Panjaitan No. 1C, Kebon Pala, Makasar, RT. 001 RW. 006, RT.1/RW.6, Kb. Pala, Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650',
      },
    ];

    dispatch(supplierLoaded(dummySupplier));
  };
}

export function addSupplier(newSupplier) {
  return (dispatch, getState) => {
    const supplier = {
      id: getState().supplier.supplier.length,
      name: newSupplier.name,
      address: newSupplier.address,
    };

    dispatch(supplierAdded(supplier));
  };
}

export function editSupplier(index, updatedSupplier) {
  return dispatch => {
    const supplier = {
      id: updatedSupplier.id,
      name: updatedSupplier.name,
      address: updatedSupplier.address,
    };

    dispatch(supplierEdited(index, supplier));
  };
}
