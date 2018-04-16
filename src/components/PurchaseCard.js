import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from 'lodash';

const PurchaseCard = ({ data }) => (
  <Card buy={!isEmpty(data) && data.type === 'purchase'}>
    <h2>{!isEmpty(data) && data.type === 'purchase' ? 'Pembelian Produk' : 'Pembatalan Produk'}</h2>
    <h1>
      {!isEmpty(data) && data.jumlah} {!isEmpty(data) && data.produk}
    </h1>
    <h3>{!isEmpty(data) && data.supplier}</h3>
  </Card>
);

PurchaseCard.propTypes = {
  data: PropTypes.object.isRequired,
};

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
