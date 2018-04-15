import React from 'react';
import styled from 'styled-components';

import Dummy from 'assets/dummy.jpg';

const EmployeeCard = () => (
  <Card>
    <img src={Dummy} alt="profpic" />
    <h1>Kenny Reida Dharmawan</h1>
    <h2>085 728 333 045</h2>
    <h6>Supplier Palakuda</h6>
    <h5>Picker</h5>
  </Card>
);

const Card = styled.button`
  padding: 1.5rem;
  background: ${props => props.theme.color.pure};
  box-shadow: ${props => props.theme.shadow.lite};
  border-radius: ${props => props.theme.sizing.radius.card};
  transition: 0.25s ease all;
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.shadow.regular};
    background: ${props => props.theme.color.blue};
    transition: 0.25s ease all;

    h1,
    h2,
    h5,
    h6 {
      color: ${props => props.theme.color.white};
      transition: 0.25s ease all;
    }

    h5 {
      color: ${props => props.theme.color.blue};
      background: ${props => props.theme.color.white};
    }
  }

  img {
    width: calc(100% + 3rem);
    height: 15rem;
    margin: -1.5rem -1.5rem 1.5rem;
    object-fit: cover;
    border-radius: ${props => props.theme.sizing.radius.card}
      ${props => props.theme.sizing.radius.card} 0 0;
  }

  h1,
  h2,
  h5,
  h6 {
    text-align: left;
    transition: 0.25s ease all;
  }

  h1,
  h2,
  h6 {
    width: 100%;
  }

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  h5,
  h6 {
    font-size: 0.875rem;
  }

  h5 {
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    color: ${props => props.theme.color.pure};
    background: ${props => props.theme.color.blue};
    border-radius: ${props => props.theme.sizing.radius.small};
  }

  h6 {
    font-weight: 400;
    color: ${props => props.theme.color.gray};
    margin: 0 0 1rem;
  }

  span {
    font-size: 0.75rem;
    color: ${props => props.theme.color.blue};
  }
`;

export default EmployeeCard;
