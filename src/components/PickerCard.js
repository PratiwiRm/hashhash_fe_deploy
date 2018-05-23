import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import IconStarFill from 'assets/icon_star_fill.svg';
import IconStarBlank from 'assets/icon_star_blank.svg';

import PurchaseCard from 'components/PurchaseCard';

export default class PickerCard extends Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
    dragFilter: PropTypes.string.isRequired,
    typeFilter: PropTypes.string.isRequired,
    editTask: PropTypes.func.isRequired,
    openConfirmation: PropTypes.func.isRequired,
    beriRating: PropTypes.func.isRequired,
    pemberianTasks: PropTypes.array.isRequired,
    supplier: PropTypes.object,
    tasks: PropTypes.object,
  };

  static defaultProps = {
    tasks: {
      local: [],
      signed: [],
    },
    supplier: {
      nama: '',
    },
  };

  constructor() {
    super();

    this.state = {
      switcher: 0,
    };
  }

  switch = switcher => this.setState({ switcher });

  calculateRating = tasks => {
    if (tasks.length === 0) return 0;

    let rating = 0;

    tasks.forEach(task => {
      const assign = this.props.pemberianTasks.find(e => e.id_task == task.id);

      if (!isEmpty(assign)) {
        rating += assign.rating;
      }
    });

    rating /= tasks.length;

    return rating;
  };

  render() {
    const { editTask, tasks, dragFilter, typeFilter, employee, supplier } = this.props;

    const taskDoing = tasks.signed.find(value => {
      let flag = value.status === 1;

      if (typeFilter !== 'all' && typeFilter !== value.jenis_sub_task) {
        flag = false;
      }

      return flag;
    });
    const tasksTodo = tasks.signed.filter(value => {
      let flag = value.status === 0;

      if (typeFilter !== 'all' && typeFilter !== value.jenis_sub_task) {
        flag = false;
      }

      return flag;
    });
    const tasksDone = tasks.signed.filter(value => {
      let flag = value.status >= 3;

      if (typeFilter !== 'all' && typeFilter !== value.jenis_sub_task) {
        flag = false;
      }

      return flag;
    });

    const locallyAssigned = tasks.local;

    const rating = this.calculateRating(tasksDone);
    const stars = Math.ceil(rating);
    const starIterator = [];

    for (let iter = 0; iter < stars; iter += 1) {
      starIterator.push('x');
    }

    const blanks = 5 - stars;
    const blankIterator = [];

    for (let iter = 0; iter < blanks; iter += 1) {
      blankIterator.push('y');
    }

    return (
      <Droppable
        droppableId={`purchasing-${employee.username}`}
        isDropDisabled={dragFilter != employee.id_supplier}
      >
        {(provided, snapshot) => (
          <Card
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            disabled={dragFilter !== '' && dragFilter != employee.id_supplier}
          >
            <Overlay active={snapshot.isDraggingOver}>
              <h1>Drop disini untuk memberikan tugas ke {employee.name}</h1>
            </Overlay>
            <Head>
              <img src={employee.foto} alt="Profpic" />
              <div className="info">
                <h1>{employee.nama}</h1>
                <strong>{employee.username}</strong>
                <span>{supplier.nama}</span>
              </div>
            </Head>
            <RatingStar disabled={tasksDone.length === 0}>
              <h1>
                {rating}
                <span>dari 5</span>
              </h1>
              {starIterator.map((val, index) => (
                <button
                  key={`${employee.username}-fill-${val}-${index}`}
                  disabled={tasksDone.length === 0}
                  onClick={() => this.props.beriRating(employee.username, index + 1)}
                >
                  <img src={IconStarFill} alt="fill" />
                </button>
              ))}
              {blankIterator.map((val, index) => (
                <button
                  key={`${employee.username}-blank-${val}-${index}`}
                  disabled={tasksDone.length === 0}
                  onClick={() => this.props.beriRating(employee.username, rating + index + 1)}
                >
                  <img src={IconStarBlank} alt="blank" />
                </button>
              ))}
            </RatingStar>
            {taskDoing && (
              <Doing>
                <h6>Sedang Melakukan</h6>
                <PurchaseCard data={taskDoing} />
              </Doing>
            )}
            <Tasks>
              <Switcher>
                {((dragFilter !== '' && dragFilter == employee.id_supplier) ||
                  !isEmpty(locallyAssigned)) && <button disabled>To Be Assigned</button>}
                {(dragFilter === '' || dragFilter != employee.id_supplier) &&
                  isEmpty(locallyAssigned) && (
                    <button disabled={this.state.switcher === 0} onClick={() => this.switch(0)}>
                      Todo
                    </button>
                  )}
                {(dragFilter === '' || dragFilter != employee.id_supplier) &&
                  isEmpty(locallyAssigned) && (
                    <button disabled={this.state.switcher === 3} onClick={() => this.switch(3)}>
                      Done
                    </button>
                  )}
              </Switcher>
              <div className="tasksContainer">
                {((dragFilter !== '' && dragFilter == employee.id_supplier) ||
                  !isEmpty(locallyAssigned)) &&
                  locallyAssigned
                    .filter(value => !(typeFilter !== 'all' && typeFilter !== value.jenis_sub_task))
                    .map((task, index) => (
                      <Draggable
                        key={`purchasing-${task.id_supplier}-${task.id}-${task.nama_barang}-${
                          task.jenis_sub_task
                        }-${task.total_jumlah}`}
                        draggableId={`purchasing-${task.id_supplier}-${task.id}-${
                          task.nama_barang
                        }-${task.jenis_sub_task}-${task.total_jumlah}`}
                        index={index}
                      >
                        {(innerProvided, innerSnapshot) => (
                          <div
                            ref={innerProvided.innerRef}
                            {...innerProvided.draggableProps}
                            {...innerProvided.dragHandleProps}
                            style={innerProvided.draggableProps.style}
                            onClick={() => editTask(employee.username, index)}
                          >
                            <PurchaseCard data={task} supplier={supplier} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
                {(dragFilter === '' || dragFilter !== employee.id_supplier) &&
                  isEmpty(locallyAssigned) &&
                  this.state.switcher === 0 &&
                  tasksTodo.map(task => (
                    <PurchaseCard
                      key={`purchasing-${task.id_supplier}-${task.id}-${task.nama_barang}`}
                      data={task}
                      supplier={supplier}
                    />
                  ))}
                {(dragFilter === '' || dragFilter !== employee.id_supplier) &&
                  isEmpty(locallyAssigned) &&
                  this.state.switcher === 3 &&
                  tasksDone.map(task => (
                    <div
                      key={`purchasing-${task.id_supplier}-${task.id}-${task.nama_barang}`}
                      onClick={this.props.openConfirmation}
                    >
                      <PurchaseCard data={task} supplier={supplier} />
                    </div>
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

const RatingStar = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0 2rem;
  margin: -2rem 0 2rem;
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  h1 {
    width: 100%;
    font-size: 3rem;
    margin: 0 0 0.5rem;
    text-align: center;
    color: ${props => props.theme.color.pure};
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    span {
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.85;
      margin: 0 0 0 0.5rem;
    }
  }

  button {
    margin: 0 1rem 0 0;

    &:last-of-type {
      margin: 0;
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
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
  position: relative;
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
    width: 100%;
    position: relative;
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
