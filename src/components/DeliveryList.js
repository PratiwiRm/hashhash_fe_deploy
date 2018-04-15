import React, { Component } from 'react';
import styled from 'styled-components';

import DeliveryCard from 'components/DeliveryCard';

export default class DeliveryList extends Component {
  render() {
    return (
      <Wrapper>
        <Header>Daftar Pengiriman</Header>
        <Content>
          <ItemList>
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
            <DeliveryCard />
          </ItemList>
          <AddButton>+ Tambah</AddButton>
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.color.blue};
  box-shadow: ${props => props.theme.shadow.regular};
  border-radius: ${props => props.theme.sizing.radius.card};
`;

const Header = styled.h1`
  width: 100%;
  padding: 1rem;
  color: ${props => props.theme.color.white};
  background: ${props => props.theme.color.blue};
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  line-height: 1;
  border-radius: ${props => props.theme.sizing.radius.card}
    ${props => props.theme.sizing.radius.card} 0 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  background: ${props => props.theme.color.pure};
  padding: 1rem 0 1rem;
  border-radius: ${props => props.theme.sizing.radius.card};
`;

const ItemList = styled.div`
  width: 100%;
  flex: 1;
  overflow-x: none;
  overflow-y: auto;
  padding: 0 1rem 1rem;

  button {
    margin: 0 0 1rem;

    &:last-of-type {
      margin: 0;
    }
  }
`;

const AddButton = styled.button`
  width: calc(100% - 2rem);
  padding: 0.75rem 1.5rem;
  margin: 1rem 1rem 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  border-radius: 0.5rem;
  color: ${props => props.theme.color.gray};
  background: ${props => props.theme.color.white};
  transition: 0.25s ease all;

  &:hover,
  &:focus {
    color: ${props => props.theme.color.white};
    background: ${props => props.theme.color.blue};
    transition: 0.25s ease all;
  }
`;
