import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import configureStore from '../../store';
import routes from '../../routes';
import history from '../../commons/routing';
import theme from '../../commons/theme';

import {
  swapTask as logisticSwapTask,
  moveTask as logisticMoveTask,
} from '../../reducers/logistic';

import {
  swapTask as purchasingSwapTask,
  moveTask as purchasingMoveTask,
  setDragFilter as purchasingSetDragFilter,
} from '../../reducers/purchasing';

const store = configureStore();

export default class App extends Component {
  onDragStart = dragStart => {
    if (dragStart.draggableId.startsWith('purchasing')) {
      const dragFilter = dragStart.draggableId.split('-')[1];
      store.dispatch(purchasingSetDragFilter(dragFilter));
    }
  };

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

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
              <Switch>{routes.map(route => <Route key={route.path} {...route} />)}</Switch>
            </DragDropContext>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
