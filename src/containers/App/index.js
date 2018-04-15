import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import configureStore from '../../store';
import routes from '../../routes';
import history from '../../commons/routing';
import theme from '../../commons/theme';

import Navigation from '../Navigation';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>{routes.map(route => <Route key={route.path} {...route} />)}</Switch>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
