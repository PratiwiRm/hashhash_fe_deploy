import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const EmployeeCard = ({ data, onClick, supplier }) => (
  <Card onClick={onClick}>
    <img src={data.foto} alt="profpic" />
    <h1>{data.nama}</h1>
    <h2>{data.username}</h2>
    {data.peran.toLowerCase() === 'picker' && <h6>{supplier.nama}</h6>}
    <h5>{data.peran}</h5>
  </Card>
);

EmployeeCard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  supplier: PropTypes.object,
};

EmployeeCard.defaultProps = {
  supplier: {
    nama: '',
  },
};

const Card = styled.button`
  padding: 1.5rem;
  background: ${props => props.theme.color.pure};
  box-shadow: ${props => props.theme.shadow.lite};
  border-radius: ${props => props.theme.sizing.radius.card};
  transition: 0.25s ease all;
  text-align: left;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

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
    margin: 1rem 0 0;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    color: ${props => props.theme.color.pure};
    background: ${props => props.theme.color.blue};
    border-radius: ${props => props.theme.sizing.radius.small};
    text-transform: capitalize;
  }

  h6 {
    font-weight: 400;
    color: ${props => props.theme.color.gray};
    margin: 0;
  }

  span {
    font-size: 0.75rem;
    color: ${props => props.theme.color.blue};
  }
`;

export default EmployeeCard;
