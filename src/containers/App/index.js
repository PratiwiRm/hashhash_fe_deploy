import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet';

import AppleIcon from 'assets/favicon/apple-touch-icon.png';
import Favicon32 from 'assets/favicon/favicon-32x32.png';
import Favicon16 from 'assets/favicon/favicon-16x16.png';
import MaskIcon from 'assets/favicon/safari-pinned-tab.svg';

import history from 'commons/routing';
import theme from 'commons/theme';

import Spinner from 'components/Spinner';

import { reloadAuth } from 'reducers/auth';

import { swapTask as logisticSwapTask, moveTask as logisticMoveTask } from 'reducers/logistic';

import {
  swapTask as purchasingSwapTask,
  moveTask as purchasingMoveTask,
  setDragFilter as purchasingSetDragFilter,
} from 'reducers/purchasing';

import configureStore from '../../store';
import routes from '../../routes';

const store = configureStore();

export default class App extends Component {
  componentDidMount() {
    store.dispatch(reloadAuth());
  }

  onDragEnd = result => {
    if (result.destination !== null) {
      if (result.draggableId.startsWith('purchasing')) {
        if (result.source.droppableId === result.destination.droppableId) {
          const taskLocation = result.source.droppableId.split('-')[1];
          store.dispatch(purchasingSwapTask(taskLocation, result.source.index, result.destination.index));
        } else {
          const srcLoc = result.source.droppableId.split('-')[1];
          const destLoc = result.destination.droppableId.split('-')[1];
          store.dispatch(purchasingMoveTask(srcLoc, destLoc, result.source.index, result.destination.index));
        }
      } else if (result.draggableId.startsWith('logistic')) {
        if (result.source.droppableId === result.destination.droppableId) {
          const taskLocation = result.source.droppableId.split('-')[1];
          store.dispatch(logisticSwapTask(taskLocation, result.source.index, result.destination.index));
        } else {
          const srcLoc = result.source.droppableId.split('-')[1];
          const destLoc = result.destination.droppableId.split('-')[1];
          store.dispatch(logisticMoveTask(srcLoc, destLoc, result.source.index, result.destination.index));
        }
      }
    }

    store.dispatch(purchasingSetDragFilter(''));
  };

  onDragStart = dragStart => {
    if (dragStart.draggableId.startsWith('purchasing')) {
      const dragFilter = dragStart.draggableId.split('-')[1];
      store.dispatch(purchasingSetDragFilter(dragFilter));
    }
  };

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
              <Helmet
                titleTemplate="%s - Optima"
                defaultTitle="Stoqo Optima"
                meta={[
                  { name: 'description', content: 'Stoqo Optima' },
                  { name: 'apple-mobile-web-app-title', content: 'Stoqo Optima' },
                  { name: 'application-name', content: 'Stoqo Optima' },
                  { name: 'theme-color', content: '#FAFAFA' },
                ]}
                link={[
                  { rel: 'apple-touch-icon', sizes: '180x180', href: AppleIcon },
                  {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: Favicon32,
                  },
                  {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: Favicon16,
                  },
                  { rel: 'mask-icon', color: '005bea', href: MaskIcon },
                ]}
              />
              <Spinner />
              <Switch>{routes.map(route => <Route key={route.path} {...route} />)}</Switch>
            </DragDropContext>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
