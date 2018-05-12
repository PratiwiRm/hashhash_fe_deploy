import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { driverTaskIdBuilder } from 'commons/structure';

import DeliveryCard from 'components/DeliveryCard';

const DeliveryList = ({ addTask, editTask, tasks }) => (
  <Wrapper>
    <Header>Daftar Perjalanan</Header>
    <Content>
      <Droppable droppableId="logistic-unassigned">
        {(provided, snapshot) => (
          <ItemList
            innerRef={provided.innerRef}
            active={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={driverTaskIdBuilder(task)}
                draggableId={driverTaskIdBuilder(task)}
                index={index}
              >
                {(innerProvided, innerSnapshot) => (
                  <div
                    ref={innerProvided.innerRef}
                    {...innerProvided.draggableProps}
                    {...innerProvided.dragHandleProps}
                    style={innerProvided.draggableProps.style}
                    onClick={() => editTask('unassigned', index)}
                  >
                    <DeliveryCard data={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ItemList>
        )}
      </Droppable>
      <AddButton onClick={addTask}>+ Tambah</AddButton>
    </Content>
  </Wrapper>
);

DeliveryList.propTypes = {
  addTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  tasks: PropTypes.array,
};

DeliveryList.defaultProps = {
  tasks: [],
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.color.blue};
  box-shadow: ${props => props.theme.shadow.regular};
  border-radius: ${props => props.theme.sizing.radius.card};
`;

const Header = styled.h1`
  width: 100%;
  padding: 1rem;
  color: ${props => props.theme.color.white};
  background: ${props => props.theme.color.blue};
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  line-height: 1;
  border-radius: ${props => props.theme.sizing.radius.card}
    ${props => props.theme.sizing.radius.card} 0 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  background: ${props => props.theme.color.pure};
  padding: 1rem 0 1rem;
  border-radius: ${props => props.theme.sizing.radius.card};
`;

const ItemList = styled.div`
  width: 100%;
  flex: 1;
  overflow-x: none;
  overflow-y: auto;
  padding: 0 1rem 1rem;

  div {
    margin: 0 0 1rem;
  }
`;

const AddButton = styled.button`
  width: calc(100% - 2rem);
  padding: 0.75rem 1.5rem;
  margin: 1rem 1rem 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  border-radius: 0.5rem;
  color: ${props => props.theme.color.gray};
  background: ${props => props.theme.color.white};
  transition: 0.25s ease all;

  &:hover,
  &:focus {
    color: ${props => props.theme.color.white};
    background: ${props => props.theme.color.blue};
    transition: 0.25s ease all;
  }
`;

export default DeliveryList;
