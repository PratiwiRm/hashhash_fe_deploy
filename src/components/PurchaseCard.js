import React from 'react';
import styled from 'styled-components';

const PurchaseCard = () => (
  <Card buy>
    <h2>Pembelian Produk</h2>
    <h1>50 Bendera Susu Kental Manis Vanilla</h1>
    <h3>Supplier Tembok Besar</h3>
  </Card>
);

const Card = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: ${props => props.theme.color.pure};
  box-shadow: ${props => props.theme.shadow.lite};
  border-radius: ${props => props.theme.sizing.radius.card};
  transition: 0.25s ease all;

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.shadow.regular};
    background: ${props => props.theme.color.blue};
    transition: 0.25s ease all;

    h1,
    h2,
    h3 {
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
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
  }

  h2 {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    color: ${props => (props.buy ? props.theme.color.green : props.theme.color.red)};
  }

  h3 {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${props => props.theme.color.gray};
    margin: 0.5rem 0 0;
  }
`;

export default PurchaseCard;
