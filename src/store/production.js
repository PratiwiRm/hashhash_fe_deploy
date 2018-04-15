import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from 'commons/routing';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(routerMiddleware(history), thunk);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
