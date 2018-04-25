import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { media } from 'commons/theme';

import PickerCard from 'components/PickerCard';

const PickerList = ({ tasks, dragFilter, typeFilter, employee }) => (
  <Wrapper>
    <div className="container">
      {employee.map(value => (
        <PickerCard
          key={`employee-${value.phone_num}`}
          tasks={tasks[value.phone_num]}
          dragFilter={dragFilter}
          typeFilter={typeFilter}
          employee={value}
        />
      ))}
    </div>
  </Wrapper>
);

PickerList.propTypes = {
  tasks: PropTypes.object.isRequired,
  employee: PropTypes.array.isRequired,
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
