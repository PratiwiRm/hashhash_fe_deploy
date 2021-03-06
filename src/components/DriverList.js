import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { media } from 'commons/theme';

import DriverCard from 'components/DriverCard';

const DriverList = ({
  editTask,
  openConfirmation,
  tasks,
  dragFilter,
  employees,
  pemberianTasks,
  beriRating,
}) => (
  <Wrapper>
    <div className="container">
      {employees.map(employee => (
        <DriverCard
          editTask={editTask}
          openConfirmation={openConfirmation}
          key={`driver-${employee.username}`}
          tasks={tasks[employee.username]}
          dragFilter={dragFilter}
          employee={employee}
          pemberianTasks={pemberianTasks}
          beriRating={beriRating}
        />
      ))}
    </div>
  </Wrapper>
);

DriverList.propTypes = {
  editTask: PropTypes.func.isRequired,
  openConfirmation: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  dragFilter: PropTypes.string.isRequired,
  pemberianTasks: PropTypes.array.isRequired,
  beriRating: PropTypes.func.isRequired,
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

export default DriverList;
