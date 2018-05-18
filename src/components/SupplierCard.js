import React from 'react';
import styled from 'styled-components';

const SupplierCard = ({ data, onClick }) => (
  <Card onClick={onClick}>
    <h1>#{data.id}</h1>
    <h2>{data.nama}</h2>
    <p>{data.lokasi}</p>
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
    p {
      color: ${props => props.theme.color.white};
      transition: 0.25s ease all;
    }
  }

  h1,
  h2,
  p {
    text-align: left;
    transition: 0.25s ease all;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: ${props => props.theme.color.gray};
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  p {
    font-size: 0.875rem;
    margin: 0;
    color: ${props => props.theme.color.gray};
  }
`;

export default SupplierCard;
