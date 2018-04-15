import React from 'react';
import styled from 'styled-components';

import Dummy from 'assets/dummy.jpg';

import DeliveryCard from 'components/DeliveryCard';

const DriverCard = () => (
  <Card>
    <Head>
      <img src={Dummy} alt="trump" />
      <div className="info">
        <h1>Kenny Reida Dharmawan</h1>
        <strong>085 728 333 045</strong>
      </div>
    </Head>
    <Doing>
      <h6>Sedang Melakukan</h6>
      <DeliveryCard />
    </Doing>
    <Tasks>
      <Switcher>
        <button className="active">To Be Assigned</button>
        <button>Todo</button>
        <button>Done</button>
      </Switcher>
      <div className="container">
        <DeliveryCard />
        <DeliveryCard />
        <DeliveryCard />
        <DeliveryCard />
        <DeliveryCard />
        <DeliveryCard />
        <DeliveryCard />
      </div>
    </Tasks>
  </Card>
);

const Card = styled.div`
  position: relative;
  width: 20rem;
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme.color.blue};
  box-shadow: ${props => props.theme.shadow.regular};
  border-radius: ${props => props.theme.sizing.radius.card};
  display: inline-flex;
  flex-flow: column wrap;
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0 2rem;
  margin: 2rem 0 1.5rem;

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 5rem;
    margin: 0 1rem 0 0;
    object-fit: cover;
  }

  .info {
    flex: 1;
    color: ${props => props.theme.color.pure};

    h1 {
      font-size: 1.25rem;
      margin: 0 0 0.5rem;
    }

    strong,
    span {
      display: block;
    }

    strong {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1;
      margin: 0;
    }

    span {
      font-size: 0.875rem;
    }
  }
`;

const Doing = styled.div`
  background: ${props => props.theme.color.blueAlt};
  padding: 1rem 1rem 1.5rem;
  margin: -0.5rem 0 0;
  border-radius: ${props => props.theme.sizing.radius.card}
    ${props => props.theme.sizing.radius.card} 0 0;

  h6 {
    color: ${props => props.theme.color.pure};
    font-size: 1rem;
    text-align: center;
    margin: 0 1rem 0.5rem;
  }
`;

const Tasks = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  position: relative;
  width: 100%;
  background: ${props => props.theme.color.pure};
  padding: 1rem;
  margin: -0.5rem 0 0;
  border-radius: ${props => props.theme.sizing.radius.card};

  .container {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    overflow-x: hidden;
    overflow-y: auto;

    & > button {
      white-space: normal;
      margin: 0 0 1rem;
    }
  }
`;

const Switcher = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 0 1rem;

  button {
    font-size: 1rem;
    font-weight: 700;
    color: ${props => props.theme.color.gray};
    margin: 0 1rem 0 0;
    transition: 0.25s ease all;

    &:last-of-type {
      margin: 0;
    }

    &.active,
    &:hover,
    &:focus {
      color: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }
`;

export default DriverCard;