import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import employee from './employee';
import help from './help';
import logistic from './logistic';
import performance from './performance';
import purchasing from './purchasing';
import supplier from './supplier';

export default combineReducers({
  auth,
  employee,
  help,
  logistic,
  performance,
  purchasing,
  supplier,
  router: routerReducer,
});
