import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import employee from './employee';
import logistic from './logistic';
import purchasing from './purchasing';
import supplier from './supplier';

export default combineReducers({
  auth,
  employee,
  logistic,
  purchasing,
  supplier,
  router: routerReducer,
});
