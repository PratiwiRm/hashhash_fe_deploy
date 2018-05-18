import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PickerCard from 'components/PickerCard';

const PickerList = ({ editTask, tasks, dragFilter, typeFilter, employees, supplier }) => (
  <Wrapper>
    <div className="container">
      {employees.map(employee => (
        <PickerCard
          editTask={editTask}
          key={`employee-${employee.username}`}
          tasks={tasks[employee.username]}
          dragFilter={dragFilter}
          typeFilter={typeFilter}
          employee={employee}
          supplier={supplier.find(el => el.id == employee.id_supplier)}
        />
      ))}
    </div>
  </Wrapper>
);

PickerList.propTypes = {
  editTask: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  supplier: PropTypes.array.isRequired,
  dragFilter: PropTypes.string.isRequired,
  typeFilter: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 0 0 1rem;

  .container {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    white-space: nowrap;
    position: relative;

    & > div {
      white-space: normal;
      margin: 0 2rem 0 0;

      &:first-of-type {
        margin-left: 1rem;
      }
    }
  }
`;

export default PickerList;
