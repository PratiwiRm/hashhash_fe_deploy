import Dummy from 'assets/dummy.jpg';

const EMPLOYEE_LOADED = 'app/employee/EMPLOYEE_LOADED';
const EMPLOYEE_ADDED = 'app/employee/EMPLOYEE_ADDED';
const EMPLOYEE_EDITED = 'app/employee/EMPLOYEE_EDITED';

const initialState = {
  loading: false,
  employee: [],
  dry: true,
};

export default function reducer(state = initialState, action) {
  const newEmployeeList = state.employee;

  switch (action.type) {
    case EMPLOYEE_LOADED:
      return {
        ...state,
        employee: action.payload,
        dry: false,
      };
    case EMPLOYEE_ADDED:
      newEmployeeList.push(action.payload);

      return {
        ...state,
        employee: newEmployeeList,
      };
    case EMPLOYEE_EDITED:
      newEmployeeList[action.index] = action.payload;

      return {
        ...state,
        employee: newEmployeeList,
      };
    default:
      return state;
  }
}

export function employeeLoaded(employee) {
  return { type: EMPLOYEE_LOADED, payload: employee };
}

export function employeeAdded(employee) {
  return { type: EMPLOYEE_ADDED, payload: employee };
}

export function employeeEdited(index, employee) {
  return { type: EMPLOYEE_EDITED, index, payload: employee };
}

export function loadEmployee() {
  return dispatch => {
    const dummyEmployee = [
      {
        phone_num: '085728333045',
        name: 'Kenny Reida Dharmawan',
        picture: Dummy,
        type: 'Picker',
        supplier: 'Supplier GammaBeta',
      },
      {
        phone_num: '087832250320',
        name: 'Bob Ross',
        picture:
          'http://thesource.com/wp-content/uploads/2017/11/Deadpool-2-Tease-Trailer-Parodies-Bob-Ross-Painting-Lessons.png',
        type: 'Picker',
        supplier: 'Supplier SigmaInt',
      },
      {
        phone_num: '087832250323',
        name: 'Donald Trump',
        picture: Dummy,
        type: 'Driver',
      },
    ];

    dispatch(employeeLoaded(dummyEmployee));
  };
}

export function addEmployee(newEmployee) {
  return dispatch => {
    const employee = {
      phone_num: newEmployee.phone_num,
      name: newEmployee.name,
      picture: newEmployee.picture,
      type: newEmployee.type,
    };

    if (newEmployee.type.toLowerCase() === 'picker') {
      employee.supplier = newEmployee.supplier;
    }

    dispatch(employeeAdded(employee));
  };
}

export function editEmployee(index, updatedEmployee) {
  return dispatch => {
    const employee = {
      phone_num: updatedEmployee.phone_num,
      name: updatedEmployee.name,
      picture: updatedEmployee.picture,
      type: updatedEmployee.type,
    };

    if (updatedEmployee.type.toLowerCase() === 'picker') {
      employee.supplier = updatedEmployee.supplier;
    }

    dispatch(employeeEdited(index, employee));
  };
}
