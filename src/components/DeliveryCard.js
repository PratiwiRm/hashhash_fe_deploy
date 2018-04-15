import React from 'react';
import styled from 'styled-components';

const DeliveryCard = () => (
  <Card buy>
    <h3>4 Destinasi</h3>
    <span>Pickup:</span>
    <h2>Sorting Hub</h2>
    <span>Drop Off:</span>
    <h1>BacaKopi, Ayam Geprek Ummat, Ti Amo Thai Tea</h1>
  </Card>
);

const Card = styled.button`
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
