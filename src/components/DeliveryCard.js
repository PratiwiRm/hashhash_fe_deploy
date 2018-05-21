import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from 'lodash';

const DeliveryCard = ({ data }) => (
  <Card>
    <h3>{!isEmpty(data) && data.pick_up.length + data.drop_off.length} Destinasi</h3>
    <span>Pickup:</span>
    <h2>{!isEmpty(data) && data.pick_up.map(t => t.outlite).join(', ')}</h2>
    <span>Drop Off:</span>
    <h1>{!isEmpty(data) && data.drop_off.map(t => t.outlite).join(', ')}</h1>
  </Card>
);

DeliveryCard.propTypes = {
  data: PropTypes.object.isRequired,
};

const Card = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: ${props => props.theme.color.pure};
  box-shadow: ${props => props.theme.shadow.lite};
  border-radius: ${props => props.theme.sizing.radius.card};
  transition: 0.25s ease all;
  text-align: left;

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.shadow.regular};
    background: ${props => props.theme.color.blue};
    transition: 0.25s ease all;

    h1,
    h2,
    h3,
    span {
      color: ${props => props.theme.color.white};
      transition: 0.25s ease all;
    }
  }

  h1,
  h2,
  h3 {
    text-align: left;
    transition: 0.25s ease all;
  }

  h1 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
  }

  h3 {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${props => props.theme.color.gray};
    margin: 0 0 0.5rem;
  }

  span {
    font-size: 0.75rem;
    color: ${props => props.theme.color.blue};
  }
`;

export default DeliveryCard;
