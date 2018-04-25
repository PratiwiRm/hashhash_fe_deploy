import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import PurchaseCard from 'components/PurchaseCard';

export default class PickerCard extends Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
    dragFilter: PropTypes.string.isRequired,
    typeFilter: PropTypes.string.isRequired,
    tasks: PropTypes.object,
  };

  static defaultProps = {
    tasks: {
      local: [],
      signed: [],
    },
  };

  constructor() {
    super();

    this.state = {
      switcher: 'todo',
    };
  }

  switch = switcher => this.setState({ switcher });

  render() {
    const {
 tasks, dragFilter, typeFilter, employee 
} = this.props;

    const taskDoing = tasks.signed.find(value => {
      let flag = value.status === 'doing';

      if (typeFilter !== 'all' && typeFilter !== value.type) {
        flag = false;
      }

      return flag;
    });
    const tasksTodo = tasks.signed.filter(value => {
      let flag = value.status === 'pending';

      if (typeFilter !== 'all' && typeFilter !== value.type) {
        flag = false;
      }

      return flag;
    });
    const tasksDone = tasks.signed.filter(value => {
      let flag = value.status === 'done';

      if (typeFilter !== 'all' && typeFilter !== value.type) {
        flag = false;
      }

      return flag;
    });
    const locallyAssigned = tasks.local;

    return (
      <Droppable
        droppableId={`purchasing-${employee.phone_num}`}
        isDropDisabled={dragFilter !== employee.supplier}
      >
        {(provided, snapshot) => (
          <Card
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            disabled={dragFilter !== '' && dragFilter !== employee.supplier}
          >
            <Overlay active={snapshot.isDraggingOver}>
              <h1>Drop disini untuk memberikan tugas ke {employee.name}</h1>
            </Overlay>
            <Head>
              <img src={employee.picture} alt="Profpic" />
              <div className="info">
                <h1>{employee.name}</h1>
                <strong>{employee.phone_num}</strong>
                <span>{employee.supplier}</span>
              </div>
            </Head>
            {taskDoing && (
              <Doing>
                <h6>Sedang Melakukan</h6>
                <PurchaseCard data={taskDoing} />
              </Doing>
            )}
            <Tasks>
              <Switcher>
                {!isEmpty(locallyAssigned) && <button disabled>To Be Assigned</button>}
                {isEmpty(locallyAssigned) && (
                  <button
                    disabled={this.state.switcher === 'todo'}
                    onClick={() => this.switch('todo')}
                  >
                    Todo
                  </button>
                )}
                {isEmpty(locallyAssigned) && (
                  <button
                    disabled={this.state.switcher === 'done'}
                    onClick={() => this.switch('done')}
                  >
                    Done
                  </button>
                )}
              </Switcher>
              <div className="tasksContainer">
                {!isEmpty(locallyAssigned) &&
                  locallyAssigned
                    .filter(value => !(typeFilter !== 'all' && typeFilter !== value.type))
                    .map((task, index) => (
                      <Draggable
                        key={`purchasing-${task.supplier}-${task.order_id}-${task.product}`}
                        draggableId={`purchasing-${task.supplier}-${task.order_id}-${task.product}`}
                        index={index}
                      >
                        {(innerProvided, innerSnapshot) => (
                          <div
                            ref={innerProvided.innerRef}
                            {...innerProvided.draggableProps}
                            {...innerProvided.dragHandleProps}
                            style={innerProvided.draggableProps.style}
                          >
                            <PurchaseCard data={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
                {isEmpty(locallyAssigned) &&
                  this.state.switcher === 'todo' &&
                  tasksTodo.map(task => (
                    <PurchaseCard
                      key={`purchasing-${task.supplier}-${task.order_id}-${task.product}`}
                      data={task}
                    />
                  ))}
                {isEmpty(locallyAssigned) &&
                  this.state.switcher === 'done' &&
                  tasksDone.map(task => (
                    <PurchaseCard
                      key={`purchasing-${task.supplier}-${task.order_id}-${task.product}`}
                      data={task}
                    />
                  ))}
              </div>
            </Tasks>
          </Card>
        )}
      </Droppable>
    );
  }
}

const Card = styled.div`
  position: relative;
  width: 20rem;
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme.color.blue};
  box-shadow: ${props => props.theme.shadow.regular};
  border-radius: ${props => props.theme.sizing.radius.card};
  display: inline-flex;
  flex-flow: column wrap;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  transition: 0.25s ease all;
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0 2rem;
  margin: 2rem 0 1.5rem;

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 5rem;
    margin: 0 1rem 0 0;
    object-fit: cover;
  }

  .info {
    flex: 1;
    color: ${props => props.theme.color.pure};

    h1 {
      font-size: 1.25rem;
      margin: 0 0 0.5rem;
    }

    strong,
    span {
      display: block;
    }

    strong {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
    }

    span {
      font-size: 0.875rem;
    }
  }
`;

const Doing = styled.div`
  background: ${props => props.theme.color.blueAlt};
  padding: 1rem 1rem 1.5rem;
  margin: -0.5rem 0 0;
  border-radius: ${props => props.theme.sizing.radius.card}
    ${props => props.theme.sizing.radius.card} 0 0;

  h6 {
    color: ${props => props.theme.color.pure};
    font-size: 1rem;
    text-align: center;
    margin: 0 1rem 0.5rem;
  }
`;

const Tasks = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  position: relative;
  width: 100%;
  background: ${props => props.theme.color.pure};
  padding: 1rem;
  margin: -0.5rem 0 0;
  border-radius: ${props => props.theme.sizing.radius.card};

  .tasksContainer {
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;

    & > div {
      width: 100%;
      white-space: normal;
      margin: 0 0 1rem;
    }
  }
`;

const Switcher = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 0 1rem;

  button {
    font-size: 1rem;
    font-weight: 700;
    color: ${props => props.theme.color.gray};
    margin: 0 1rem 0 0;
    transition: 0.25s ease all;

    &:last-of-type {
      margin: 0;
    }

    &:disabled,
    &:hover,
    &:focus {
      color: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }
`;

const Overlay = styled.div`
  z-index: ${props => props.theme.zindex.overhead};
  position: absolute;
  top: ${props => (props.active ? '0' : '100%')};
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.color.blue};
  color: ${props => props.theme.color.pure};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  padding: 4rem 2rem 2rem;
  border-radius: ${props => props.theme.sizing.radius.card};
  transition: 0.1s ease-out all;

  h1 {
    font-size: 1.25rem;
    line-height: 1.25;
    margin: 0;
    text-align: center;
  }
`;
